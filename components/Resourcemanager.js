import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../styles/Resourcemanager.module.scss';
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
import { GrRefresh } from 'react-icons/gr';
import { IoMdRefresh } from 'react-icons/io';
import { useRouter } from 'next/router';

function Resourcemanager() {
	const router = useRouter();

	const [maximised, setMaximised] = useState(false);
	const handleMaximize = () => {
		setMaximised(!maximised);
	};

	return (
		<div className={styles.container}>
			<section
				className={styles.main}
				style={
					maximised
						? { height: '100%', width: '100%', borderRadius: '0' }
						: {}
				}
			>
				<nav>
					<section className={styles.top}>
						<div className={styles.topContainer}>
							<Image
								src="/icons/folder.ico"
								alt="ico"
								width={20}
								height={20}
							/>
							<p>Projects</p>
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
								onClick={() => router.push('/')}
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
							</div>
						</div>
						<div className={styles.manageView}>
							<div className={styles.icon}>
								{' '}
								<GiHamburgerMenu />
								<p>View</p>
								<RiArrowDropDownLine />
							</div>
						</div>
						<div className={styles.manageMore}>
							<div className={styles.icon}>
								<FiMoreHorizontal />
							</div>
						</div>
					</section>
					<section className={styles.navigate}>
						<div className={styles.arrows}>
							<HiArrowLeft />
							<HiArrowRight />
							<RiArrowDropDownLine />
							<HiArrowUp />
						</div>
						<div className={styles.navigatePath}>
							<div className={styles.navigatePathLeft}>
								{' '}
								<Image
									src="/icons/folder.ico"
									alt="ico"
									width={20}
									height={20}
								/>
								<AiFillCaretRight />
								<p>projects</p>
							</div>
							<div>
								<RiArrowDropDownLine />
								<IoMdRefresh />
							</div>
						</div>
						<div className={styles.navigateSearch}>
							<VscSearch />
							<input type="text" placeholder="Search: projects" />
						</div>
					</section>
				</nav>
			</section>
		</div>
	);
}

export default Resourcemanager;
