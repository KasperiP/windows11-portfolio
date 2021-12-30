import React from 'react';
import Icons from '../components/Icons';
import Resourcemanager from '../components/Resourcemanager';
import styles from '../styles/Projects.module.scss';

function projects({ data }) {
	const content = () => {
		// Remove forks from data
		const filteredData = data.filter(
			(project) =>
				project.fork === false &&
				project.full_name !== 'KasperiP/KasperiP'
		);
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

		return (
			<>
				<div>
					{filteredData.map((project) => (
						<div className={styles.project} key={project.id}>
							<p>{project.name}</p>
							<p>{getDate(project.updated_at)}</p>
							<p>Link</p>
						</div>
					))}
				</div>
			</>
		);
	};
	return (
		<div className={styles.container}>
			<Resourcemanager folder="Projects" component={content()} />
			<Icons />
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch(`https://api.github.com/users/KasperiP/repos`);
	const data = await res.json();

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
