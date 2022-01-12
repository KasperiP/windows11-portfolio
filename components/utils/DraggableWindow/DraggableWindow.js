import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { Context } from '../../../context/ContextProvider';
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
	maximized: {
		borderRadius: '0px',
		transform: 'scale(1)',
	},
	minimized: {
		opacity: 1,
		transform: 'scale(1)',
	},
};

function DraggableWindow({ children, isClosing, keepPosition, windowName }) {
	const nodeRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isResizing, setIsResizing] = useState(false);
	const [loading, setLoading] = useState(true);

	const {
		maximizedState,
		explorerHistoryState,
		positionState,
		windowPriorityState,
	} = useContext(Context);
	const [maximized, setMaximized] = maximizedState;
	const [history, setHistory] = explorerHistoryState;
	const [position, setPosition] = positionState;
	const [windowPriority, setWindowPriority] = windowPriorityState;

	const handlePriority = (window) => {
		// Get all priority values for all windows and sort them
		const priorityValues = Object.values(windowPriority).sort(
			(a, b) => a - b
		);
		// Get the highest priority value
		const highestPriority = priorityValues[priorityValues.length - 1];

		// If the window has highest priority then return
		if (windowPriority[window] === highestPriority) return;

		// Reduce all priority values by 1. Keep the keys same
		const newPriority = Object.fromEntries(
			Object.entries(windowPriority).map(([key, value]) => [
				key,
				value - 1,
			])
		);

		// Set highest priority value to the current window
		newPriority[window] = highestPriority;

		// Set the new priority values
		setWindowPriority(newPriority);
	};

	const handleClick = (e, window) => {
		handlePriority(window);
	};

	useEffect(() => {
		console.log('boo', position[windowName]);
	}, [position]);

	useEffect(() => {
		const getCenter = () => {
			let width = window.innerWidth;
			let height = window.innerHeight;

			let x;
			let y;
			if (width !== position[windowName].width) {
				x = width / 2 - position[windowName].width / 2;
			} else {
				x = width / 2 - 880 / 2;
			}

			if (height !== position[windowName].height) {
				y = height / 2 - position[windowName].height / 2;
			} else {
				y = height / 2 - 550 / 2;
			}

			setPosition({
				...position,
				[windowName]: {
					x: x,
					y: y,
					width: 880,
					height: 550,
				},
			});
		};

		if (position[windowName]?.x === 0 && position[windowName]?.y === 0) {
			getCenter();
		}

		// wait .5 sec before setting loading to false
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, []);

	const [lastPos, setLastPos] = useState({ x: 0, y: 0, width: 0, height: 0 });

	useEffect(() => {
		if (maximized[windowName] === true) {
			setLastPos({
				x: position[windowName].x,
				y: position[windowName].y,
				width: position[windowName].width,
				height: position[windowName].height,
			});

			setPosition({
				...position,
				[windowName]: {
					x: 0,
					y: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				},
			});
		} else if (maximized[windowName] === false) {
			setPosition({
				...position,
				[windowName]: {
					x: lastPos.x,
					y: lastPos.y,
					width: lastPos.width,
					height: lastPos.height,
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [maximized]);

	return (
		<AnimatePresence>
			{!isClosing && (
				<Rnd
					dragHandleClassName={'draggable'}
					cancel={'.not_draggable'}
					default={{ width: 880, height: 550 }}
					onDragStart={() => {
						if (maximized[windowName]) {
							setMaximized({ ...maximized, [windowName]: false });
						}
						setIsDragging(true);
					}}
					onDragStop={(e, d) => {
						setPosition({
							...position,
							[windowName]: {
								...position[windowName],
								x: d.x,
								y: d.y,
							},
						});
						setIsDragging(false);
					}}
					onResize={(e, direction, ref, delta, pos) => {
						if (maximized[windowName]) {
							setMaximized({ ...maximized, [windowName]: false });
						}
						setIsResizing(true);
						setPosition({
							...position,
							[windowName]: {
								x: pos.x,
								y: pos.y,
								width: ref.offsetWidth,
								height: ref.offsetHeight,
							},
						});
					}}
					onResizeStop={(e, direction, ref, delta, pos) => {
						setIsResizing(false);
					}}
					size={{
						width: position[windowName].width || 880,
						height: position[windowName].height || 550,
					}}
					position={{
						x: position[windowName].x,
						y: position[windowName].y,
					}}
					minWidth={880}
					minHeight={550}
					style={
						isDragging || isResizing || loading
							? { zIndex: 997 }
							: {
									zIndex: windowPriority[windowName] || 10,
									transition: 'all 0.2s ease-in-out',
							  }
					}
					resizeHandleStyles={handleStyles}
				>
					<motion.div
						onClick={(e) => handleClick(e, windowName)}
						className={styles.container}
						ref={nodeRef}
						variants={variants}
						animate={
							maximized[windowName] ? 'maximized' : 'minimized'
						}
						initial={
							history.length >= 1
								? { transform: 'scale(1)' }
								: { transform: 'scale(0)' }
						}
						exit={{ transform: 'scale(0)' }}
						transition={{ duration: 0.15 }}
					>
						{children}
					</motion.div>
				</Rnd>
			)}
		</AnimatePresence>
	);
}

export default DraggableWindow;
