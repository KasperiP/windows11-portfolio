import Head from 'next/head';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';
import Image from 'next/image';
import styles from '../../styles/utils/List.module.scss';
import Link from 'next/link';

function desktop() {
	const content = () => {
		return (
			<>
				<div className={styles.listItemContainer}>
					<Link href="/notepad/about" passHref>
						<div className={styles.listItem}>
							<div className={styles.listItemName}>
								<Image
									src="/icons/notes.ico"
									alt="icon"
									width={16}
									height={16}
								></Image>
								<p>About me.txt</p>
							</div>
							<p className={styles.listItemDateModified}>
								30.12.2021 04:02
							</p>
							<p className={styles.listItemType}>Text Document</p>
							<p className={styles.listItemSize}>2kt</p>
						</div>
					</Link>
					<Link href="/explorer/projects" passHref>
						<div className={styles.listItem}>
							<div className={styles.listItemName}>
								<Image
									src="/icons/folder.ico"
									alt="icon"
									width={16}
									height={16}
								></Image>
								<p>Projects</p>
							</div>
							<p className={styles.listItemDateModified}>
								30.12.2021 04:02
							</p>
							<p className={styles.listItemType}>Folder</p>
							<p className={styles.listItemSize}>2kt</p>
						</div>
					</Link>
					<Link href="/explorer/tools" passHref>
						<div className={styles.listItem}>
							<div className={styles.listItemName}>
								<Image
									src="/icons/folder.ico"
									alt="icon"
									width={16}
									height={16}
								></Image>
								<p>Tools</p>
							</div>
							<p className={styles.listItemDateModified}>
								30.12.2021 04:02
							</p>
							<p className={styles.listItemType}>Folder</p>
							<p className={styles.listItemSize}>2kt</p>
						</div>
					</Link>
					<Link href="/explorer/links" passHref>
						<div className={styles.listItem}>
							<div className={styles.listItemName}>
								<Image
									src="/icons/folder.ico"
									alt="icon"
									width={16}
									height={16}
								></Image>
								<p>Links</p>
							</div>
							<p className={styles.listItemDateModified}>
								30.12.2021 04:02
							</p>
							<p className={styles.listItemType}>Folder</p>
							<p className={styles.listItemSize}>2kt</p>
						</div>
					</Link>

					<Link href="/explorer/pictures" passHref>
						<div className={styles.listItem}>
							<div className={styles.listItemName}>
								<Image
									src="/icons/pictures.ico"
									alt="icon"
									width={16}
									height={16}
								></Image>
								<p>Pictures</p>
							</div>
							<p className={styles.listItemDateModified}>
								30.12.2021 04:02
							</p>
							<p className={styles.listItemType}>Folder</p>
							<p className={styles.listItemSize}>2kt</p>
						</div>
					</Link>

					<Link href="/explorer/videos" passHref>
						<div className={styles.listItem}>
							<div className={styles.listItemName}>
								<Image
									src="/icons/videos.ico"
									alt="icon"
									width={16}
									height={16}
								></Image>
								<p>Videos</p>
							</div>
							<p className={styles.listItemDateModified}>
								30.12.2021 04:02
							</p>
							<p className={styles.listItemType}>Folder</p>
							<p className={styles.listItemSize}>2kt</p>
						</div>
					</Link>
				</div>
			</>
		);
	};

	return (
		<>
			<Head>
				<title>kassq - Desktop</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/desktop"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					icon="folder"
					folder="Desktop"
					topNav={true}
					component={content()}
				/>
				<Icons />
			</div>
		</>
	);
}

export default desktop;
