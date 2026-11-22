'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useWindowStore } from '../../../store/windows';
import type { HistoryType } from '../../../types';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './Terminal.module.css';

// Stable empty value so the callbacks below don't change every render.
const NO_HISTORY: HistoryType[] = [];

function Terminal() {
	// Keyed on the window session so a relaunched terminal starts empty.
	const session = useWindowStore((s) => s.windows.terminal.session);
	const [saved, setSaved] = useState<{
		session: number;
		items: HistoryType[];
	}>({ session, items: [] });
	const history = saved.session === session ? saved.items : NO_HISTORY;
	const setHistory = useCallback(
		(items: HistoryType[]) => setSaved({ session, items }),
		[session],
	);

	const executeCommand = useCallback(
		(input: string) => {
			const command = input.split(' ')[0];

			switch (command) {
				case 'help':
					setHistory([
						...history,
						{
							input: input,
							response: `help: Display this help message<br/>clear: Clear the terminal screen<br/>ls: List the files in the current directory<br/>echo: Displays text/string that are passed as an argument<br/>whoami: Display the name of the current user`,
						},
					]);
					break;
				case 'clear':
					setHistory([]);
					break;
				case 'whoami':
					setHistory([
						...history,
						{
							input: input,
							response: `kassq`,
						},
					]);
					break;
				case 'ls':
					setHistory([
						...history,

						{
							input: input,
							response: `hello.txt`,
						},
					]);
					break;
				case 'echo':
					setHistory([
						...history,
						{
							input: input,
							response: `${input.replace('echo ', '')}`,
						},
					]);
					break;
				case '':
					setHistory([
						...history,
						{
							input: input,
							response: null,
						},
					]);
					break;
				default:
					setHistory([
						...history,
						{
							input: input,
							response: `bash: ${input}: command not found`,
						},
					]);
					break;
			}
		},
		[history, setHistory],
	);

	useEffect(() => {
		// These listeners are on the whole document, and other windows are
		// open alongside the terminal, so only act while it has focus.
		const isActive = () => {
			const { focused, windows } = useWindowStore.getState();
			return focused === 'terminal' && !windows.terminal.minimized;
		};

		const handleFocus = () => {
			if (!isActive()) return;
			const terminal = document.getElementsByClassName(
				'prompt',
			)[0] as HTMLInputElement;
			terminal?.focus();
			terminal?.scrollIntoView();
		};

		const handleKeyUp = async (e: KeyboardEvent) => {
			const target = e.target as HTMLInputElement;
			if (e.key == 'Enter' && target.classList.contains('prompt')) {
				let input = target.value;

				await executeCommand(input);

				target.value = '';
			}
		};

		document.addEventListener('keydown', handleFocus);
		document.addEventListener('click', handleFocus);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleFocus);
			document.removeEventListener('keyup', handleKeyUp);
			document.removeEventListener('click', handleFocus);
		};
	}, [executeCommand, history]);

	return (
		<DraggableWindow
			windowId="terminal"
			tabbed
			tabMenu
			topTitle={'MINGW64:/c/Users/kassq'}
			topIcon={
				<Image
					src={`/icons/terminal/terminal.png`}
					alt="ico"
					width={20}
					height={20}
				/>
			}
		>
			<div className={`${styles.main} terminal`}>
				{history.map((item, index) => (
					<div
						key={`${item.input}${index}`}
						className={styles.historyItem}
					>
						<p className={styles.terminalTitle}>
							kassq@Kasperi <span>MINGW64</span> <span>~</span>
						</p>
						<p>$ {item.input}</p>
						{item.response?.split('<br/>')?.map((text, index) => (
							<p key={index}>{text}</p>
						))}
					</div>
				))}
				<div className={styles.historyItem}>
					<p className={styles.terminalTitle}>
						kassq@Kasperi <span>MINGW64</span> <span>~</span>
					</p>
					<div className={`${styles.promt}`}>
						<p>$</p>
						<input type="text" className="prompt" />
					</div>
				</div>
			</div>
			<div className={styles.background} />
		</DraggableWindow>
	);
}

export default Terminal;
