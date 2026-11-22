'use client';

import { useSyncExternalStore } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../lib/windows';

const subscribeResize = (onChange: () => void) => {
	window.addEventListener('resize', onChange);
	return () => window.removeEventListener('resize', onChange);
};

/**
 * Live viewport size in pixels. The server has no viewport, so it renders
 * with the default window size and the client updates after hydration.
 */
export function useViewport() {
	const width = useSyncExternalStore(
		subscribeResize,
		() => window.innerWidth,
		() => DEFAULT_WIDTH,
	);
	const height = useSyncExternalStore(
		subscribeResize,
		() => window.innerHeight,
		() => DEFAULT_HEIGHT,
	);
	return { width, height };
}
