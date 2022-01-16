import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Bluescreen.module.css';

function Bluescreen(props) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let isMounted = true;
		let interval = setInterval(() => {
			if (progress <= 100) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				let newProgress = (progress += parseInt(Math.random() * 10));
				if (newProgress > 100) newProgress = 100;
				if (isMounted) setProgress(newProgress);
			} else {
				if (isMounted) setProgress(100);
				clearInterval(interval);
			}
		}, 1000);
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<>
			<Head>
				<title>kassq - {props.errorCode || 'ERROR'}</title>
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
								info: Stop Code: {props.errorCode || 'UNKNOWN'}
							</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Bluescreen;
