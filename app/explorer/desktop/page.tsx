import Image from 'next/image';
import Link from 'next/link';
import Icons from '../../../components/modules/Icons/Icons';
import FileExplorer from '../../../components/windows/FileExplorer/FileExplorer';
import styles from '../../../styles/utils/List.module.css';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
	title: 'Desktop',
	description:
		"My desktop is beautiful until I start some project and then my desktop is full of temporary files and folders. I don't want to see them.",
	path: '/explorer/desktop',
});

function Desktop() {
	const content = () => {
		return (
			<>
				<div className={styles.listItemContainer}>
					<Link
						href="/notepad/about"
						className={styles.listItem}
						draggable={false}
					>
						<div className={styles.listItemName}>
							<Image
								src="/icons/notes/notes.png"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>About me.txt</p>
						</div>
						<p className={styles.listItemDateModified}>
							30.12.2021 04:02
						</p>
						<p className={styles.listItemType}>Text Document</p>
						<p className={styles.listItemSize}>2kt</p>
					</Link>
					<Link
						href="/explorer/projects"
						className={styles.listItem}
						draggable={false}
					>
						<div className={styles.listItemName}>
							<Image
								src="/icons/folder/folder.png"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>Projects</p>
						</div>
						<p className={styles.listItemDateModified}>
							30.12.2021 04:02
						</p>
						<p className={styles.listItemType}>Folder</p>
						<p className={styles.listItemSize}>2kt</p>
					</Link>
					<Link
						href="/explorer/tools"
						className={styles.listItem}
						draggable={false}
					>
						<div className={styles.listItemName}>
							<Image
								src="/icons/folder/folder.png"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>Tools</p>
						</div>
						<p className={styles.listItemDateModified}>
							30.12.2021 04:02
						</p>
						<p className={styles.listItemType}>Folder</p>
						<p className={styles.listItemSize}>2kt</p>
					</Link>
					<Link
						href="/explorer/podcasts"
						className={styles.listItem}
						draggable={false}
					>
						<div className={styles.listItemName}>
							<Image
								src="/icons/folder/folder.png"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>Podcasts I listen to</p>
						</div>
						<p className={styles.listItemDateModified}>
							30.01.2021 04:02
						</p>
						<p className={styles.listItemType}>Folder</p>
						<p className={styles.listItemSize}>2kt</p>
					</Link>
					<Link
						href="/explorer/links"
						className={styles.listItem}
						draggable={false}
					>
						<div className={styles.listItemName}>
							<Image
								src="/icons/folder/folder.png"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>Links</p>
						</div>
						<p className={styles.listItemDateModified}>
							30.12.2021 04:02
						</p>
						<p className={styles.listItemType}>Folder</p>
						<p className={styles.listItemSize}>2kt</p>
					</Link>

					<Link
						href="/explorer/pictures"
						className={styles.listItem}
						draggable={false}
					>
						<div className={styles.listItemName}>
							<Image
								src="/icons/pictures/pictures.png"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>Pictures</p>
						</div>
						<p className={styles.listItemDateModified}>
							30.12.2021 04:02
						</p>
						<p className={styles.listItemType}>Folder</p>
						<p className={styles.listItemSize}>2kt</p>
					</Link>

					<Link
						href="/explorer/videos"
						className={styles.listItem}
						draggable={false}
					>
						<div className={styles.listItemName}>
							<Image
								src="/icons/videos/videos.png"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>Videos</p>
						</div>
						<p className={styles.listItemDateModified}>
							30.12.2021 04:02
						</p>
						<p className={styles.listItemType}>Folder</p>
						<p className={styles.listItemSize}>2kt</p>
					</Link>
				</div>
			</>
		);
	};

	return (
		<div style={{ height: '100%' }}>
			<FileExplorer
				icon="desktop"
				folder="Desktop"
				topNav={true}
				component={content()}
			/>
			<Icons />
		</div>
	);
}

export default Desktop;
