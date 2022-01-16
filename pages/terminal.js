import Head from 'next/head';
import { useEffect } from 'react';
import Icons from '../components/modules/Icons/Icons';
import Terminal from '../components/windows/Terminal/Terminal';

function Main() {
	return (
		<>
			<Head>
				<title>kassq - Terminal</title>
				<link rel="canonical" href="https://www.kassq.dev/terminal" />
			</Head>
			<div style={{ height: '100%' }}>
				<Terminal />
				<Icons />
			</div>
		</>
	);
}

export default Main;
