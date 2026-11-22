'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { useRouteSync } from '../../../hooks/useWindowManager';
import Bluescreen from '../../modules/Bluescreen/Bluescreen';
import Footer from '../../modules/Footer/Footer';
import Icons from '../../modules/Icons/Icons';
import MediaPlayer from '../../windows/MediaPlayer/MediaPlayer';
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

type Props = {
	children: React.ReactNode;
	explorer: React.ReactNode;
	notepad: React.ReactNode;
	terminal: React.ReactNode;
};

/**
 * The desktop. Each app's route renders into its own parallel-route slot, and
 * Next keeps a slot's last page mounted on client navigation, so every opened
 * window stays alive while the URL follows the focused one. Whether a window
 * is shown is decided by the window store, not by which route is active.
 */
function Layout({ children, explorer, notepad, terminal }: Props) {
	const isBreakpoint = useMediaQuery(880);
	useRouteSync();

	if (isBreakpoint) {
		return <Bluescreen errorCode="SCREEN_WIDTH_NOT_SUPPORTED" />;
	}

	return (
		<>
			<div className={`${styles.container} layout`}>
				{children}
				{explorer}
				{notepad}
				{terminal}
				<MediaPlayer />
				<Icons />
			</div>
			<Footer />
		</>
	);
}

export default Layout;
