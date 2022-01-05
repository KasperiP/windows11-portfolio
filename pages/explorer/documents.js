import Head from 'next/head';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';

function documents() {
	return (
		<>
			<Head>
				<title>kassq - Documents</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/documents"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					folder="Documents"
					topNav={true}
					icon="documents"
				/>
				<Icons />
			</div>
		</>
	);
}

export default documents;
