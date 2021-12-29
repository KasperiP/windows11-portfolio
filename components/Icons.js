import React from 'react';
import styles from '../styles/Icons.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Selecto from 'react-selecto';
function Icons() {
	const router = useRouter();
	return (
		<>
			<Selecto
				dragContainer={'.elements'}
				selectableTargets={[`.selecto-area .selectoItem`]}
				hitRate={0}
				selectByClick={true}
				selectFromInside={true}
				ratio={0}
				onSelect={(e) => {
					e.added.forEach((el) => {
						el.classList.add(`${styles.selected}`);
					});
					e.removed.forEach((el) => {
						el.classList.remove(`${styles.selected}`);
					});
				}}
			></Selecto>
			<div className={`elements ${styles.container}`}>
				<div className={`selecto-area ${styles.wrapper}`} id="selecto1">
					<div
						className={`${styles.item} selectoItem`}
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

					<div className={`${styles.item} selectoItem`}>
						<Image
							src="/icons/folder.ico"
							alt="icon"
							width={40}
							height={40}
						></Image>
						<p>Tools</p>
					</div>
					<div className={`${styles.item} selectoItem`}>
						<Image
							src="/icons/pictures.ico"
							alt="icon"
							width={40}
							height={40}
						></Image>
						<p>Images</p>
					</div>
					<div className={`${styles.item} selectoItem`}>
						<Image
							src="/icons/videos.ico"
							alt="icon"
							width={40}
							height={40}
						></Image>
						<p>Videos</p>
					</div>
					<div className={`${styles.item} selectoItem`}>
						<Image
							src="/icons/contacts.ico"
							alt="icon"
							width={40}
							height={40}
						></Image>
						<p>Links</p>
					</div>
					<div className={`${styles.item} selectoItem`}>
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
		</>
	);
}

export default Icons;
