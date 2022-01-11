import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Context } from '../contextProvider/contextProvider';
import styles from './DraggableWindow.module.scss';

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
		setPosition({ x: data.x, y: data.y });
	};

	const handlePriority = (window) => {
		const highestPriority = Object.values(windowPriority).reduce((a, b) =>
			Math.max(a, b)
		);
		if (windowPriority[windowName] === highestPriority) return;

		const newPriority = { ...windowPriority };
		newPriority[window] = highestPriority + 1;
		setWindowPriority(newPriority);
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
						onClick={() => handlePriority(windowName)}
						className={styles.container}
						ref={nodeRef}
						variants={variants}
						animate={maximized ? 'maximized' : 'minimized'}
						style={
							isDragging
								? { zIndex: 9999 }
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
