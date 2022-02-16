import Head from 'next/head';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';

function Music() {
	return (
		<>
			<Head>
				<title>kassq - Music</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/music"
				/>

				{/* Description */}
				<meta
					name="description"
					content="I think this folder has some meme value?"
				/>

				{/* OpenGraph */}
				<meta property="og:title" content="Kassq - Music" />
				<meta
					property="og:url"
					content="https://www.kassq.dev/explorer/music"
				/>
				<meta
					property="og:description"
					content="I think this folder has some meme value?"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer folder="Music" topNav={true} icon="music" />
				<Icons />
			</div>
		</>
	);
}

export default Music;
