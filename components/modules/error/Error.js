import Image from 'next/image';
import { useEffect } from 'react';
import Draggable from 'react-draggable';
import { VscChromeClose } from 'react-icons/vsc';
import styles from './Error.module.css';

function Error(props) {
	const handleClose = async () => {
		// Take props.errors array and remove props.error from it
		const newErrors = await props.errors.filter(
			(err) => err.index !== props.index
		);
		props.setError(newErrors);
	};

	useEffect(() => {
		let audio = new Audio('/sounds/error.mp3');
		audio.play();
	}, []);

	return (
		//TODO: Figure out better solution for this instead of using fixed values.
		<Draggable
			cancel="button"
			positionOffset={
				props.index && props.index > 0
					? {
							x: `calc(-50% +  ${props.index * 20}px)`,
							y: `calc(-50% -  ${props.index * 20}px)`,
					  }
					: { x: '-50%', y: '-50%' }
			}
		>
			<div className={styles.errorContainer}>
				<div className={styles.errorTop}>
					<div>
						<Image
							src={'/icons/error.ico'}
							width={20}
							height={20}
							alt="icon"
						/>
						<p>{props.error}.exe - Application error</p>
					</div>
					<div onClick={handleClose}>
						<VscChromeClose />
					</div>
				</div>
				<div className={styles.errorContent}>
					<div>
						<Image
							src={'/icons/error.ico'}
							width={40}
							height={40}
							alt="icon"
						/>
					</div>
					<div>
						<p>
							The insturction at 0x0000000088000000 referenced
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