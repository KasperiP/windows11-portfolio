import styles from '../styles/Layout.module.css';
import Footer from '../components/footer/Footer';

function Layout({ children }) {
	return (
		<>
			<div className={styles.container}>{children}</div>
			<Footer />
		</>
	);
}

export default Layout;
