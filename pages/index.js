import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Index.module.css';
import Icons from '../components/Icons';

export default function Home() {
	return (
		<div className={styles.container}>
			<Icons />
		</div>
	);
}
