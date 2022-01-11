import Image from 'next/image';
import { useState } from 'react';
import {
	VscChromeClose,
	VscChromeMaximize,
	VscChromeMinimize,
} from 'react-icons/vsc';
import DraggableWindow from '../../utils/draggableWindow/DraggableWindow';
import styles from './MediaPlayer.module.css';
function MediaPlayer(props) {
	const [maximised, setMaximised] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const handleMaximize = () => {
		setMaximised(!maximised);
	};

	const handleClose = () => {
		// Setclosed(!closed) then wait for animation to finish then redirect
		setIsClosing(!isClosing);
		setTimeout(() => {
			props.close(null);
		}, 250);
	};

	return (
		<DraggableWindow
			isClosing={isClosing}
			keepPosition={false}
			windowName={'mediaPlayer'}
		>
			<section className={styles.main}>
				<nav>
					<section className={`${styles.top} draggable`}>
						<div className={styles.topContainer}>
							<p>
								{props.media.filename.slice(0, -7)}.
								{props.media.format}
							</p>
						</div>
						<div
							className={`${styles.iconContainer} not_draggable`}
						>
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
				</nav>
				<section className={styles.mediaArea}>
					{props.component}
				</section>
				<footer
					className={styles.footer}
					style={maximised ? { borderRadius: '0' } : {}}
				></footer>
			</section>
		</DraggableWindow>
	);
}

export default MediaPlayer;
