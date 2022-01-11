import { createContext, useEffect, useState } from 'react';

export const Context = createContext();

const initialPriority = {
	fileExplorer: 100,
	mediaPlayer: 101,
};

const initialMaximized = {
	fileExplorer: false,
	mediaPlayer: false,
	notepad: false,
};

const ContextProvider = ({ children }) => {
	const [maximized, setMaximized] = useState(initialMaximized);

	const [explorerHistory, setExplorerHistory] = useState([]);
	const [index, setIndex] = useState(0);

	const [position, setPosition] = useState({ x: 0, y: 0 });

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
