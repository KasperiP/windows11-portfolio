import Image from 'next/image';
import React from 'react';
import styles from '../styles/Footer.module.css';
import { AiOutlineWifi } from 'react-icons/ai';
import { BsVolumeUp, BsMic } from 'react-icons/bs';
import { IoIosArrowUp } from 'react-icons/io';

function Footer() {
	return (
		<div className={styles.container}>
			<section className={styles.iconContainer}>
				<div className={styles.icon}>
					<Image
						src={'/images/windows.png'}
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
					<p>FIN</p>
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
	);
}

export default Footer;
