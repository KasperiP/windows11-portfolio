import Head from 'next/head';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';

function desktop() {
	return (
		<>
			<Head>
				<title>kassq - desktop</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/file-explorer/desktop"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer folder="Desktop" topNav={true} />
				<Icons />
			</div>
		</>
	);
}

export default desktop;
