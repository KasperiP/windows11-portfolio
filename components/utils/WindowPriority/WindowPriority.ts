import { MouseEvent } from 'react';

export const handleWindowPriority = async (params: {
	e?: MouseEvent;
	windowName: string;
	windowPriority: { [key: string]: number };
}) => {
	const { e, windowName, windowPriority } = params;
	if (e) {
		const target = e.target as HTMLElement;
		if (target.className === 'no_click') return;
	}

	// Get all priority values for all windows and sort them
	const priorityValues = Object.values(windowPriority).sort((a, b) => a - b);
	// Get the highest priority value
	const highestPriority = priorityValues[priorityValues.length - 1];

	// If the window has highest priority then return
	if (windowPriority[windowName] === highestPriority) return;

	// Reduce all priority values by 1. Keep the keys same
	const newPriority = Object.fromEntries(
		Object.entries(windowPriority).map(([key, value]) => [key, value - 1])
	);

	// Set highest priority value to the current window
	newPriority[windowName] = highestPriority;

	return newPriority;
};
