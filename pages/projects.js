import Image from 'next/image';
import React from 'react';
import Icons from '../components/Icons';
import Resourcemanager from '../components/Resourcemanager';
import styles from '../styles//utils/List.module.scss';

function projects({ data }) {
	const content = () => {
		// Get date string of updated_at as format DD.MM.YYYY HH.MM
		const getDate = (date) => {
			const dateString = new Date(date).toLocaleDateString('en-GB', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
			});
			// remove , from dateString
			return dateString.replace(',', '').replaceAll('/', '.');
		};

		// Function to format kilobytes to megabytes if needed
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
		<div style={{ height: '100%' }}>
			<Resourcemanager
				folder="Projects"
				component={content()}
				topNav={true}
			/>
			<Icons />
		</div>
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
		props: { data }, // will be passed to the page component as props
	};
}

export default projects;
