import Footer from '../../modules/Footer/Footer';
import styles from './Layout.module.css';

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className={`${styles.container} layout`}>{children}</div>
			<Footer />
		</>
	);
}

export default Layout;
