'use client';

import { AnimatePresence, motion } from 'motion/react';
import {
	type MouseEvent,
	type ReactNode,
	useEffect,
	useState,
	useSyncExternalStore,
} from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import {
	VscChromeClose,
	VscChromeMaximize,
	VscChromeMinimize,
} from 'react-icons/vsc';
import { Rnd } from 'react-rnd';
import { useWindowActions } from '../../../hooks/useWindowManager';
import {
	DEFAULT_HEIGHT,
	DEFAULT_WIDTH,
	TASKBAR_HEIGHT,
	type WindowId,
} from '../../../lib/windows';
import { useWindowStore } from '../../../store/windows';
import styles from './DraggableWindow.module.css';

const handleStyles = {
	bottom: {
		cursor: 'ns-resize',
	},
	bottomLeft: {
		cursor: 'nesw-resize',
	},
	bottomRight: {
		cursor: 'nwse-resize',
	},
	left: {
		cursor: 'ew-resize',
	},
	right: {
		cursor: 'ew-resize',
	},
	top: {
		cursor: 'ns-resize',
	},
	topLeft: {
		cursor: 'nwse-resize',
	},
	topRight: {
		cursor: 'nesw-resize',
	},
};

const variants = {
	// .container carries border-radius: 10px; the maximized window squares off.
	// Every visible variant names borderRadius so Motion can animate back.
	maximized: {
		borderRadius: '0px',
		scale: 1,
		opacity: 1,
		y: 0,
	},
	restored: {
		borderRadius: '10px',
		scale: 1,
		opacity: 1,
		y: 0,
	},
	// Minimized: shrink down towards the taskbar but stay mounted, so the
	// window keeps its state (Notepad text, Terminal history, playing video).
	hidden: {
		scale: 0.6,
		opacity: 0,
		y: 150,
	},
	enterFresh: {
		scale: 0,
	},
};

const subscribeResize = (onChange: () => void) => {
	window.addEventListener('resize', onChange);
	return () => window.removeEventListener('resize', onChange);
};

/**
 * Live viewport size, so a maximized window keeps filling the screen when the
 * browser is resized. Numbers rather than CSS strings: react-rnd appends "px"
 * to any size string it doesn't recognise, which breaks calc().
 */
const useViewport = () => {
	const width = useSyncExternalStore(
		subscribeResize,
		() => window.innerWidth,
		() => DEFAULT_WIDTH,
	);
	const height = useSyncExternalStore(
		subscribeResize,
		() => window.innerHeight,
		() => DEFAULT_HEIGHT,
	);
	return { width, height };
};

type Props = {
	children: ReactNode;
	windowId: WindowId;
	topTitle: string;
	topIcon?: ReactNode;
};

function DraggableWindow({ children, windowId, topTitle, topIcon }: Props) {
	const [isDragging, setIsDragging] = useState(false);
	const [isResizing, setIsResizing] = useState(false);

	const win = useWindowStore((s) => s.windows[windowId]);
	const setRect = useWindowStore((s) => s.setRect);
	const setMaximized = useWindowStore((s) => s.setMaximized);
	const setTitle = useWindowStore((s) => s.setTitle);
	const { activate, minimizeWindow, closeWindow } = useWindowActions();
	const viewport = useViewport();

	useEffect(() => {
		setTitle(windowId, topTitle);
	}, [setTitle, topTitle, windowId]);

	const { open, minimized, maximized, rect } = win;

	const handleFocus = (e: MouseEvent) => {
		// The title bar buttons act on the window themselves.
		if ((e.target as Element).closest('.not_draggable')) return;
		activate(windowId);
	};

	const toggleMaximize = () => setMaximized(windowId, !maximized);

	const isMoving = isDragging || isResizing;

	return (
		// initial={false}: a window that is already open when this mounts
		// (e.g. navigating between explorer folders) should not zoom in again.
		<AnimatePresence initial={false}>
			{open && rect && (
				<Rnd
					key={windowId}
					dragHandleClassName={'draggable'}
					cancel={'.not_draggable'}
					onDragStart={() => {
						if (maximized) setMaximized(windowId, false);
						setIsDragging(true);
					}}
					onDragStop={(e, d) => {
						setRect(windowId, { ...rect, x: d.x, y: d.y });
						setIsDragging(false);
					}}
					onResizeStart={() => {
						if (maximized) setMaximized(windowId, false);
						setIsResizing(true);
					}}
					onResize={(e, direction, ref, delta, pos) => {
						setRect(windowId, {
							x: pos.x,
							y: pos.y,
							width: ref.offsetWidth,
							height: ref.offsetHeight,
						});
					}}
					onResizeStop={() => {
						setIsResizing(false);
					}}
					size={
						maximized
							? {
									width: viewport.width,
									height: viewport.height - TASKBAR_HEIGHT,
								}
							: { width: rect.width, height: rect.height }
					}
					position={
						maximized ? { x: 0, y: 0 } : { x: rect.x, y: rect.y }
					}
					minWidth={DEFAULT_WIDTH}
					minHeight={DEFAULT_HEIGHT}
					className={isMoving ? '' : styles.animatedWindow}
					style={{
						zIndex: isMoving ? 997 : win.z,
						pointerEvents: minimized ? 'none' : undefined,
					}}
					resizeHandleStyles={handleStyles}
				>
					<motion.div
						onMouseDown={handleFocus}
						className={styles.container}
						variants={variants}
						animate={
							minimized
								? 'hidden'
								: maximized
									? 'maximized'
									: 'restored'
						}
						initial="enterFresh"
						exit={{ scale: 0 }}
						transition={{ duration: 0.15 }}
						style={
							windowId === 'terminal'
								? { backgroundColor: 'transparent' }
								: {}
						}
					>
						<div className={styles.main}>
							<nav>
								<section
									className={`${styles.top} draggable`}
									onDoubleClick={toggleMaximize}
								>
									{windowId === 'terminal' ? (
										<>
											<div
												className={
													styles.terminalContainer
												}
											>
												<div>
													<div>
														{topIcon}
														<p>{topTitle}</p>
													</div>
													<VscChromeClose />
												</div>
												<div
													className={
														styles.manageButtons
													}
												>
													<AiOutlinePlus />
													<RiArrowDropDownLine />
												</div>
											</div>
										</>
									) : (
										<>
											<div
												className={styles.topContainer}
											>
												{topIcon}
												<p>{topTitle}</p>
											</div>
										</>
									)}
									<div
										className={`${styles.iconContainer} not_draggable`}
									>
										<div
											className={styles.icon}
											onClick={() =>
												minimizeWindow(windowId)
											}
										>
											<VscChromeMinimize />
										</div>
										<div
											className={styles.icon}
											onClick={toggleMaximize}
										>
											<VscChromeMaximize />
										</div>
										<div
											className={styles.iconClose}
											onClick={() =>
												closeWindow(windowId)
											}
										>
											<VscChromeClose />
										</div>
									</div>
								</section>
							</nav>
							{children}
						</div>
					</motion.div>
				</Rnd>
			)}
		</AnimatePresence>
	);
}

export default DraggableWindow;
