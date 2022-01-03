import Head from 'next/head';
import Icons from '../components/icons/Icons';

export default function Home() {
	return (
		<>
			<Head>
				<title>kassq</title>
			</Head>
			<div style={{ height: '100%' }}>
				<Icons />
			</div>
		</>
	);
}
