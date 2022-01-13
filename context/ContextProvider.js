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
	},
	mediaPlayer: {
		x: 0,
		y: 0,
		width: 880,
		height: 550,
	},
	notepad: {
		x: 0,
		y: 0,
		width: 880,
		height: 550,
	},
};

const initialLastPos = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
};

const ContextProvider = ({ children }) => {
	const [maximized, setMaximized] = useState(initialMaximized);

	const [explorerHistory, setExplorerHistory] = useState([]);

	const [index, setIndex] = useState(0);

	const [position, setPosition] = useState(initialPosition);

	const [wasManual, setWasManual] = useState(false);

	const [windowPriority, setWindowPriority] = useState(initialPriority);

	const [lastPos, setLastPos] = useState({ x: 0, y: 0, width: 0, height: 0 });

	return (
		<Context.Provider
			value={{
				maximizedState: [maximized, setMaximized],
				explorerHistoryState: [explorerHistory, setExplorerHistory],
				indexState: [index, setIndex],
				wasManualState: [wasManual, setWasManual],
				positionState: [position, setPosition],
				windowPriorityState: [windowPriority, setWindowPriority],
				lastPosState: [lastPos, setLastPos],
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
