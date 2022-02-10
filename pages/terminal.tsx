import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';
import { default as TerminalComponent } from '../components/windows/Terminal/Terminal';

function Terminal() {
	return (
		<>
			<Head>
				<title>kassq - Terminal</title>
				<link rel="canonical" href="https://www.kassq.dev/terminal" />
			</Head>
			<div style={{ height: '100%' }}>
				<TerminalComponent />
				<Icons />
			</div>
		</>
	);
}

export default Terminal;
