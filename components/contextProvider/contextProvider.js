import { createContext, useEffect, useState } from 'react';

export const Context = createContext();

const initialPriority = {
	fileExplorer: 10,
	mediaPlayer: 11,
};

const ContextProvider = ({ children }) => {
	const [maximized, setMaximized] = useState(false);

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
