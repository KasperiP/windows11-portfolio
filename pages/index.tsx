import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';

export default function Home() {
	return (
		<>
			<Head>
				<title>kassq</title>
				<link rel="canonical" href="https://www.kassq.dev" />

				{/* Description */}
				<meta
					name="description"
					content="Kassq's personal website. A place to share my projects and learn about me. I do some coding sometimes."
				/>

				{/* OpenGraph */}
				<meta property="og:title" content="Kassq" />
				<meta property="og:url" content="https://www.kassq.dev" />
				<meta
					property="og:description"
					content="Kassq's personal website. A place to share my projects and learn about me. I do some coding sometimes."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<Icons />
			</div>
		</>
	);
}
