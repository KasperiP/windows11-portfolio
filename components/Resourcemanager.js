import Image from 'next/image';
import React from 'react';
import styles from '../styles/Resourcemanager.module.css';
import {
	VscChromeMinimize,
	VscChromeMaximize,
	VscChromeClose,
	VscSearch,
} from 'react-icons/vsc';
import { AiFillCaretRight, AiOutlinePlusCircle } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BsScissors } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import { MdContentPaste } from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiRename, BiSortAlt2 } from 'react-icons/bi';
import { FaRegShareSquare } from 'react-icons/fa';
import { HiArrowLeft, HiArrowRight, HiArrowUp } from 'react-icons/hi';
import { GrRefresh } from 'react-icons/gr';
import { IoMdRefresh } from 'react-icons/io';

function Resourcemanager() {
	return (
		<div className={styles.container}>
			<section className={styles.resourcemanager}>
				<nav className={styles.nav}>
					<div className={styles.top}>
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
							<VscChromeMinimize />
							<VscChromeMaximize />
							<VscChromeClose />
						</div>
					</div>
					<div className={styles.manage}>
						<div className={styles.manageNew}>
							<AiOutlinePlusCircle />
							<p>New</p>
							<RiArrowDropDownLine />
						</div>
						<div className={styles.manageActions}>
							<BsScissors />
							<MdContentCopy />
							<MdContentPaste />
							<BiRename />
							<FaRegShareSquare />
						</div>
						<div className={styles.manageSort}>
							<BiSortAlt2 />
							<p>Sort</p>
							<RiArrowDropDownLine />
						</div>
						<div className={styles.manageView}>
							<GiHamburgerMenu />
							<p>View</p>
							<RiArrowDropDownLine />
						</div>
						<div className={styles.manageMore}>
							<FiMoreHorizontal />
						</div>
					</div>
					<div className={styles.navigate}>
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
					</div>
				</nav>
			</section>
		</div>
	);
}

export default Resourcemanager;
