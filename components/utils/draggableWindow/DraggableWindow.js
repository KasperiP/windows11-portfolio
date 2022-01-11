import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Context } from '../../../context/ContextProvider';
import styles from './DraggableWindow.module.css';

function DraggableWindow({ children, isClosing, keepPosition, windowName }) {
	const nodeRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);

	const {
		maximizedState,
		explorerHistoryState,
		indexState,
		wasManualState,
		positionState,
		windowPriorityState,
	} = useContext(Context);
	const [maximized, setMaximized] = maximizedState;
	const [history, setHistory] = explorerHistoryState;
	const [position, setPosition] = positionState;
	const [windowPriority, setWindowPriority] = windowPriorityState;

	const savePosition = (e, data) => {
		if (!keepPosition) return;
		setPosition({ x: data.x, y: data.y });
	};

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
			height: 'calc(100% - 49px)',
			width: '100%',
			borderRadius: '0px',
			opacity: 1,
		},
		minimized: { opacity: 1 },
	};

	return (
		<AnimatePresence>
			{!isClosing && (
				<Draggable
					nodeRef={nodeRef}
					handle=".draggable"
					cancel=".not_draggable"
					positionOffset={{
						x: 'calc(-50%)',
						y: 'calc(-50% - 25px)',
					}}
					position={maximized && { x: 0, y: 0 }}
					disabled={maximized}
					onStop={(e, data) => {
						savePosition(e, data);
						setIsDragging(false);
						handlePriority(windowName);
					}}
					defaultPosition={keepPosition ? position : { x: 0, y: 0 }}
					onStart={() => setIsDragging(true)}
				>
					<motion.div
						onClick={(e) => handleClick(e, windowName)}
						className={styles.container}
						ref={nodeRef}
						variants={variants}
						animate={maximized ? 'maximized' : 'minimized'}
						style={
							isDragging
								? { zIndex: 997 }
								: {
										transition: 'all 0.15s ease-in-out',
										zIndex: windowPriority[windowName],
								  }
						}
						initial={
							history.length >= 1
								? { opacity: 1 }
								: { opacity: 0 }
						}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
					>
						{children}
					</motion.div>
				</Draggable>
			)}
		</AnimatePresence>
	);
}

export default DraggableWindow;
