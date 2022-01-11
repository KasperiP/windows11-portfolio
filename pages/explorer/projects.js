import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';
import styles from '../../styles/utils/List.module.css';

function projects({ data }) {
	const content = () => {
		const getDate = (date) => {
			const dateString = new Date(date).toLocaleDateString('en-GB', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
			});
			return dateString.replace(',', '');
		};

		const formatSize = (size) => {
			if (size > 1024) {
				return `${(size / 1024).toFixed(2)} MB`;
			}
			return `${size} KB`;
		};

		return (
			<>
				<div className={styles.listItemContainer}>
					{data.map((project) => (
						<div
							className={styles.listItem}
							key={project.id}
							onClick={() =>
								window.open(
									project.html_url,
									'_blank',
									'noopener,noreferrer'
								)
							}
						>
							<div className={styles.listItemName}>
								<Image
									src="/icons/github.ico"
									alt="icon"
									width={16}
									height={16}
								></Image>
								<p>{project.name}</p>
							</div>
							<p className={styles.listItemDateModified}>
								{getDate(project.updated_at)}
							</p>
							<p className={styles.listItemType}>Shortcut</p>
							<p className={styles.listItemSize}>
								{formatSize(project.size)}
							</p>
						</div>
					))}
				</div>
			</>
		);
	};
	return (
		<>
			<Head>
				<title>kassq - Projects</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/projects"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					icon="folder"
					folder="Projects"
					component={content()}
					topNav={true}
				/>
				<Icons />
			</div>
		</>
	);
}

export async function getStaticProps() {
	const res = await fetch(`https://api.github.com/users/KasperiP/repos`);
	const data = (await res.json()).filter(
		(project) =>
			project.fork === false && project.full_name !== 'KasperiP/KasperiP'
	);

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: { data },
	};
}

export default projects;
