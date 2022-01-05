import Head from 'next/head';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';

function quickAccess() {
	return (
		<>
			<Head>
				<title>kassq - Quick access</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/file-explorer/downloads"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					folder="Quick access"
					topNav={true}
					icon="quickaccess"
				/>
				<Icons />
			</div>
		</>
	);
}

export default quickAccess;
