import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Index.module.css';
import Selecto from 'react-selecto';

export default function Home() {
	return (
		<div className={styles.container}>
			<Selecto
				dragContainer={'.elements'}
				selectableTargets={['.selecto-area .cube']}
				hitRate={0}
				selectByClick={true}
				selectFromInside={true}
				ratio={0}
				onSelect={(e) => {
					e.added.forEach((el) => {
						el.classList.add('selected');
					});
					e.removed.forEach((el) => {
						el.classList.remove('selected');
					});
				}}
			></Selecto>
			<div
				className={`elements selecto-area ${styles.container}`}
				id="selecto1"
			>
				<p>Index</p>
			</div>
		</div>
	);
}
