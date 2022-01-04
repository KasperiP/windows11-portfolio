import styles from './Icons.module.scss';
import Image from 'next/image';
import Selecto from 'react-selecto';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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
					<Link href={'/about'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src="/icons/notes.ico"
								alt="icon"
								width={40}
								height={40}
							></Image>
							<p>About me</p>
						</div>
					</Link>
					<Link href={'/projects'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src="/icons/folder.ico"
								alt="icon"
								width={40}
								height={40}
							></Image>
							<p>Projects</p>
						</div>
					</Link>

					<Link href={'/tools'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src="/icons/folder.ico"
								alt="icon"
								width={40}
								height={40}
							></Image>
							<p>Tools</p>
						</div>
					</Link>
					<Link href={'/links'} passHref>
						<div className={`${styles.item} selectoItem`}>
							<Image
								src="/icons/links.ico"
								alt="icon"
								width={40}
								height={40}
							></Image>
							<p>Links</p>
						</div>
					</Link>
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
