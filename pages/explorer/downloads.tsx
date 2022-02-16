import Head from 'next/head';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';

function Downloads() {
	return (
		<>
			<Head>
				<title>kassq - Downloads</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/downloads"
				/>

				{/* Description */}
				<meta
					name="description"
					content="I have an obsession to keep this folder empty."
				/>

				{/* OpenGraph */}
				<meta property="og:title" content="Kassq - Downloads" />
				<meta
					property="og:url"
					content="https://www.kassq.dev/explorer/downloads"
				/>
				<meta
					property="og:description"
					content="I have an obsession to keep this folder empty."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					folder="Downloads"
					topNav={true}
					icon="downloads"
				/>
				<Icons />
			</div>
		</>
	);
}

export default Downloads;
