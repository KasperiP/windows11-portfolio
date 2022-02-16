import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';
import { default as TerminalComponent } from '../components/windows/Terminal/Terminal';

function Terminal() {
	return (
		<>
			<Head>
				<title>kassq - Terminal</title>
				<link rel="canonical" href="https://www.kassq.dev/terminal" />

				{/* Description */}
				<meta
					name="description"
					content="A place to execute commands and feel like being a hacker."
				/>

				{/* OpenGraph */}
				<meta property="og:title" content="Kassq - Terminal" />
				<meta
					property="og:url"
					content="https://www.kassq.dev/terminal"
				/>
				<meta
					property="og:description"
					content="A place to execute commands and feel like being a hacker."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<TerminalComponent />
				<Icons />
			</div>
		</>
	);
}

export default Terminal;
