import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from './Footer.module.scss';
import { AiOutlinePoweroff, AiOutlineWifi } from 'react-icons/ai';
import { BsVolumeUp, BsMic } from 'react-icons/bs';
import { IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';
import { VscSearch } from 'react-icons/vsc';
import WindowsMenu from './WindowsMenu';

function Footer() {
	const [winMenu, setWinMenu] = useState(false);
	const [isClosed, setIsClosed] = useState(true);

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
						className={`${styles.icon} windowsIcon`}
						onClick={() => handleWinMenu()}
					>
						<Image
							src={'/icons/windows.ico'}
							width={25}
							height={25}
							alt="logo"
							className="windowsIcon"
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
			<WindowsMenu
				isClosed={isClosed}
				setIsClosed={setIsClosed}
				winMenu={winMenu}
				setWinMenu={setWinMenu}
				handleWinMenu={handleWinMenu}
			/>
		</>
	);
}

export default Footer;
