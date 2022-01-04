import Image from 'next/image';
import { useState } from 'react';
import styles from './FileExplorer.module.scss';
import {
	VscChromeMinimize,
	VscChromeMaximize,
	VscChromeClose,
	VscSearch,
} from 'react-icons/vsc';
import { AiFillCaretRight, AiOutlinePlusCircle } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BsScissors, BsTrash } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import { MdContentPaste } from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiRename, BiSortAlt2 } from 'react-icons/bi';
import { FaRegShareSquare } from 'react-icons/fa';
import { HiArrowLeft, HiArrowRight, HiArrowUp } from 'react-icons/hi';
import { IoMdRefresh } from 'react-icons/io';
import { useRouter } from 'next/router';
import Link from 'next/link';

function FileExplorer(props) {
	const router = useRouter();

	const [maximised, setMaximised] = useState(false);
	const [closed, setClosed] = useState(false);

	const [quickaccess, setQuickaccess] = useState(true);
	const [thisPC, setThisPC] = useState(true);

	const handleMaximize = () => {
		setMaximised(!maximised);
	};

	const handleClose = () => {
		setClosed(!closed);
		setTimeout(() => {
			router.push('/');
		}, 250);
	};

	return (
		<div
			className={styles.container}
			style={
				maximised && !closed
					? {
							height: 'calc(100% - 50px)',
							width: '100%',
							borderRadius: '0',
					  }
					: closed
					? { opacity: '0' }
					: {}
			}
		>
			<section className={styles.main}>
				<nav>
					<section className={styles.top}>
						<div className={styles.topContainer}>
							<Image
								src="/icons/folder.ico"
								alt="ico"
								width={20}
								height={20}
							/>
							<p>{props.folder}</p>
						</div>
						<div className={styles.iconContainer}>
							<div className={styles.icon}>
								<VscChromeMinimize />
							</div>
							<div
								className={styles.icon}
								onClick={handleMaximize}
							>
								<VscChromeMaximize />
							</div>
							<div
								className={styles.iconClose}
								onClick={handleClose}
							>
								<VscChromeClose />
							</div>
						</div>
					</section>
					<section className={styles.manage}>
						<div className={styles.manageNew}>
							<div className={styles.icon}>
								<AiOutlinePlusCircle />
								<p>New</p>
								<RiArrowDropDownLine />
								<div className={styles.manageDropdown}>
									<div>
										<Image
											src="/icons/folder.ico"
											height={20}
											width={20}
											alt="ico"
										/>
										<p>Folder</p>
									</div>
									<div>
										<Image
											src="/icons/notes.ico"
											height={20}
											width={20}
											alt="ico"
										/>
										<p>File</p>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.manageActions}>
							<div className={styles.icon}>
								<BsScissors />
							</div>
							<div className={styles.icon}>
								<MdContentCopy />
							</div>
							<div className={styles.icon}>
								<MdContentPaste />
							</div>
							<div className={styles.icon}>
								<BiRename />
							</div>
							<div className={styles.icon}>
								<FaRegShareSquare />
							</div>
							<div className={styles.icon}>
								<BsTrash />
							</div>
						</div>
						<div className={styles.manageSort}>
							<div className={styles.icon}>
								{' '}
								<BiSortAlt2 />
								<p>Sort</p>
								<RiArrowDropDownLine />
								<div className={styles.manageDropdown}>
									<div>
										<Image
											src="/icons/folder.ico"
											height={20}
											width={20}
											alt="ico"
										/>
										<p>Folder</p>
									</div>
									<div>
										<Image
											src="/icons/folder.ico"
											height={20}
											width={20}
											alt="ico"
										/>
										<p>Folder</p>
									</div>
									<div>
										<Image
											src="/icons/link.ico"
											height={20}
											width={20}
											alt="ico"
										/>
										<p>Shortcut</p>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.manageView}>
							<div className={styles.icon}>
								{' '}
								<GiHamburgerMenu />
								<p>View</p>
								<RiArrowDropDownLine />
								<div className={styles.manageDropdown}>
									<div>
										<Image
											src="/icons/folder.ico"
											height={20}
											width={20}
											alt="ico"
										/>
										<p>Homo</p>
									</div>
									<div>
										<Image
											src="/icons/folder.ico"
											height={20}
											width={20}
											alt="ico"
										/>
										<p>Folder</p>
									</div>
									<div>
										<Image
											src="/icons/link.ico"
											height={20}
											width={20}
											alt="ico"
										/>
										<p>Shortcut</p>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.manageMore}>
							<div className={styles.icon}>
								<FiMoreHorizontal />
								<div className={styles.manageDropdown}>
									<div>
										<Image
											src="/icons/folder.ico"
											height={20}
											width={20}
											alt="ico"
										/>
										<p>Folder</p>
									</div>
									<div>
										<Image
											src="/icons/folder.ico"
											height={20}
											width={20}
											alt="ico"
										/>
										<p>Folder</p>
									</div>
									<div>
										<Image
											src="/icons/link.ico"
											height={20}
											width={20}
											alt="ico"
										/>
										<p>Shortcut</p>
									</div>
								</div>
							</div>
						</div>
					</section>
				</nav>
				<section className={styles.navigate}>
					<div className={styles.arrows}>
						<HiArrowLeft />
						<HiArrowRight />
						<RiArrowDropDownLine />
						<HiArrowUp />
					</div>
					<div className={styles.navigatePath}>
						<div className={styles.left}>
							<Image
								src="/icons/folder.ico"
								alt="ico"
								width={20}
								height={20}
							/>
							<AiFillCaretRight />
							<p>{props.folder}</p>
						</div>
						<div className={styles.right}>
							<div>
								<RiArrowDropDownLine />
							</div>
							<div>
								<IoMdRefresh />
							</div>
						</div>
					</div>
					<div className={styles.navigateSearch}>
						<VscSearch />
						<p>Search: {props.folder}</p>
					</div>
				</section>
				<section className={styles.contentArea}>
					<div className={styles.sidebar}>
						<div className={styles.navigationDropdown}>
							<RiArrowDropDownLine
								onClick={() => setQuickaccess(!quickaccess)}
								style={
									quickaccess
										? {}
										: { transform: 'rotate(-90deg)' }
								}
							/>
							<Image
								src="/icons/quickaccess.ico"
								alt="ico"
								width={16}
								height={16}
							/>
							<p>Quick access</p>
						</div>
						{quickaccess && (
							<>
								<Link href="/file-explorer/desktop" passHref>
									<div className={styles.navigationItem}>
										<Image
											src="/icons/desktop.ico"
											alt="ico"
											width={16}
											height={16}
										/>
										<p>Desktop</p>
									</div>
								</Link>
								<Link href="/file-explorer/downloads" passHref>
									<div className={styles.navigationItem}>
										<Image
											src="/icons/downloads.ico"
											alt="ico"
											width={16}
											height={16}
										/>
										<p>Downloads</p>
									</div>
								</Link>
								<Link href="/file-explorer/documents" passHref>
									<div className={styles.navigationItem}>
										<Image
											src="/icons/documents.ico"
											alt="ico"
											width={16}
											height={16}
										/>
										<p>Documents</p>
									</div>
								</Link>
								<Link href="/file-explorer/pictures" passHref>
									<div className={styles.navigationItem}>
										<Image
											src="/icons/pictures.ico"
											alt="ico"
											width={16}
											height={16}
										/>
										<p>Pictures</p>
									</div>
								</Link>
							</>
						)}
						<div className={styles.navigationDropdown}>
							<RiArrowDropDownLine
								onClick={() => setThisPC(!thisPC)}
								style={
									thisPC
										? {}
										: { transform: 'rotate(-90deg)' }
								}
							/>
							<Image
								src="/icons/computer.ico"
								alt="ico"
								width={16}
								height={16}
							/>
							<p>This PC</p>
						</div>
						{thisPC && (
							<>
								{' '}
								<div className={styles.navigationItem}>
									<Image
										src="/icons/desktop.ico"
										alt="ico"
										width={16}
										height={16}
									/>
									<p>Desktop</p>
								</div>
								<div className={styles.navigationItem}>
									<Image
										src="/icons/downloads.ico"
										alt="ico"
										width={16}
										height={16}
									/>
									<p>Downloads</p>
								</div>
								<div className={styles.navigationItem}>
									<Image
										src="/icons/documents.ico"
										alt="ico"
										width={16}
										height={16}
									/>
									<p>Documents</p>
								</div>
								<div className={styles.navigationItem}>
									<Image
										src="/icons/pictures.ico"
										alt="ico"
										width={16}
										height={16}
									/>
									<p>Pictures</p>
								</div>
								<div className={styles.navigationItem}>
									<Image
										src="/icons/videos.ico"
										alt="ico"
										width={16}
										height={16}
									/>
									<p>Videos</p>
								</div>
								<div className={styles.navigationItem}>
									<Image
										src="/icons/music.ico"
										alt="ico"
										width={16}
										height={16}
									/>
									<p>Music</p>
								</div>
								<div className={styles.navigationItem}>
									<Image
										src="/icons/cdrive.ico"
										alt="ico"
										width={16}
										height={16}
									/>
									<p>250GB SSD</p>
								</div>
								<div className={styles.navigationItem}>
									<Image
										src="/icons/drive.ico"
										alt="ico"
										width={16}
										height={16}
									/>
									<p>1TB SSD</p>
								</div>
							</>
						)}
					</div>
					<div className={styles.content}>
						<div className={styles.topNav}>
							<div className={styles.name}>
								<p>Name</p>
							</div>

							<div className={styles.dateModified}>
								<p>Date modified</p>
							</div>
							<div className={styles.type}>
								<p>Type</p>
							</div>
							<div className={styles.size}>
								<p>Size</p>
							</div>
						</div>
						<div className={styles.child}>{props.component}</div>
					</div>
				</section>
			</section>
		</div>
	);
}

export default FileExplorer;