import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { Context } from '../../../context/ContextProvider';
import styles from './DraggableWindow.module.css';

function DraggableWindow({ children, isClosing, keepPosition, windowName }) {
	const nodeRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);

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

	const variants = {
		maximized: {
			borderRadius: '0px',
			transform: 'scale(1)',
		},
		minimized: { opacity: 1, transform: 'scale(1)' },
	};

	useEffect(() => {
		const getCenter = () => {
			let width = window.innerWidth;
			let height = window.innerHeight;

			const x = width / 2 - 880 / 2;
			const y = height / 2 - 550 / 2;

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
		console.log(position);
		if (position[windowName]?.x === 0 && position[windowName]?.y === 0) {
			getCenter();
		}
	}, []);

	return (
		<AnimatePresence>
			{!isClosing && (
				<Rnd
					dragHandleClassName={'draggable'}
					default={{ width: 880, height: 550 }}
					onDragStart={() => {
						setMaximized({ ...maximized, [windowName]: false });
						setIsDragging(true);
					}}
					onDragStop={(e, d) => {
						// Set the new position without replacing width and height
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
					size={
						maximized[windowName]
							? { width: '100%', height: '100%' }
							: {
									width: position[windowName]?.width || 880,
									height: position[windowName]?.height || 550,
							  }
					}
					position={
						maximized[windowName]
							? { x: 0, y: 0 }
							: {
									x: position[windowName]?.x,
									y: position[windowName]?.y,
							  }
					}
					minWidth={880}
					minHeight={550}
					style={
						isDragging
							? { zIndex: 997 }
							: {
									zIndex: windowPriority[windowName] || 10,
							  }
					}
				>
					<motion.div
						onClick={(e) => handleClick(e, windowName)}
						className={styles.container}
						ref={nodeRef}
						variants={variants}
						animate={
							maximized[windowName] ? 'maximized' : 'minimized'
						}
						style={
							isDragging
								? { zIndex: 997 }
								: {
										zIndex: windowPriority[windowName],
								  }
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
