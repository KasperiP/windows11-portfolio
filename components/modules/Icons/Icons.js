import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Selecto from 'react-selecto';
import folderImg from '../../../public/icons/folder/folder.png';
import linksImg from '../../../public/icons/links/links.png';
import notesImg from '../../../public/icons/notes/notes.png';
import picturesImg from '../../../public/icons/pictures/pictures.png';
import videosImg from '../../../public/icons/videos/videos.png';
import styles from './Icons.module.css';

const ESCAPE_KEYS = ['46', 'Delete'];

const useEventListener = (eventName, handler, element) => {
	if (typeof window !== 'undefined') element = window;
	const savedHandler = useRef();

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const eventListener = (event) => savedHandler.current(event);
		element.addEventListener(eventName, eventListener);
		return () => {
			element.removeEventListener(eventName, eventListener);
		};
	}, [eventName, element]);
};

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

	const handler = ({ key }) => {
		if (ESCAPE_KEYS.includes(String(key))) {
			handleDelete();
		}
	};
	useEventListener('keydown', handler);

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
			></Selecto>
			<div className={`elements ${styles.container}`}>
				<div className={`selecto-area ${styles.wrapper}`} id="selecto1">
					<Link href={'/notepad/about'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src={notesImg}
								placeholder="blur"
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
								src={folderImg}
								placeholder="blue"
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
								src={folderImg}
								placeholder="blue"
								alt="icon"
								width={40}
								height={40}
							></Image>
							<p>Tools</p>
						</div>
					</Link>
					<Link href={'/explorer/links'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src={linksImg}
								placeholder="blur"
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
								src={picturesImg}
								placeholder="blur"
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
								src={videosImg}
								placeholder="blur"
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
								src="/icons/trashcanFull.ico"
								alt="icon"
								width={40}
								height={40}
							></Image>
						) : (
							<Image
								src="/icons/trashcan.ico"
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
