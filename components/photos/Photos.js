import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
	VscChromeClose,
	VscChromeMaximize,
	VscChromeMinimize,
} from 'react-icons/vsc';
import styles from './Photos.module.scss';
function Photos(props) {
	const [maximised, setMaximised] = useState(false);
	const [closed, setClosed] = useState(false);

	const handleMaximize = () => {
		setMaximised(!maximised);
	};

	const handleClose = () => {
		// Setclosed(!closed) then wait for animation to finish then redirect
		setClosed(!closed);
		setTimeout(() => {
			props.setOpenImage(null);
		}, 250);
	};

	return (
		<div
			className={styles.container}
			style={
				maximised && !closed
					? {
							height: 'calc(100% - 50px)',
							width: '100%',
							borderRadius: '0',
					  }
					: closed
					? { opacity: '0' }
					: {}
			}
		>
			<section className={styles.main}>
				<nav>
					<section className={styles.top}>
						<div className={styles.topContainer}>
							<p>
								{props.image.filename.slice(0, -7)}.
								{props.image.format}
							</p>
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
								onClick={handleClose}
							>
								<VscChromeClose />
							</div>
						</div>
					</section>
				</nav>
				<section className={styles.imageArea}>
					<Image
						src={props.image.url}
						alt="icon"
						width="100%"
						height="100%"
						layout="fill"
						objectFit="contain"
					/>
				</section>
				<footer
					className={styles.footer}
					style={maximised ? { borderRadius: '0' } : {}}
				></footer>
			</section>
		</div>
	);
}

export default Photos;
