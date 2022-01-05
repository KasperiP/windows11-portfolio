import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';
import styles from '../../styles/utils/List.module.scss';

function links() {
	const content = () => {
		return (
			<>
				<div className={styles.listItemContainer}>
					<Link href={'https://twitter.com/kpohtinen'} passHref>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/icons/twitter.ico"
										alt="icon"
										width={16}
										height={16}
									></Image>
									<p>Twitter</p>
								</div>
								<p className={styles.listItemDateModified}>
									30.12.2021 04:02
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
					<Link
						href={'https://discord.com/users/217639084888162304'}
						passHref
					>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/icons/discord.ico"
										alt="icon"
										width={16}
										height={16}
									></Image>
									<p>Discord</p>
								</div>
								<p className={styles.listItemDateModified}>
									30.12.2021 04:02
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
					<Link
						href={
							'https://fi.linkedin.com/in/kasperi-pohtinen-41273a204'
						}
						passHref
					>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/icons/linkedin.ico"
										alt="icon"
										width={16}
										height={16}
									></Image>
									<p>Linkedin</p>
								</div>
								<p className={styles.listItemDateModified}>
									30.12.2021 04:02
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
					<Link href={'https://github.com/KasperiP/'} passHref>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/icons/github.ico"
										alt="icon"
										width={16}
										height={16}
									></Image>
									<p>Github</p>
								</div>
								<p className={styles.listItemDateModified}>
									30.12.2021 04:02
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
				</div>
			</>
		);
	};
	return (
		<>
			<Head>
				<title>kassq - links</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/file-explorer/links"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					icon="folder"
					folder="Links"
					topNav={true}
					component={content()}
				/>
				<Icons />
			</div>
		</>
	);
}

export default links;
