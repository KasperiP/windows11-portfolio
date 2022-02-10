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
	const priorityValues = Object.values(windowPriority).sort((a, b) => a - b);

	const highestPriority = priorityValues[priorityValues.length - 1];

	if (windowPriority[windowName] === highestPriority) return;

	const newPriority = Object.fromEntries(
		Object.entries(windowPriority).map(([key, value]) => [key, value - 1])
	);

	newPriority[windowName] = highestPriority;

	return newPriority;
};
