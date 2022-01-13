import Layout from '../components/layouts/Layout/Layout';
import '../styles/globals.css';
import { useState, useCallback, useEffect } from 'react';
import Bluescreen from '../components/modules/Bluescreen/Bluescreen';
import { useRouter } from 'next/router';
import ContextProvider from '../context/ContextProvider';

const useMediaQuery = (width) => {
	const [targetReached, setTargetReached] = useState(false);

	const updateTarget = useCallback((e) => {
		if (e.matches) {
			setTargetReached(true);
		} else {
			setTargetReached(false);
		}
	}, []);

	useEffect(() => {
		let isMounted = true;

		const media = window.matchMedia(`(max-width: ${width}px)`);
		media.addEventListener('change', updateTarget);

		// Check on mount (callback is not called until a change occurs)
		if (media.matches) {
			if (isMounted) setTargetReached(true);
		}

		return () => {
			isMounted = false;
			media.removeEventListener('change', updateTarget);
		};
	}, [updateTarget, width]);

	return targetReached;
};

function MyApp({ Component, pageProps }) {
	const isBreakpoint = useMediaQuery(880);

	const router = useRouter();

	useEffect(() => storePathValues, [router.asPath]);

	function storePathValues() {
		const storage = globalThis?.sessionStorage;
		if (!storage) return;
		storage.setItem('prevPath', globalThis.location.pathname);
	}

	// Google analytics
	useEffect(() => {
		const handleRouteChange = (url) => {
			window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
				page_path: url,
			});
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return (
		<ContextProvider>
			{isBreakpoint ? (
				<>
					<Bluescreen errorCode="SCREEN_WIDTH_NOT_SUPPORTED" />
				</>
			) : (
				<>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</>
			)}
		</ContextProvider>
	);
}

export default MyApp;
