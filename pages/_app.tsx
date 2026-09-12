import { GoogleAnalytics } from '@next/third-parties/google';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useSyncExternalStore } from 'react';
import Layout from '../components/layouts/Layout/Layout';
import Bluescreen from '../components/modules/Bluescreen/Bluescreen';
import ContextProvider from '../context/ContextProvider';
import '../styles/globals.css';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

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

function MyApp({ Component, pageProps }: AppProps) {
	const isBreakpoint = useMediaQuery(880);

	const router = useRouter();

	// FileExplorer reads prevPath to decide whether a window is already open.
	useEffect(() => {
		const storage = globalThis?.sessionStorage;
		if (!storage) return;
		storage.setItem('prevPath', globalThis.location.pathname);
	}, [router.asPath]);

	return (
		<ContextProvider>
			{isBreakpoint ? (
				<Bluescreen errorCode="SCREEN_WIDTH_NOT_SUPPORTED" />
			) : (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			)}
			{GA_ID && <GoogleAnalytics gaId={GA_ID} />}
		</ContextProvider>
	);
}

export default MyApp;
