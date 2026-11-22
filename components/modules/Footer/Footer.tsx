'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineWifi } from 'react-icons/ai';
import { FiVolume2 } from 'react-icons/fi';
import { useWindowActions } from '../../../hooks/useWindowManager';
import { WINDOWS, type WindowId } from '../../../lib/windows';
import { useWindowStore } from '../../../store/windows';
import ErrorDialog from '../../windows/ErrorDialog/ErrorDialog';
import { mediaIcon } from '../../windows/MediaPlayer/MediaPlayer';
import styles from './Footer.module.css';
import TaskbarItem from './TaskbarItem';
import WindowsMenu from './WindowsMenu';

type PinnedApp = { name: string; icon: string; windowId?: WindowId };

// Apps without a windowId are decorative and open the "not found" error.
const PINNED: PinnedApp[] = [
	{
		name: WINDOWS.fileExplorer.name,
		icon: WINDOWS.fileExplorer.icon,
		windowId: 'fileExplorer',
	},
	{ name: 'Chrome', icon: '/icons/chrome/chrome.png' },
	{ name: 'Spotify', icon: '/icons/spotify/spotify.png' },
	{ name: 'Steam', icon: '/icons/steam/steam.png' },
	{ name: 'Discord', icon: '/icons/discord/discord.png' },
	{
		name: 'Visual Studio Code',
		icon: '/icons/visualstudiocode/visualstudiocode.png',
	},
	{
		name: WINDOWS.terminal.name,
		icon: WINDOWS.terminal.icon,
		windowId: 'terminal',
	},
];

function Footer() {
	const [winMenu, setWinMenu] = useState(false);
	// Open "Application Error" dialogs, one per click on a decorative app.
	const [errors, setErrors] = useState<{ id: number; app: string }[]>([]);
	const nextErrorId = useRef(0);
	const { taskbarClick } = useWindowActions();

	// Running apps that aren't pinned get a button after the pinned ones,
	// in the order they were opened.
	const taskbarOrder = useWindowStore((s) => s.taskbarOrder);
	const mediaKind = useWindowStore((s) => s.media?.kind);
	const unpinned = taskbarOrder.filter((id) => !WINDOWS[id].pinned);

	const handleError = (app: string) => {
		const id = nextErrorId.current++;
		setErrors((prev) => [...prev, { id, app }]);
	};

	const handleWinMenu = () => {
		setWinMenu(!winMenu);
	};

	const [hourStr, setHourStr] = useState('00:00 PM');
	const [dateStr, setDateStr] = useState('1/1/1970');

	useEffect(() => {
		const interval = setInterval(() => {
			setHourStr(
				new Date().toLocaleTimeString(navigator.language, {
					hour: '2-digit',
					minute: '2-digit',
				}),
			);
			setDateStr(new Date().toLocaleDateString(navigator.language));
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<>
			{errors.map((err, i) => (
				<ErrorDialog
					key={err.id}
					app={err.app}
					offset={i}
					onClose={() =>
						setErrors((prev) => prev.filter((e) => e.id !== err.id))
					}
				/>
			))}
			<div className={styles.container}>
				<section className={styles.iconContainer}>
					<div
						className={`${styles.icon} windowsIcon`}
						onClick={() => handleWinMenu()}
					>
						<Image
							src={'/icons/windows/windows.png'}
							width={25}
							height={25}
							alt="logo"
							className="windowsIcon"
						/>
					</div>
					{PINNED.map((app) => (
						<TaskbarItem
							key={app.name}
							name={app.name}
							icon={app.icon}
							windowId={app.windowId}
							onClick={() =>
								app.windowId
									? taskbarClick(app.windowId)
									: handleError(app.name)
							}
						/>
					))}
					{unpinned.map((id) => (
						<TaskbarItem
							key={id}
							name={WINDOWS[id].name}
							icon={
								id === 'mediaPlayer' && mediaKind
									? mediaIcon(mediaKind)
									: WINDOWS[id].icon
							}
							windowId={id}
							onClick={() => taskbarClick(id)}
						/>
					))}
				</section>
				<section className={styles.toolbarContainer}>
					<div className={styles.language}>
						<p>ENG</p>
					</div>
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
			<WindowsMenu winMenu={winMenu} handleWinMenu={handleWinMenu} />
		</>
	);
}

export default Footer;
