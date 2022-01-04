import Head from 'next/head';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';

function downloads() {
	return (
		<>
			<Head>
				<title>kassq - downloads</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/file-explorer/downloads"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer folder="Downloads" topNav={true} />
				<Icons />
			</div>
		</>
	);
}

export default downloads;
