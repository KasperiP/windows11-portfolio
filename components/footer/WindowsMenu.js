import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { VscSearch } from 'react-icons/vsc';
import styles from './Footer.module.scss';

function WindowsMenu({ isClosed, winMenu, handleWinMenu }) {
	const node = useRef();

	const handleClickOutside = (e) => {
		if (
			node.current.contains(e.target) ||
			e.srcElement.className.includes('windowsIcon')
		)
			return;
		// outside click
		if (winMenu) {
			handleWinMenu();
		}
	};

	useEffect(() => {
		if (winMenu) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [winMenu]);

	return (
		<div
			className={styles.overflow}
			style={isClosed ? { display: 'none' } : { display: 'block' }}
		>
			<div
				ref={node}
				className={styles.winMenu}
				style={
					winMenu
						? { transform: 'translateY(0)' }
						: {
								transform: 'translateY(200%)',
						  }
				}
			>
				<div className={styles.winMenuContainer}>
					<div className={styles.winMenuSearch}>
						<div className={styles.inputWithIcon}>
							<VscSearch />
							<input
								type="text"
								placeholder="Type here to search"
							/>
						</div>
					</div>
					<div className={styles.winMenuPinned}>
						<div>
							<div className={styles.winMenuPinnedTop}>
								<h2>Pinned</h2>
								<div>
									<p>All apps</p>
									<IoIosArrowForward />
								</div>
							</div>
							<div className={styles.winMenuPinnedBottom}>
								<div>
									<Image
										src="/icons/fileExplorer.ico"
										alt="img"
										width={40}
										height={40}
									></Image>
									<p>File Explorer</p>
								</div>
								<div>
									<Image
										src="/icons/pictures.ico"
										alt="img"
										width={40}
										height={40}
									></Image>
									<p>Photos</p>
								</div>
								<div>
									<Image
										src="/icons/firefox.ico"
										alt="img"
										width={40}
										height={40}
									></Image>
									<p>Firefox</p>
								</div>
							</div>
						</div>
						<div>
							{' '}
							<div className={styles.winMenuPinnedTop}>
								<h2>Recommended</h2>
								<div>
									<p>More</p>
									<IoIosArrowForward />
								</div>
							</div>
							<div className={styles.winMenuRecommendedBottom}>
								<div className={styles.winMenuRecommendedItem}>
									<div>
										<Image
											src="/icons/fileExplorer.ico"
											alt="img"
											width={40}
											height={40}
										></Image>
										<p>File Explorer</p>
									</div>
									<div>
										<Image
											src="/icons/pictures.ico"
											alt="img"
											width={40}
											height={40}
										></Image>
										<p>Photos</p>
									</div>
								</div>
								<div className={styles.winMenuRecommendedItem}>
									<div>
										<Image
											src="/icons/firefox.ico"
											alt="img"
											width={40}
											height={40}
										></Image>
										<p>Firefox</p>
									</div>
									<div>
										<Image
											src="/icons/firefox.ico"
											alt="img"
											width={40}
											height={40}
										></Image>
										<p>Firefox</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.winMenuFooter}>
					<div>
						<Image
							src="/images/windowsUser.png"
							alt=""
							width={30}
							height={30}
						></Image>
						<p>kassq</p>
					</div>
					<div>
						<AiOutlinePoweroff />
					</div>
				</div>
				<div className={styles.winMenuBg} />
			</div>
		</div>
	);
}

export default WindowsMenu;
