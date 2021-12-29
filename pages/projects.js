import React from 'react';
import Icons from '../components/Icons';
import Resourcemanager from '../components/Resourcemanager';
import styles from '../styles/Projects.module.scss';

function projects() {
	return (
		<div className={styles.container}>
			<Resourcemanager
				folder="Projects"
				component={<Resourcemanager />}
			/>
			<Icons />
		</div>
	);
}

export default projects;
