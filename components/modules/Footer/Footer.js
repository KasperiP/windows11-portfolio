import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Footer.module.css';
import { AiOutlineWifi } from 'react-icons/ai';
import { FiVolume2 } from 'react-icons/fi';
import Link from 'next/link';
import WindowsMenu from './WindowsMenu';
import Error from '../Error/Error';

function Footer() {
	const [winMenu, setWinMenu] = useState(false);
	const [isClosed, setIsClosed] = useState(true);
	const [errors, setError] = useState([]);

	const handleError = (err) => {
		setError([...errors, { error: err, index: errors.length }]);
	};

	const handleWinMenu = () => {
		if (winMenu) {
			setWinMenu(false);
			setTimeout(() => {
				setIsClosed(true);
			}, 500);
		} else {
			setIsClosed(false);

			//TODO: Wtf is this? Must be a better solution for this
			setTimeout(() => {
				setWinMenu(true);
			}, 1);
		}
	};

	const [hourStr, setHourStr] = useState('00:00 PM');
	const [dateStr, setDateStr] = useState('1/1/1970');

	useEffect(() => {
		let isMounted = true;
		setInterval(() => {
			if (typeof navigator !== 'undefined') {
				if (isMounted)
					setHourStr(
						new Date().toLocaleTimeString(navigator.language, {
							hour: '2-digit',
							minute: '2-digit',
						})
					);
				if (isMounted)
					setDateStr(
						new Date().toLocaleDateString(navigator.language)
					);
			}
		}, 1000);
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<>
			{errors &&
				errors.map((err, index) => {
					return (
						<Error
							key={err.index}
							error={err.error}
							errors={errors}
							setError={setError}
							index={err.index}
						/>
					);
				})}
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
					<Link href="/explorer/quick-access" passHref>
						<div className={styles.icon}>
							<Image
								src={'/icons/explorer.ico'}
								width={25}
								height={25}
								alt="logo"
							/>
						</div>
					</Link>
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
					{/* 					<dir className={styles.icon}>
						<IoIosArrowUp />
					</dir> */}
					<dir className={styles.language}>
						<p>ENG</p>
					</dir>
					<div className={styles.icon}>
						<AiOutlineWifi />
						<FiVolume2 />
					</div>
					<div className={styles.dateIcons}>
						<p>{hourStr}</p>
						<p>{dateStr}</p>
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
