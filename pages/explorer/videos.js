import Head from 'next/head';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';
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

export async function getServerSideProps() {
	console.log(process.env.CLOUDINARY_API_KEY);
	console.log(process.env.CLOUDINARY_API_SECRET);
	console.log(process.env.CLOUDINARY_CLOUD_NAME);

	const res = await fetch(
		`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/video`,
		{
			headers: {
				Authorization: `Basic ${Buffer.from(
					process.env.CLOUDINARY_API_KEY +
						':' +
						process.env.CLOUDINARY_API_SECRET
				).toString('base64')}}`,
			},
		}
	).then((res) => res.json());

	const data = res.resources.map((video) => {
		return {
			thumbnail: (
				video.secure_url.split('.').slice(0, -1).join('.') + '.webp'
			).replace('/upload/', '/upload/q_auto:low/'),
			filename: video.public_id.replace('videos/', ''),
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
