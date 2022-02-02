import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { VscSearch } from 'react-icons/vsc';
import styles from './WindowsMenu.module.css';
import { motion } from 'framer-motion';

type Props = {
	winMenu: boolean;
	handleWinMenu: () => void;
};

const slideVerticalAnimation = {
	open: {
		y: 0,
		transition: {
			duration: 0.3,
		},
		display: 'block',
	},
	close: {
		y: 550,
		transition: {
			duration: 0.3,
		},
		transitionEnd: {
			display: 'none',
		},
	},
};

function WindowsMenu({ winMenu, handleWinMenu }: Props) {
	const node = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (null === node.current) return;
			if (
				node.current.contains(target) ||
				target.className.includes('windowsIcon')
			)
				return;
			if (winMenu) {
				handleWinMenu();
			}
		};

		if (winMenu) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleWinMenu, winMenu]);

	return (
		<motion.div
			initial="close"
			animate={winMenu ? 'open' : 'close'}
			variants={slideVerticalAnimation}
			className={styles.overflow}
		>
			<div className={styles.winMenu} ref={node}>
				<div className={styles.winMenuContainer}>
					<div className={styles.winMenuSearch}>
						<div className={styles.inputWithIcon}>
							<VscSearch />
							<input
								type="text"
								placeholder="Type here to search"
							/>
						</div>
					</div>
					<div className={styles.winMenuPinned}>
						<div className={styles.winMenuPinnedContainer}>
							<div className={styles.winMenuPinnedTop}>
								<h2>Pinned</h2>
								<div>
									<p>All apps</p>
									<IoIosArrowForward />
								</div>
							</div>
							<div className={styles.winMenuPinnedBottom}>
								<Link href="/explorer/quick-access" passHref>
									<div onClick={() => handleWinMenu()}>
										<Image
											src="/icons/explorer/explorer.png"
											alt="img"
											width={30}
											height={30}
										></Image>
										<p>File Explorer</p>
									</div>
								</Link>
								<Link href="/explorer/pictures" passHref>
									<div onClick={() => handleWinMenu()}>
										<Image
											src="/icons/pictures/pictures.png"
											alt="img"
											width={30}
											height={30}
										></Image>
										<p>Photos</p>
									</div>
								</Link>
								<Link href="/explorer/videos" passHref>
									<div onClick={() => handleWinMenu()}>
										<Image
											src="/icons/videos/videos.png"
											alt="img"
											width={30}
											height={30}
										></Image>
										<p>Videos</p>
									</div>
								</Link>
							</div>
						</div>
						<div className={styles.winMenuPinnedContainer}>
							{' '}
							<div className={styles.winMenuPinnedTop}>
								<h2>Recommended</h2>
								<div>
									<p>More</p>
									<IoIosArrowForward />
								</div>
							</div>
							<div className={styles.winMenuRecommendedBottom}>
								<div className={styles.winMenuRecommendedItem}>
									<Link
										href="/explorer/quick-access"
										passHref
									>
										<div onClick={() => handleWinMenu()}>
											<Image
												src="/icons/explorer/explorer.png"
												alt="img"
												width={30}
												height={30}
											></Image>
											<p>File Explorer</p>
										</div>
									</Link>
									<Link href="/explorer/pictures" passHref>
										<div onClick={() => handleWinMenu()}>
											<Image
												src="/icons/pictures/pictures.png"
												alt="img"
												width={30}
												height={30}
											></Image>
											<p>Photos</p>
										</div>
									</Link>
								</div>
								<div className={styles.winMenuRecommendedItem}>
									<Link href="/explorer/videos" passHref>
										<div onClick={() => handleWinMenu()}>
											<Image
												src="/icons/videos/videos.png"
												alt="img"
												width={30}
												height={30}
											></Image>
											<p>Videos</p>
										</div>
									</Link>
									<div>
										<Image
											src="/icons/firefox/firefox.png"
											alt="img"
											width={30}
											height={30}
										></Image>
										<p>Firefox</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.winMenuFooter}>
					<div>
						<Image
							src="/images/windowsUser.webp"
							alt=""
							width={30}
							height={30}
						></Image>
						<p>kassq</p>
					</div>
					<div>
						<AiOutlinePoweroff />
					</div>
				</div>
				<div className={styles.winMenuBg} />
			</div>
		</motion.div>
	);
}

export default WindowsMenu;
