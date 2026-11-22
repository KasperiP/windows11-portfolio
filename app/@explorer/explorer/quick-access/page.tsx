import Image from 'next/image';
import Link from 'next/link';
import { BsFillPinAngleFill } from 'react-icons/bs';
import { RiArrowDropDownLine } from 'react-icons/ri';
import FileExplorer from '../../../../components/windows/FileExplorer/FileExplorer';
import styles from '../../../../styles/utils/GridList.module.css';
import listItemStyles from '../../../../styles/utils/List.module.css';
import { pageMetadata } from '../../../../lib/metadata';

export const metadata = pageMetadata({
	title: 'Home',
	description:
		"Want to go fast? Here's a quick access to my files and folders.",
	path: '/explorer/quick-access',
});

function QuickAccess() {
	const content = () => {
		return (
			<>
				<div className={styles.dropdownNav}>
					<RiArrowDropDownLine />
					<h2>Folders (6)</h2>
					<div />
				</div>
				<div className={styles.wrapper}>
					<Link
						href="/explorer/desktop"
						className={styles.item}
						draggable={false}
					>
						<div>
							<Image
								src="/icons/desktop/desktop.png"
								alt="icon"
								width={50}
								height={50}
							/>
						</div>
						<div>
							<p>Desktop</p>
							<p>This PC</p>
							<BsFillPinAngleFill />
						</div>
					</Link>
					<Link
						href="/explorer/downloads"
						className={styles.item}
						draggable={false}
					>
						<div>
							<Image
								src="/icons/downloads/downloads.png"
								alt="icon"
								width={50}
								height={50}
							/>
						</div>
						<div>
							<p>Downloads</p>
							<p>This PC</p>
							<BsFillPinAngleFill />
						</div>
					</Link>

					<Link
						href="/explorer/documents"
						className={styles.item}
						draggable={false}
					>
						<div>
							<Image
								src="/icons/documents/documents.png"
								alt="icon"
								width={50}
								height={50}
							/>
						</div>
						<div>
							<p>Documents</p>
							<p>This PC</p>
							<BsFillPinAngleFill />
						</div>
					</Link>

					<Link
						href="/explorer/pictures"
						className={styles.item}
						draggable={false}
					>
						<div>
							<Image
								src="/icons/pictures/pictures.png"
								alt="icon"
								width={50}
								height={50}
							/>
						</div>
						<div>
							<p>Pictures</p>
							<p>This PC</p>
							<BsFillPinAngleFill />
						</div>
					</Link>

					<Link
						href="/explorer/videos"
						className={styles.item}
						draggable={false}
					>
						<div>
							<Image
								src="/icons/videos/videos.png"
								alt="icon"
								width={50}
								height={50}
							/>
						</div>
						<div>
							<p>Videos</p>
							<p>This PC</p>
							<BsFillPinAngleFill />
						</div>
					</Link>

					<Link
						href="/explorer/music"
						className={styles.item}
						draggable={false}
					>
						<div>
							<Image
								src="/icons/music/music.png"
								alt="icon"
								width={50}
								height={50}
							/>
						</div>
						<div>
							<p>Music</p>
							<p>This PC</p>
							<BsFillPinAngleFill />
						</div>
					</Link>
				</div>
				<div className={styles.dropdownNav}>
					<RiArrowDropDownLine />
					<h2>Recent files (1)</h2>
					<div />
				</div>

				<div
					className={listItemStyles.listItemContainer}
					style={{ margin: '0 20px 0 20px' }}
				>
					<Link
						href="/notepad/about"
						className={listItemStyles.listItem}
						draggable={false}
					>
						<div className={listItemStyles.listItemName}>
							<Image
								src="/icons/notes/notes.png"
								alt="icon"
								width={16}
								height={16}
							></Image>
							<p>About me</p>
						</div>
						<p
							className={listItemStyles.listItemType}
							style={{ width: '100%' }}
						>
							This PC/Desktop/About me.txt
						</p>
					</Link>
				</div>
			</>
		);
	};

	return (
		<FileExplorer
			folder="Home"
			topNav={false}
			itemCount={7}
			icon="quickaccess"
			component={content()}
		/>
	);
}

export default QuickAccess;
