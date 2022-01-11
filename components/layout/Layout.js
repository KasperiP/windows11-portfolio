import styles from './Layout.module.css';
import Footer from '../modules/footer/Footer';

function Layout({ children }) {
	return (
		<>
			<div className={`${styles.container} layout`}>{children}</div>
			<Footer />
		</>
	);
}

export default Layout;
