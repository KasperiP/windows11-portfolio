import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsFillPinAngleFill } from 'react-icons/bs';
import { RiArrowDropDownLine } from 'react-icons/ri';
import FileExplorer from '../../components/fileExplorer/FileExplorer';
import Icons from '../../components/icons/Icons';
import styles from '../../styles/utils/GridList.module.scss';

function thisPC() {
	const content = () => {
		return (
			<>
				<div className={styles.dropdownNav}>
					<RiArrowDropDownLine />
					<h2>Folders (6)</h2>
					<div />
				</div>
				<div className={styles.wrapper}>
					<Link href="/explorer/desktop" passHref>
						<div className={styles.item}>
							<div>
								<Image
									src="/icons/desktop.ico"
									alt="icon"
									width={50}
									height={50}
								/>
							</div>
							<div>
								<p>Desktop</p>
								<p>This PC</p>
								<BsFillPinAngleFill />
							</div>
						</div>
					</Link>
					<Link href="/explorer/downloads" passHref>
						<div className={styles.item}>
							<div>
								<Image
									src="/icons/downloads.ico"
									alt="icon"
									width={50}
									height={50}
								/>
							</div>
							<div>
								<p>Downloads</p>
								<p>This PC</p>
								<BsFillPinAngleFill />
							</div>
						</div>
					</Link>

					<Link href="/explorer/documents" passHref>
						<div className={styles.item}>
							<div>
								<Image
									src="/icons/documents.ico"
									alt="icon"
									width={50}
									height={50}
								/>
							</div>
							<div>
								<p>Documents</p>
								<p>This PC</p>
								<BsFillPinAngleFill />
							</div>
						</div>
					</Link>

					<Link href="/explorer/documents" passHref>
						<div className={styles.item}>
							<div>
								<Image
									src="/icons/pictures.ico"
									alt="icon"
									width={50}
									height={50}
								/>
							</div>
							<div>
								<p>Pictures</p>
								<p>This PC</p>
								<BsFillPinAngleFill />
							</div>
						</div>
					</Link>

					<Link href="/explorer/videos" passHref>
						<div className={styles.item}>
							<div>
								<Image
									src="/icons/videos.ico"
									alt="icon"
									width={50}
									height={50}
								/>
							</div>
							<div>
								<p>Videos</p>
								<p>This PC</p>
								<BsFillPinAngleFill />
							</div>
						</div>
					</Link>

					<Link href="/explorer/music" passHref>
						<div className={styles.item}>
							<div>
								<Image
									src="/icons/music.ico"
									alt="icon"
									width={50}
									height={50}
								/>
							</div>
							<div>
								<p>Music</p>
								<p>This PC</p>
								<BsFillPinAngleFill />
							</div>
						</div>
					</Link>
				</div>
				<div className={styles.dropdownNav}>
					<RiArrowDropDownLine />
					<h2>Devices and drives (2)</h2>
					<div />
				</div>

				<div className={styles.wrapper}>
					<div className={`${styles.item} ${styles.disk}`}>
						<div>
							<Image
								src="/icons/cdrive.ico"
								alt="icon"
								width={50}
								height={50}
							/>
						</div>
						<div>
							<p>250GB SSD (C:)</p>
							<span className={styles.progressBar} />
							<p>85.8 GB free of 222 GB</p>
						</div>
					</div>
					<div className={`${styles.item} ${styles.disk}`}>
						<div>
							<Image
								src="/icons/drive.ico"
								alt="icon"
								width={50}
								height={50}
							/>
						</div>
						<div>
							<p>1TB SSD (D:)</p>
							<span className={styles.progressBar} />
							<p>393 GB free of 465 GB</p>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<Head>
				<title>kassq - This PC</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/downloads"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					folder="This PC"
					topNav={false}
					icon="computer"
					component={content()}
				/>
				<Icons />
			</div>
		</>
	);
}

export default thisPC;