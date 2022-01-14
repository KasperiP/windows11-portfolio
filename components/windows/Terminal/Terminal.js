import { useEffect, useState } from 'react';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './Terminal.module.css';

function Terminal() {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const handleFocus = (e) => {
			const terminal = document.getElementsByClassName('prompt')[0];
			terminal?.focus();
			terminal?.scrollIntoView();
		};

		const handleKeyUp = (e) => {
			if (e.keyCode == 13) {
				let input = e.target.value; // get current input val

				if (input === 'clear') {
					setHistory([]);
					e.target.value = '';
					return;
				} else if (input !== '') {
					setHistory([
						...history,
						{
							input: input,
							response: `bash: ${input}: command not found`,
						},
					]); // log input to terminal
					e.target.value = ''; // clear input
					console.log('joo');
					return;
				}

				setHistory([
					...history,
					{
						input: input,
						response: null,
					},
				]); // log input to terminal
				e.target.value = ''; // clear input
				console.log(history);
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
	}, [history]);

	return (
		<DraggableWindow
			windowName={'terminal'}
			topTitle={'MINGW64:/c/Users/kassq'}
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
