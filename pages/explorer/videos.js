import Head from 'next/head';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';

function videos() {
	return (
		<>
			<Head>
				<title>kassq - Videos</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/videos"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer folder="Videos" topNav={true} icon="videos" />
				<Icons />
			</div>
		</>
	);
}

export default videos;
