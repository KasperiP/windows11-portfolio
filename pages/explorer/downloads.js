import Head from 'next/head';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';

function downloads() {
	return (
		<>
			<Head>
				<title>kassq - Downloads</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/downloads"
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

export default downloads;
