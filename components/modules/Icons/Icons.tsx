import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Selecto from 'react-selecto';
import styles from './Icons.module.css';

const ESCAPE_KEYS = ['46', 'Delete'];

function Icons() {
	const [deleted, setDeleted] = useState(false);

	const handleDelete = () => {
		const selected = document.querySelectorAll(`.selected`);
		selected.forEach((element) => {
			if (!element.classList.contains('recycleBin')) {
				element.classList.add(`${styles.deleted}`);
				element.classList.add('deleted');
				setDeleted(true);
			}
		});
	};

	useEffect(() => {
		const eventListener = (e: KeyboardEvent) => {
			if (ESCAPE_KEYS.includes(String(e.key))) {
				handleDelete();
			}
		};
		document.addEventListener('keydown', eventListener);
		return () => {
			document.removeEventListener('keydown', eventListener);
		};
	}, []);

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
						el.classList.add(`selected`);
					});
					e.removed.forEach((el) => {
						el.classList.remove(`${styles.selected}`);
						el.classList.remove(`selected`);
					});
				}}
			/>
			<div className={`elements ${styles.container}`}>
				<div className={`selecto-area ${styles.wrapper}`} id="selecto1">
					<Link href={'/notepad/about'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src="/icons/notes/notes.png"
								alt="icon"
								width={40}
								height={40}
							></Image>
							<p>About me</p>
						</div>
					</Link>
					<Link href={'/explorer/projects'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src="/icons/folder/folder.png"
								alt="icon"
								width={40}
								height={40}
							></Image>
							<p>Projects</p>
						</div>
					</Link>
					<Link href={'/explorer/tools'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src="/icons/folder/folder.png"
								alt="icon"
								width={40}
								height={40}
							></Image>
							<p>Tools</p>
						</div>
					</Link>
					<Link href={'/explorer/podcasts'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src="/icons/folder/folder.png"
								alt="icon"
								width={40}
								height={40}
							></Image>
							<p>Podcasts I listen to</p>
						</div>
					</Link>
					<Link href={'/explorer/links'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src="/icons/links/links.png"
								alt="icon"
								width={40}
								height={40}
							></Image>
							<p>Links</p>
						</div>
					</Link>
					<Link href={'/explorer/pictures'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src="/icons/pictures/pictures.png"
								alt="icon"
								width={40}
								height={40}
							></Image>
							<p>Pictures</p>
						</div>
					</Link>
					<Link href={'/explorer/videos'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src="/icons/videos/videos.png"
								alt="icon"
								width={40}
								height={40}
								quality={100}
							></Image>
							<p>Videos</p>
						</div>
					</Link>

					<div className={`${styles.item} selectoItem recycleBin`}>
						{deleted ? (
							<Image
								src="/icons/trash/trash_full.png"
								alt="icon"
								width={40}
								height={40}
							></Image>
						) : (
							<Image
								src="/icons/trash/trash_empty.png"
								alt="icon"
								width={40}
								height={40}
							></Image>
						)}
						<p>Recycle Bin</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Icons;
