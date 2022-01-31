import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './Terminal.module.css';

type HistoryItem = {
	input: string;
	response: string | null;
};

function Terminal() {
	const [history, setHistory] = useState<HistoryItem[] | []>([]);

	const executeCommand = useCallback(
		(input) => {
			const command = input.split(' ')[0];

			switch (command) {
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
		[history]
	);

	useEffect(() => {
		const handleFocus = () => {
			const terminal = document.getElementsByClassName(
				'prompt'
			)[0] as HTMLInputElement;
			terminal?.focus();
			terminal?.scrollIntoView();
		};

		const handleKeyUp = async (e: KeyboardEvent) => {
			if (e.key == 'Enter') {
				const target = e.target as HTMLInputElement;
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
			windowName={'terminal'}
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
						{item.response && <p>{item.response}</p>}
					</div>
				))}
				<div className={styles.historyItem}>
					<p className={styles.terminalTitle}>
						kassq@Kasperi <span>MINGW64</span> <span>~</span>
					</p>
					<div className={`${styles.promt}`}>
						<p>$</p>
						<input type="text" className="prompt" autoFocus />
					</div>
				</div>
			</div>
			<div className={styles.background} />
		</DraggableWindow>
	);
}

export default Terminal;
