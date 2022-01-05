import Head from 'next/head';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';

function pictures() {
	return (
		<>
			<Head>
				<title>kassq - Pictures</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/pictures"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer folder="Pictures" topNav={true} icon="pictures" />
				<Icons />
			</div>
		</>
	);
}

export default pictures;
