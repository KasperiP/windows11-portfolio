import React from 'react';
import styles from '../styles/Icons.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
function Icons() {
	const router = useRouter();
	return (
		<div
			className={`elements selecto-area ${styles.container}`}
			id="selecto1"
		>
			<div className={styles.wrapper}>
				<div
					className={styles.item}
					onClick={() => router.push('/projects')}
				>
					<Image
						src="/icons/folder.ico"
						alt="icon"
						width={40}
						height={40}
					></Image>
					<p>Projects</p>
				</div>

				<div className={styles.item}>
					<Image
						src="/icons/folder.ico"
						alt="icon"
						width={40}
						height={40}
					></Image>
					<p>Tools</p>
				</div>
				<div className={styles.item}>
					<Image
						src="/icons/pictures.ico"
						alt="icon"
						width={40}
						height={40}
					></Image>
					<p>Images</p>
				</div>
				<div className={styles.item}>
					<Image
						src="/icons/videos.ico"
						alt="icon"
						width={40}
						height={40}
					></Image>
					<p>Videos</p>
				</div>
				<div className={styles.item}>
					<Image
						src="/icons/contacts.ico"
						alt="icon"
						width={40}
						height={40}
					></Image>
					<p>Links</p>
				</div>
				<div className={styles.item}>
					<Image
						src="/icons/trashcan.ico"
						alt="icon"
						width={40}
						height={40}
					></Image>
					<p>Recycle Bin</p>
				</div>
			</div>
		</div>
	);
}

export default Icons;
