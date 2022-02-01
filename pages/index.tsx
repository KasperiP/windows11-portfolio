import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';

export default function Home() {
	return (
		<>
			<Head>
				<title>kassq</title>
				<link rel="canonical" href="https://www.kassq.dev" />
			</Head>
			<div style={{ height: '100%' }}>
				<Icons />
			</div>
		</>
	);
}
