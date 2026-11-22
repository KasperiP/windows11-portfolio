'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
	type MouseEvent as ReactMouseEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { LuArrowRight } from 'react-icons/lu';
import Selecto from 'react-selecto';
import { useViewport } from '../../../hooks/useViewport';
import { useOpenRoute } from '../../../hooks/useWindowManager';
import { RECYCLE_BIN_PATH, recycleBinIcon } from '../../../lib/desktop';
import {
	CELL_HEIGHT,
	CELL_WIDTH,
	cellOrigin,
	gridFor,
	layoutIcons,
	moveIcons,
	nearestCell,
} from '../../../lib/desktopGrid';
import { TASKBAR_HEIGHT } from '../../../lib/windows';
import {
	useDesktopStore,
	useVisibleDesktopItems,
} from '../../../store/desktop';
import { useWindowStore } from '../../../store/windows';
import styles from './Icons.module.css';

const RECYCLE_BIN_ID = 'recycle-bin';
// Pixels the pointer must travel before a press on an icon becomes a drag.
const DRAG_THRESHOLD = 4;

type DesktopIcon = {
	id: string;
	name: string;
	href: string;
	icon: string;
	quality?: number;
};

type Drag = {
	/** The grabbed icon first, then the rest of the selection. */
	ids: string[];
	dx: number;
	dy: number;
	pointer: { x: number; y: number };
	overBin: boolean;
};

/**
 * The desktop, like Windows with "Align icons to grid": click to select,
 * drag a box to select several, drag icons to move them (positions are
 * saved), drop them on the Recycle Bin to delete, double-click to open.
 */
function Icons() {
	const selectoRef = useRef<Selecto>(null);
	const desktopRef = useRef<HTMLDivElement>(null);
	const [selected, setSelected] = useState<string[]>([]);
	const [drag, setDrag] = useState<Drag | null>(null);

	const clearFocus = useWindowStore((s) => s.clearFocus);
	const items = useVisibleDesktopItems();
	const binFull = useDesktopStore((s) => s.recycled.length > 0);
	const hydrated = useDesktopStore((s) => s.hydrated);
	const positions = useDesktopStore((s) => s.positions);
	const recycle = useDesktopStore((s) => s.recycle);
	const setPositions = useDesktopStore((s) => s.setPositions);
	const openRoute = useOpenRoute();
	const viewport = useViewport();

	// The desktop store persists to sessionStorage, which only exists here.
	useEffect(() => {
		void useDesktopStore.persist.rehydrate();
	}, []);

	// Default order (before any icon is moved): the shortcuts, then the
	// Recycle Bin last.
	const icons: DesktopIcon[] = useMemo(
		() => [
			...items,
			{
				id: RECYCLE_BIN_ID,
				name: 'Recycle Bin',
				href: RECYCLE_BIN_PATH,
				icon: recycleBinIcon(binFull),
			},
		],
		[binFull, items],
	);
	const grid = gridFor(viewport.width, viewport.height - TASKBAR_HEIGHT);
	const layout = layoutIcons(
		icons.map((icon) => icon.id),
		positions,
		grid,
	);

	// Updates the selection and keeps Selecto's own copy in step, so its next
	// box selection reports changes against what is really selected.
	const select = useCallback((ids: string[]) => {
		setSelected(ids);
		const elements = ids.flatMap((id) => {
			const el = desktopRef.current?.querySelector<HTMLElement>(
				`[data-desktop-id="${id}"]`,
			);
			return el ? [el] : [];
		});
		selectoRef.current?.setSelectedTargets(elements);
	}, []);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			// Only when the desktop has focus, not while typing in a window.
			if (useWindowStore.getState().focused !== null) return;
			const target = e.target as Element;
			if (target.closest('input, textarea, [contenteditable="true"]')) {
				return;
			}
			if (e.key === 'Delete') {
				const ids = selected.filter((id) => id !== RECYCLE_BIN_ID);
				if (!ids.length) return;
				recycle(ids);
				select([]);
			}
			if (e.key === 'Enter') {
				const icon = icons.find((i) => selected.includes(i.id));
				if (icon) openRoute(icon.href);
			}
		};
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [icons, openRoute, recycle, select, selected]);

	const handleIconMouseDown = (e: ReactMouseEvent, id: string) => {
		if (e.button !== 0) return;

		// Ctrl/Cmd+click toggles an icon in or out of the selection.
		const toggle = e.ctrlKey || e.metaKey;
		if (toggle && selected.includes(id)) {
			select(selected.filter((s) => s !== id));
			return;
		}
		const ids = toggle
			? [...selected, id]
			: selected.includes(id)
				? selected
				: [id];
		select(ids);

		const desktop = desktopRef.current!.getBoundingClientRect();
		const bin = cellOrigin(layout[RECYCLE_BIN_ID]);
		const isOverBin = (x: number, y: number) =>
			x - desktop.left >= bin.x &&
			x - desktop.left < bin.x + CELL_WIDTH &&
			y - desktop.top >= bin.y &&
			y - desktop.top < bin.y + CELL_HEIGHT;
		const canDropOnBin = !ids.includes(RECYCLE_BIN_ID);
		// The grabbed icon goes first so it lands exactly where it's dropped.
		const moving = [id, ...ids.filter((other) => other !== id)];
		const start = { x: e.clientX, y: e.clientY };
		let current: Drag | null = null;

		const onMove = (ev: MouseEvent) => {
			const dx = ev.clientX - start.x;
			const dy = ev.clientY - start.y;
			if (!current && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
			current = {
				ids: moving,
				dx,
				dy,
				pointer: { x: ev.clientX, y: ev.clientY },
				overBin: canDropOnBin && isOverBin(ev.clientX, ev.clientY),
			};
			setDrag(current);
		};

		const onUp = () => {
			document.removeEventListener('mousemove', onMove);
			document.removeEventListener('mouseup', onUp);
			setDrag(null);

			if (!current) {
				// A plain click on one icon of a group selects just that icon.
				// Done on release so the whole group can still be dragged.
				if (!toggle) select([id]);
				return;
			}
			if (current.overBin) {
				recycle(moving);
				select([]);
				return;
			}
			const from = cellOrigin(layout[id]);
			const target = nearestCell(
				from.x + current.dx,
				from.y + current.dy,
				grid,
			);
			const delta = {
				col: target.col - layout[id].col,
				row: target.row - layout[id].row,
			};
			if (delta.col || delta.row) {
				setPositions(moveIcons(layout, moving, delta, grid));
			}
		};

		document.addEventListener('mousemove', onMove);
		document.addEventListener('mouseup', onUp);
	};

	const iconContent = (icon: DesktopIcon) => (
		<>
			<Image
				src={icon.icon}
				alt=""
				width={40}
				height={40}
				quality={icon.quality}
				draggable={false}
			/>
			<p>{icon.name}</p>
		</>
	);

	return (
		<>
			<Selecto
				ref={selectoRef}
				dragContainer={'.elements'}
				selectableTargets={[`.selecto-area .selectoItem`]}
				hitRate={0}
				selectByClick={true}
				selectFromInside={true}
				ratio={0}
				// Pressing on an icon starts an icon drag, not a selection box.
				onDragStart={(e) => {
					const target = e.inputEvent.target as Element;
					if (target.closest('.selectoItem')) e.stop();
				}}
				onSelect={(e) => {
					setSelected(
						e.selected
							.map((el) => (el as HTMLElement).dataset.desktopId)
							.filter((id): id is string => !!id),
					);
				}}
			/>
			{/* Clicking the desktop takes focus away from every window. */}
			<div
				className={`elements ${styles.container}`}
				onMouseDown={() => clearFocus()}
			>
				<div
					ref={desktopRef}
					className={`selecto-area ${styles.desktop}`}
					// Hidden until the saved desktop loads, so icons don't jump
					// or flash in. Still server-rendered so the links stay
					// crawlable.
					style={{ visibility: hydrated ? undefined : 'hidden' }}
				>
					{icons.map((icon) => {
						const { x, y } = cellOrigin(layout[icon.id]);
						const classes = [
							styles.item,
							'selectoItem',
							selected.includes(icon.id) && styles.selected,
							icon.id === RECYCLE_BIN_ID &&
								drag?.overBin &&
								styles.dropTarget,
						];
						return (
							<Link
								key={icon.id}
								href={icon.href}
								className={classes.filter(Boolean).join(' ')}
								style={{ left: x, top: y }}
								data-desktop-id={icon.id}
								draggable={false}
								onMouseDown={(e) =>
									handleIconMouseDown(e, icon.id)
								}
								// Like Windows: a click selects, a double-click opens.
								onClick={(e) => e.preventDefault()}
								onDoubleClick={() => openRoute(icon.href)}
							>
								{iconContent(icon)}
							</Link>
						);
					})}
				</div>
			</div>
			{drag && (
				// Translucent copies follow the pointer while the icons stay
				// put, drawn above windows like the Windows drag image.
				<div className={styles.dragLayer} aria-hidden>
					{drag.ids.map((id) => {
						const icon = icons.find((i) => i.id === id);
						if (!icon) return null;
						const { x, y } = cellOrigin(layout[id]);
						return (
							<div
								key={id}
								className={`${styles.item} ${styles.ghost}`}
								style={{
									left: x,
									top: y,
									transform: `translate(${drag.dx}px, ${drag.dy}px)`,
								}}
							>
								{iconContent(icon)}
							</div>
						);
					})}
					{drag.overBin && (
						<div
							className={styles.dragHint}
							style={{
								left: drag.pointer.x + 14,
								top: drag.pointer.y + 18,
							}}
						>
							<LuArrowRight />
							Move to Recycle Bin
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default Icons;
