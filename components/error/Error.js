import Image from 'next/image';
import { useEffect } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import styles from './Error.module.scss';

function Error(props) {
	const handleClose = () => {
		// Take props.errors array and remove props.error from it
		const newErrors = props.errors.filter(
			(err) => err.index !== props.index
		);
		props.setError(newErrors);
	};

	useEffect(() => {
		let audio = new Audio('/sounds/error.mp3');
		audio.play();
	}, []);

	return (
		<>
			<div
				className={styles.errorContainer}
				style={
					props.index && props.index > 0
						? {
								transform: `translate(calc(-50% +  ${
									props.index * 25
								}px), calc(-50% - ${props.index * 25 + 25}px))`,
						  }
						: {}
				}
			>
				{' '}
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
		</>
	);
}

export default Error;
