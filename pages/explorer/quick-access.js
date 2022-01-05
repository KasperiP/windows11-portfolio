import Head from 'next/head';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BsFillPinAngleFill } from 'react-icons/bs';
import Image from 'next/image';
import styles from '../../styles/utils/GridList.module.scss';
import listItemStyles from '../../styles/utils/List.module.scss';
import Link from 'next/link';

function quickAccess() {
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
					<h2>Recent files (1)</h2>
					<div />
				</div>

				<div
					className={listItemStyles.listItemContainer}
					style={{ margin: '0 20px 0 20px' }}
				>
					<Link href="/notepad/about" passHref>
						<div className={listItemStyles.listItem}>
							<div className={listItemStyles.listItemName}>
								<Image
									src="/icons/notes.ico"
									alt="icon"
									width={16}
									height={16}
								></Image>
								<p>About me</p>
							</div>
							<p
								className={listItemStyles.listItemType}
								style={{ width: '100%' }}
							>
								This PC/Desktop/About me.txt
							</p>
						</div>
					</Link>
				</div>
			</>
		);
	};

	return (
		<>
			<Head>
				<title>kassq - Quick access</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/downloads"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					folder="Quick access"
					topNav={false}
					icon="quickaccess"
					component={content()}
				/>
				<Icons />
			</div>
		</>
	);
}

export default quickAccess;
