import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './Notepad.module.css';
function Notepad({ initialText }: { initialText: string }) {
	const [text, setText] = useState(initialText);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	};

	return (
		<DraggableWindow
			windowName="notepad"
			topTitle="Notepad"
			topIcon={
				<Image
					src={`/icons/notepad/notepad.png`}
					alt="ico"
					width={20}
					height={20}
				/>
			}
		>
			<div className={styles.top}>
				<section className={styles.navButtons}>
					<div className={styles.navButton}>
						<p>File</p>
						<div className={styles.navButtonsDropdown}>
							<div className={styles.navButtonsItem}>
								<p>New</p>
								<p>Ctrl + N</p>
							</div>

							<div className={styles.navButtonsItem}>
								<p>New window</p>
								<p>Ctrl + Shift + N</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Open</p>
								<p>Ctrl + O</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Save</p>
								<p>Ctrl + S</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Save as</p>
								<p>Ctrl + Shift + S</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Page settings</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Print</p>
								<p>Ctrl + P</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Exit</p>
							</div>
						</div>
					</div>
					<div className={styles.navButton}>
						<p>Edit</p>
						<div className={styles.navButtonsDropdown}>
							<div className={styles.navButtonsItem}>
								<p>Undo</p>
								<p>Ctrl + Z</p>
							</div>

							<div className={styles.navButtonsItem}>
								<p>Redo</p>
								<p>Ctrl + X</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Copy</p>
								<p>Ctrl + C</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Paste</p>
								<p>Ctrl + V</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Delete</p>
								<p>Del</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Find</p>
								<p>Ctrl + F</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Find next</p>
								<p>F3</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Find previous</p>
								<p>Shift + F3</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Replace</p>
								<p>Ctrl + H</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Move</p>
								<p>Ctrl + G</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Select all</p>
								<p>Ctrl + A</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Time/date</p>
								<p>F5</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Font</p>
							</div>
						</div>
					</div>
					<div className={styles.navButton}>
						<p>View</p>
						<div className={styles.navButtonsDropdown}>
							<div className={styles.navButtonsItem}>
								<p>Zoom</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Space row</p>
							</div>
							<div className={styles.navButtonsItem}>
								<p>Line break</p>
							</div>
						</div>
					</div>
				</section>
			</div>

			<section className={styles.textarea}>
				<textarea
					name="notepad"
					id=""
					spellCheck={false}
					value={text}
					onChange={handleChange}
				/>
			</section>

			<footer className={styles.footer}>
				<div>
					<p>Ln 1, Col 1</p>
				</div>
				<div>
					<p>100%</p>
					<p>Windows (CRLF)</p>
					<p>UTF-8</p>
				</div>
			</footer>
		</DraggableWindow>
	);
}

export default Notepad;
