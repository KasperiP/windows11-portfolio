'use client';

import { useCallback, useSyncExternalStore } from 'react';
import Bluescreen from '../../modules/Bluescreen/Bluescreen';
import Footer from '../../modules/Footer/Footer';
import styles from './Layout.module.css';

/**
 * Subscribes to a max-width media query. Uses useSyncExternalStore rather than
 * useEffect + setState so the first client render already has the real value
 * and no cascading render is triggered.
 */
const useMediaQuery = (width: number) => {
	const query = `(max-width: ${width}px)`;

	const subscribe = useCallback(
		(onChange: () => void) => {
			const media = window.matchMedia(query);
			media.addEventListener('change', onChange);
			return () => media.removeEventListener('change', onChange);
		},
		[query],
	);

	const getSnapshot = useCallback(
		() => window.matchMedia(query).matches,
		[query],
	);

	// The server has no viewport; assume the desktop layout.
	const getServerSnapshot = () => false;

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

function Layout({ children }: { children: React.ReactNode }) {
	const isBreakpoint = useMediaQuery(880);

	if (isBreakpoint) {
		return <Bluescreen errorCode="SCREEN_WIDTH_NOT_SUPPORTED" />;
	}

	return (
		<>
			<div className={`${styles.container} layout`}>{children}</div>
			<Footer />
		</>
	);
}

export default Layout;
