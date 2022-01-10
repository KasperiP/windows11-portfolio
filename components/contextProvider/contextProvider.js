import { createContext, useEffect, useState } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
	const [maximized, setMaximized] = useState(false);

	const [explorerHisotry, setExplorerHisotry] = useState([]);
	const [index, setIndex] = useState(0);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const [wasManual, setWasManual] = useState(false);

	return (
		<Context.Provider
			value={{
				maximizedState: [maximized, setMaximized],
				explorerHistoryState: [explorerHisotry, setExplorerHisotry],
				indexState: [index, setIndex],
				wasManualState: [wasManual, setWasManual],
				positionState: [position, setPosition],
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
