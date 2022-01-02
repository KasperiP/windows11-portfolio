import Image from 'next/image';
import React, { useState } from 'react';
import styles from './Footer.module.scss';
import { AiOutlinePoweroff, AiOutlineWifi } from 'react-icons/ai';
import { BsVolumeUp, BsMic } from 'react-icons/bs';
import { IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';
import { VscSearch } from 'react-icons/vsc';

function Footer() {
	const [winMenu, setWinMenu] = useState(false);
	const [isClosed, setIsClosed] = useState(false);

	const handleWinMenu = () => {
		if (winMenu) {
			setWinMenu(false);
			setTimeout(() => {
				setIsClosed(true);
			}, 250);
		} else {
			setIsClosed(false);

			setTimeout(() => {
				setWinMenu(true);
			}, 1);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<section className={styles.iconContainer}>
					<div
						className={styles.icon}
						onClick={() => handleWinMenu()}
					>
						<Image
							src={'/icons/windows.ico'}
							width={25}
							height={25}
							alt="logo"
						/>
					</div>
					<div className={styles.icon}>
						{' '}
						<Image
							src={'/icons/explorer.ico'}
							width={25}
							height={25}
							alt="logo"
						/>
					</div>
					<div className={styles.icon}>
						{' '}
						<Image
							src={'/icons/firefox.ico'}
							width={25}
							height={25}
							alt="logo"
						/>
					</div>
					<div className={styles.icon}>
						{' '}
						<Image
							src={'/icons/spotify.ico'}
							width={25}
							height={25}
							alt="logo"
						/>
					</div>
					<div className={styles.icon}>
						{' '}
						<Image
							src={'/icons/steam.ico'}
							width={25}
							height={25}
							alt="logo"
						/>
					</div>
					<div className={styles.icon}>
						{' '}
						<Image
							src={'/icons/discord.ico'}
							width={25}
							height={25}
							alt="logo"
						/>
					</div>
					<div className={styles.icon}>
						{' '}
						<Image
							src={'/icons/vscode.ico'}
							width={25}
							height={25}
							alt="logo"
						/>
					</div>
					<div className={styles.icon}>
						{' '}
						<Image
							src={'/icons/terminal.ico'}
							width={25}
							height={25}
							alt="logo"
						/>
					</div>
				</section>
				<section className={styles.toolbarContainer}>
					<dir className={styles.icon}>
						<IoIosArrowUp />
					</dir>
					<dir className={styles.microphone}>
						<BsMic />
					</dir>
					<dir className={styles.language}>
						<p>ENG</p>
					</dir>
					<div className={styles.icon}>
						<AiOutlineWifi />
						<BsVolumeUp />
					</div>
					<div className={styles.dateIcons}>
						<p>16.32</p>
						<p>22.12.2021</p>
					</div>
				</section>
			</div>
			<div
				className={styles.overflow}
				style={isClosed ? { display: 'none' } : { display: 'block' }}
			>
				<div
					className={styles.winMenu}
					style={
						winMenu
							? { transform: 'translateY(0)' }
							: {
									transform: 'translateY(200%)',
							  }
					}
				>
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
							<div>
								<div className={styles.winMenuPinnedTop}>
									<h2>Pinned</h2>
									<div>
										<p>All apps</p>
										<IoIosArrowForward />
									</div>
								</div>
								<div className={styles.winMenuPinnedBottom}>
									<div>
										<Image
											src="/icons/fileExplorer.ico"
											alt="img"
											width={40}
											height={40}
										></Image>
										<p>File Explorer</p>
									</div>
									<div>
										<Image
											src="/icons/pictures.ico"
											alt="img"
											width={40}
											height={40}
										></Image>
										<p>Photos</p>
									</div>
									<div>
										<Image
											src="/icons/firefox.ico"
											alt="img"
											width={40}
											height={40}
										></Image>
										<p>Firefox</p>
									</div>
								</div>
							</div>
							<div>
								{' '}
								<div className={styles.winMenuPinnedTop}>
									<h2>Recommended</h2>
									<div>
										<p>More</p>
										<IoIosArrowForward />
									</div>
								</div>
								<div
									className={styles.winMenuRecommendedBottom}
								>
									<div
										className={
											styles.winMenuRecommendedItem
										}
									>
										<div>
											<Image
												src="/icons/fileExplorer.ico"
												alt="img"
												width={40}
												height={40}
											></Image>
											<p>File Explorer</p>
										</div>
										<div>
											<Image
												src="/icons/pictures.ico"
												alt="img"
												width={40}
												height={40}
											></Image>
											<p>Photos</p>
										</div>
									</div>
									<div
										className={
											styles.winMenuRecommendedItem
										}
									>
										<div>
											<Image
												src="/icons/firefox.ico"
												alt="img"
												width={40}
												height={40}
											></Image>
											<p>Firefox</p>
										</div>
										<div>
											<Image
												src="/icons/firefox.ico"
												alt="img"
												width={40}
												height={40}
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
								src="/images/windowsUser.png"
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
			</div>
		</>
	);
}

export default Footer;
