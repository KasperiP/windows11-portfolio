import Layout from '../components/layout/Layout';
import '../styles/globals.scss';
import { useState, useCallback, useEffect } from 'react';
import Bluescreen from '../components/bluescreen/Bluescreen';
import { useRouter } from 'next/router';

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
	}, []);

	return targetReached;
};

function MyApp({ Component, pageProps }) {
	const isBreakpoint = useMediaQuery(768);

	const router = useRouter();

	useEffect(() => storePathValues, [router.asPath]);

	function storePathValues() {
		const storage = globalThis?.sessionStorage;
		if (!storage) return;
		// Set the previous path as the value of the current path.
		const prevPath = storage.getItem('currentPath');
		storage.setItem('prevPath', prevPath);
		// Set the current path value by looking at the browser's location object.
		storage.setItem('currentPath', globalThis.location.pathname);
	}

	return (
		<>
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
		</>
	);
}

export default MyApp;
