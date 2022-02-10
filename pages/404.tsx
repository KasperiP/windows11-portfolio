import Head from 'next/head';
import Bluescreen from '../components/modules/Bluescreen/Bluescreen';

function Custom404() {
	return (
		<>
			<Head>
				<title>kassq - 404</title>
			</Head>
			<Bluescreen errorCode="404_NOT_FOUND" />
		</>
	);
}

export default Custom404;
