import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import Icons from '../../components/modules/icons/Icons';
import FileExplorer from '../../components/windows/fileExplorer/FileExplorer';
import styles from '../../styles/utils/List.module.scss';

function tools() {
	const content = () => {
		return (
			<>
				<div className={styles.listItemContainer}>
					<div className={styles.listItem}>
						<div className={styles.listItemName}>
							<Image
								src="/icons/vscode.ico"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>Visual Studio Code - Insiders</p>
						</div>
						<p className={styles.listItemDateModified}>
							30.12.2021 04:02
						</p>
						<p className={styles.listItemType}>Shortcut</p>
						<p className={styles.listItemSize}>2kt</p>
					</div>
					<div className={styles.listItem}>
						<div className={styles.listItemName}>
							<Image
								src="/icons/githubdesktop.ico"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>Github Desktop</p>
						</div>
						<p className={styles.listItemDateModified}>
							30.12.2021 04:02
						</p>
						<p className={styles.listItemType}>Shortcut</p>
						<p className={styles.listItemSize}>2kt</p>
					</div>
					<div className={styles.listItem}>
						<div className={styles.listItemName}>
							<Image
								src="/icons/mongodbcompass.ico"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>MongoDBCompass</p>
						</div>
						<p className={styles.listItemDateModified}>
							30.12.2021 04:02
						</p>
						<p className={styles.listItemType}>Shortcut</p>
						<p className={styles.listItemSize}>2kt</p>
					</div>
					<div className={styles.listItem}>
						<div className={styles.listItemName}>
							<Image
								src="/icons/postman.ico"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>Postman</p>
						</div>
						<p className={styles.listItemDateModified}>
							30.12.2021 04:02
						</p>
						<p className={styles.listItemType}>Shortcut</p>
						<p className={styles.listItemSize}>2kt</p>
					</div>
					<div className={styles.listItem}>
						<div className={styles.listItemName}>
							<Image
								src="/icons/photoshop.ico"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>Photoshop</p>
						</div>
						<p className={styles.listItemDateModified}>
							30.12.2021 04:02
						</p>
						<p className={styles.listItemType}>Shortcut</p>
						<p className={styles.listItemSize}>2kt</p>
					</div>
				</div>
			</>
		);
	};
	return (
		<>
			<Head>
				<title>kassq - Tools</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/tools"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					icon="folder"
					folder="Tools"
					topNav={true}
					component={content()}
				/>
				<Icons />
			</div>
		</>
	);
}

export default tools;
