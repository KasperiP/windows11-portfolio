import Head from 'next/head';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';
import cloudinary from 'cloudinary';
import styles from '../../styles/utils/MediaGrid.module.scss';
import Image from 'next/image';

function Videos({ data }) {
	const Content = () => {
		return (
			<>
				<div className={styles.wrapper}>
					{data.map((video) => (
						<div
							className={styles.mediaItem}
							key={video.filename}
							onClick={() =>
								window.open(
									video.url,
									'_blank',
									'noopener,noreferrer'
								)
							}
						>
							<div className={styles.imageWrapper}>
								<Image
									src={video.thumbnail}
									alt="icon"
									width="100%"
									height="100%"
									layout="responsive"
									objectFit="contain"
								/>
							</div>
							<p>
								{video.filename.slice(0, -7)}.{video.format}
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
				<title>kassq - Videos</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/videos"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					folder="Videos"
					topNav={false}
					icon="videos"
					component={<Content />}
				/>
				<Icons />
			</div>
		</>
	);
}

export async function getStaticProps() {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
		secure: true,
	});

	const res = await cloudinary.v2.search
		.expression(
			'folder:videos/*' // add your folder
		)
		.sort_by('public_id', 'desc')
		.max_results(30)
		.execute();

	const data = res.resources.map((video) => {
		return {
			thumbnail: (
				video.secure_url.split('.').slice(0, -1).join('.') + '.webp'
			).replace('/upload/', '/upload/q_auto:low/'),
			filename: video.filename,
			url: video.secure_url,
			format: video.format,
		};
	});

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			data,
		},
	};
}

export default Videos;
