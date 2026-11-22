'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import Selecto from 'react-selecto';
import { reopenIfCurrentRoute } from '../../../hooks/useWindowManager';
import { RECYCLE_BIN_PATH, recycleBinIcon } from '../../../lib/desktop';
import {
	useDesktopStore,
	useVisibleDesktopItems,
} from '../../../store/desktop';
import { useWindowStore } from '../../../store/windows';
import styles from './Icons.module.css';

const RECYCLE_BIN_ID = 'recycle-bin';

function Icons() {
	const selectoRef = useRef<Selecto>(null);
	const [selected, setSelected] = useState<string[]>([]);

	const clearFocus = useWindowStore((s) => s.clearFocus);
	const items = useVisibleDesktopItems();
	const binFull = useDesktopStore((s) => s.recycled.length > 0);
	const hydrated = useDesktopStore((s) => s.hydrated);
	const recycle = useDesktopStore((s) => s.recycle);

	// The desktop store persists to localStorage, which only exists here.
	useEffect(() => {
		void useDesktopStore.persist.rehydrate();
	}, []);

	const deleteSelected = useCallback(() => {
		const ids = selected.filter((id) => id !== RECYCLE_BIN_ID);
		if (!ids.length) return;
		recycle(ids);
		setSelected([]);
		selectoRef.current?.setSelectedTargets([]);
	}, [recycle, selected]);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key !== 'Delete') return;
			// Only when the desktop has focus, not while typing in a window.
			if (useWindowStore.getState().focused !== null) return;
			const target = e.target as Element;
			if (target.closest('input, textarea, [contenteditable="true"]')) {
				return;
			}
			deleteSelected();
		};
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [deleteSelected]);

	const itemClass = (id: string) =>
		`${styles.item} selectoItem ${selected.includes(id) ? styles.selected : ''}`;

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
				onClickCapture={reopenIfCurrentRoute}
			>
				<div
					className={`selecto-area ${styles.wrapper}`}
					id="selecto1"
					// Hidden until the saved desktop loads, so icons that are
					// in the Recycle Bin don't flash in. Still server-rendered
					// so the links stay crawlable.
					style={{ visibility: hydrated ? undefined : 'hidden' }}
				>
					{items.map((item) => (
						<Link
							key={item.id}
							href={item.href}
							className={itemClass(item.id)}
							data-desktop-id={item.id}
							draggable={false}
						>
							<Image
								src={item.icon}
								alt="icon"
								width={40}
								height={40}
								quality={item.quality}
							/>
							<p>{item.name}</p>
						</Link>
					))}
					<Link
						href={RECYCLE_BIN_PATH}
						className={itemClass(RECYCLE_BIN_ID)}
						data-desktop-id={RECYCLE_BIN_ID}
						draggable={false}
					>
						<Image
							src={recycleBinIcon(binFull)}
							alt="icon"
							width={40}
							height={40}
						/>
						<p>Recycle Bin</p>
					</Link>
				</div>
			</div>
		</>
	);
}

export default Icons;
