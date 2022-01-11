import Head from 'next/head';
import React from 'react';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';

function music() {
	return (
		<>
			<Head>
				<title>kassq - Music</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/music"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer folder="Music" topNav={true} icon="music" />
				<Icons />
			</div>
		</>
	);
}

export default music;
