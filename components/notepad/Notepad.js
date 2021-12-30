import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
	VscChromeClose,
	VscChromeMaximize,
	VscChromeMinimize,
} from 'react-icons/vsc';
import styles from './Notepad.module.scss';
function Notepad(props) {
	const router = useRouter();

	const [maximised, setMaximised] = useState(false);
	const [closed, setClosed] = useState(false);

	const [text, setText] = useState(props.text);

	// onChange text handler
	const handleChange = (e) => {
		setText(e.target.value);
	};

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
							height: 'calc(100% - 50px)',
							width: '100%',
							borderRadius: '0',
							left: '0',
							top: '0',
							transform: 'translateX(0)',
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
					<section className={styles.navButtons}>
						<p>File</p>
						<p>Edit</p>
						<p>View</p>
					</section>
				</nav>
				<section className={styles.textarea}>
					<textarea
						name="notepad"
						id=""
						spellCheck={false}
						value={text}
						onChange={handleChange}
					/>
				</section>
				<footer
					className={styles.footer}
					style={maximised ? { borderRadius: '0' } : {}}
				>
					<div>
						<p>Ln 1, Col 1</p>
					</div>
					<div>
						<p>100%</p>
						<p>Windows (CRLF)</p>
						<p>UTF-8</p>
					</div>
				</footer>
			</section>
		</div>
	);
}

export default Notepad;
