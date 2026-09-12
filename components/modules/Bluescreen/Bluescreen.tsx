import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Bluescreen.module.css';

type Props = {
	errorCode: string;
};

function Bluescreen({ errorCode }: Props) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (progress >= 100) return;
		const timeout = setTimeout(() => {
			setProgress(Math.min(progress + Math.floor(Math.random() * 10), 100));
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [progress]);

	return (
		<>
			<Head>
				<title>kassq - {errorCode || 'ERROR'}</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<div>
						<h1>:(</h1>
						<h2>
							Your PC ran into a problem and needs to restart.
							We&apos;re just collecting some error info, and then
							we&apos;ll restart for you.
						</h2>
					</div>
					<h2>{progress}% complete</h2>
					<div className={styles.aboutIssue}>
						<div>
							<Image
								src="/images/windowsErrorQR.svg"
								unoptimized
								alt="svg"
								width={140}
								height={140}
							></Image>
						</div>
						<div>
							<h2>
								For more information about this issue and
								possible fixes, visit https://kassq.dev/error
							</h2>
							<h2>
								If you call a support person, give them this
								info: Stop Code: {errorCode || 'UNKNOWN'}
							</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Bluescreen;
