import Head from 'next/head';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';
import getImages from '../../lib/images';
import styles from '../../styles/utils/MediaGrid.module.scss';
import Image from 'next/image';

function Pictures({ data }) {
	const content = () => {
		return (
			<>
				<div className={styles.wrapper}>
					{data &&
						data.map((image) => (
							<div
								className={styles.mediaItem}
								key={image.filename}
								onClick={() =>
									window.open(
										image.secure_url,
										'_blank',
										'noopener,noreferrer'
									)
								}
							>
								<div className={styles.imageWrapper}>
									<Image
										src={image.secure_url.replace(
											'/upload/',
											'/upload/f_auto/'
										)}
										alt="icon"
										width="100%"
										height="100%"
										layout="responsive"
										objectFit="contain"
									></Image>
								</div>
								<p>
									{image.filename.slice(0, -7)}.{image.format}
								</p>
							</div>
						))}
				</div>
			</>
		);
	};

	return (
		<>
			<Head>
				<title>kassq - Pictures</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/pictures"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					folder="Pictures"
					topNav={false}
					icon="pictures"
					component={content()}
				/>
				<Icons />
			</div>
		</>
	);
}

export async function getStaticProps() {
	const data = await getImages();
	return {
		props: { data },
	};
}

export default Pictures;
