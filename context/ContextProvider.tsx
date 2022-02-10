import React, { createContext, useState } from 'react';

type LastPos = {
	x: number;
	y: number;
	width: number;
	height: number;
};

type PositionState = {
	[key: string]: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
};

type WindowPriority = {
	[key: string]: number;
};

type Maximized = {
	[key: string]: boolean | null;
};

type ContextType = {
	maximizedState: [Maximized, (newMaximized: Maximized) => void];
	explorerHistoryState: [string[], (newExplorerHistory: string[]) => void];
	indexState: [number, (newIndex: number) => void];
	wasManualState: [boolean, (newWasManual: boolean) => void];
	positionState: [PositionState, (newPosition: PositionState) => void];
	windowPriorityState: [
		WindowPriority,
		(newPriority: WindowPriority) => void
	];
	lastPosState: [LastPos, (newLastPos: LastPos) => void];
};

// React-selecto uses z-index 100 so these values must be higher than
const initialPriority = {
	fileExplorer: 101,
};

const initialMaximized = {
	fileExplorer: null,
	mediaPlayer: null,
	notepad: null,
	terminal: null,
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
	terminal: {
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

const initialState: ContextType = {
	maximizedState: [initialMaximized, () => {}],
	explorerHistoryState: [[], () => {}],
	indexState: [0, () => {}],
	wasManualState: [false, () => {}],
	positionState: [initialPosition, () => {}],
	windowPriorityState: [initialPriority, () => {}],
	lastPosState: [initialLastPos, () => {}],
};

export const Context = createContext<ContextType>(initialState);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [maximized, setMaximized] = useState<Maximized>(initialMaximized);
	const [explorerHistory, setExplorerHistory] = useState<string[]>([]);
	const [index, setIndex] = useState<number>(0);
	const [position, setPosition] = useState<PositionState>(initialPosition);
	const [wasManual, setWasManual] = useState<boolean>(false);
	const [windowPriority, setWindowPriority] =
		useState<WindowPriority>(initialPriority);
	const [lastPos, setLastPos] = useState<LastPos>(initialLastPos);

	const appContext: ContextType = {
		maximizedState: [maximized, setMaximized],
		explorerHistoryState: [explorerHistory, setExplorerHistory],
		indexState: [index, setIndex],
		wasManualState: [wasManual, setWasManual],
		positionState: [position, setPosition],
		windowPriorityState: [windowPriority, setWindowPriority],
		lastPosState: [lastPos, setLastPos],
	};

	return <Context.Provider value={appContext}>{children}</Context.Provider>;
};

export default ContextProvider;
