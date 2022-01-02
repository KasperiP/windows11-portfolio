import styles from './Layout.module.scss';
import Footer from '../footer/Footer';

function Layout({ children }) {
	return (
		<>
			<div className={styles.container}>{children}</div>
			<Footer />
		</>
	);
}

export default Layout;
