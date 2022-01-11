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
	const handleDrag = (e, data) => {
		if (maximized[windowName]) {
			setMaximized({ ...maximized, [windowName]: false });
		}
	};

	const variants = {
		maximized: {
			borderRadius: '0px',
			opacity: 1,
		},
		minimized: { opacity: 1 },
	};

	// Javascript function to calculate center for abolute div with height 550 and width 880
	const getCenter = () => {
		let width = window.innerWidth;
		let height = window.innerHeight;

		const x = width / 2 - 880 / 2;
		const y = height / 2 - 550 / 2;

		setPosition({ x: x, y: y });
	};

	useEffect(() => {
		getCenter();
	}, []);

	return (
		<AnimatePresence>
			{!isClosing && (
				<Rnd
					onDragStart={() =>
						setMaximized({ ...maximized, [windowName]: false })
					}
					onDragStop={(e, d) => {
						setPosition({ x: d.x, y: d.y });
					}}
					onResize={(e, direction, ref, delta, position) => {
						setPosition({
							width: ref.offsetWidth,
							height: ref.offsetHeight,
							...position,
						});
					}}
					size={
						maximized[windowName]
							? { width: '100%', height: '100%' }
							: { width: position.width, height: position.height }
					}
					position={
						maximized[windowName]
							? { x: 0, y: 0 }
							: { x: position.x, y: position.y }
					}
					minWidth={880}
					minHeight={550}
					style={{
						zIndex: windowPriority[windowName],
					}}
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
								? { opacity: 1 }
								: { opacity: 0 }
						}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						{children}
					</motion.div>
				</Rnd>
			)}
		</AnimatePresence>
	);
}

export default DraggableWindow;
