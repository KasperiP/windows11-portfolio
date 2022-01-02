import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from './Footer.module.scss';
import { AiOutlinePoweroff, AiOutlineWifi } from 'react-icons/ai';
import { BsVolumeUp, BsMic } from 'react-icons/bs';
import { IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';
import { VscSearch } from 'react-icons/vsc';
import WindowsMenu from './WindowsMenu';
import Error from '../error/Error';

function Footer() {
	const [winMenu, setWinMenu] = useState(false);
	const [isClosed, setIsClosed] = useState(true);
	const [error, setError] = useState('');

	const handleError = (error) => {
		document.body.style.cursor = 'wait';
		setTimeout(() => {
			document.body.style.cursor = 'default';
			setError(error);
		}, 1000);
	};

	const handleWinMenu = () => {
		if (winMenu) {
			setWinMenu(false);
			setTimeout(() => {
				setIsClosed(true);
			}, 250);
		} else {
			setIsClosed(false);

			//TODO: Wtf is this? Must be a better solution for this
			setTimeout(() => {
				setWinMenu(true);
			}, 1);
		}
	};

	return (
		<>
			{error && error !== '' && (
				<Error error={error} setError={setError} />
			)}
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
					<div
						className={styles.icon}
						onClick={() => handleError('Firefox')}
					>
						{' '}
						<Image
							src={'/icons/firefox.ico'}
							width={25}
							height={25}
							alt="logo"
						/>
					</div>
					<div
						className={styles.icon}
						onClick={() => handleError('Spotify')}
					>
						{' '}
						<Image
							src={'/icons/spotify.ico'}
							width={25}
							height={25}
							alt="logo"
						/>
					</div>
					<div
						className={styles.icon}
						onClick={() => handleError('Steam')}
					>
						{' '}
						<Image
							src={'/icons/steam.ico'}
							width={25}
							height={25}
							alt="logo"
						/>
					</div>
					<div
						className={styles.icon}
						onClick={() => handleError('Discord')}
					>
						{' '}
						<Image
							src={'/icons/discord.ico'}
							width={25}
							height={25}
							alt="logo"
						/>
					</div>
					<div
						className={styles.icon}
						onClick={() =>
							handleError('Visual Studio Code - Insiders')
						}
					>
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
				winMenu={winMenu}
				handleWinMenu={handleWinMenu}
			/>
		</>
	);
}

export default Footer;
