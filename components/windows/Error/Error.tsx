import Image from 'next/image';
import { useEffect } from 'react';
import Draggable from 'react-draggable';
import { VscChromeClose } from 'react-icons/vsc';
import { ErrorType } from '../../../typings';
import styles from './Error.module.css';

type Props = {
	errors: ErrorType[];
	index: number;
	setError: React.Dispatch<React.SetStateAction<ErrorType[]>>;
	error: string;
};

function Error({ errors, index, setError, error }: Props) {
	const handleClose = async () => {
		const newErrors = await errors.filter((err) => err.index !== index);
		setError(newErrors);
	};

	useEffect(() => {
		let audio = new Audio('/sounds/error.mp3');
		audio.play();
	}, []);

	return (
		<Draggable
			cancel="button"
			positionOffset={
				index && index > 0
					? {
							x: `calc(-50% +  ${index * 20}px)`,
							y: `calc(-50% -  ${index * 20}px)`,
					  }
					: { x: '-50%', y: '-50%' }
			}
		>
			<div className={styles.errorContainer}>
				<div className={styles.errorTop}>
					<div>
						<Image
							src={'/icons/error/error.png'}
							width={20}
							height={20}
							alt="icon"
						/>
						<p>{error}.exe - Application error</p>
					</div>
					<div onClick={handleClose}>
						<VscChromeClose />
					</div>
				</div>
				<div className={styles.errorContent}>
					<div>
						<Image
							src={'/icons/error/error.png'}
							width={40}
							height={40}
							alt="icon"
						/>
					</div>
					<div>
						<p>
							The instruction at 0x0000000088000000 referenced
							memory at 0x0000000088000000. The memory could not
							be written.
							<br />
							<br />
							Click on OK to terminate the program
						</p>
					</div>
				</div>
				<div className={styles.errorBottom}>
					<div>
						<button onClick={handleClose}>OK</button>
					</div>
				</div>
			</div>
		</Draggable>
	);
}

export default Error;
