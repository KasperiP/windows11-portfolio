import { createContext, useEffect, useState } from 'react';

export const Context = createContext();

const initialPriority = {
	fileExplorer: 100,
	mediaPlayer: 101,
};

const initialMaximized = {
	fileExplorer: null,
	mediaPlayer: null,
	notepad: null,
};

const initialPosition = {
	fileExplorer: {
		x: 0,
		y: 0,
		width: 880,
		height: 550,
		lastX: 0,
		lastY: 0,
		lastWidth: 880,
		lastHeight: 550,
	},
	mediaPlayer: {
		x: 0,
		y: 0,
		width: 880,
		height: 550,
		lastX: 0,
		lastY: 0,
		lastWidth: 880,
		lastHeight: 550,
	},
	notepad: {
		x: 0,
		y: 0,
		width: 880,
		height: 550,
		lastX: 0,
		lastY: 0,
		lastWidth: 880,
		lastHeight: 550,
	},
};

const ContextProvider = ({ children }) => {
	const [maximized, setMaximized] = useState(initialMaximized);

	const [explorerHistory, setExplorerHistory] = useState([]);
	const [index, setIndex] = useState(0);

	const [position, setPosition] = useState(initialPosition);

	const [wasManual, setWasManual] = useState(false);

	const [windowPriority, setWindowPriority] = useState(initialPriority);

	return (
		<Context.Provider
			value={{
				maximizedState: [maximized, setMaximized],
				explorerHistoryState: [explorerHistory, setExplorerHistory],
				indexState: [index, setIndex],
				wasManualState: [wasManual, setWasManual],
				positionState: [position, setPosition],
				windowPriorityState: [windowPriority, setWindowPriority],
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
