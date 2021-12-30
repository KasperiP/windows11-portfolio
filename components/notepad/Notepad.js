import Image from 'next/image';
import { useState } from 'react';
import {
	VscChromeClose,
	VscChromeMaximize,
	VscChromeMinimize,
} from 'react-icons/vsc';
import styles from './Notepad.module.scss';
function Notepad(props) {
	const [maximised, setMaximised] = useState(false);
	const [closed, setClosed] = useState(false);

	// Dropdowns
	const [quickaccess, setQuickaccess] = useState(true);
	const [thisPC, setThisPC] = useState(true);

	const handleMaximize = () => {
		setMaximised(!maximised);
	};

	const handleClose = () => {
		// Setclosed(!closed) then wait for animation to finish then redirect
		setClosed(!closed);
		setTimeout(() => {
			router.push('/');
		}, 250);
	};

	return (
		<div
			className={styles.container}
			style={
				maximised && !closed
					? {
							height: '100%',
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
							<Image
								src="/icons/notepad.ico"
								alt="ico"
								width={20}
								height={20}
							/>
							<p>{props.name}</p>
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
			</section>
		</div>
	);
}

export default Notepad;
