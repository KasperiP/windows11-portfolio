import Head from 'next/head';
import { useState } from 'react';
import Icons from '../../components/modules/icons/Icons';
import FileExplorer from '../../components/windows/fileExplorer/FileExplorer';
import styles from '../../styles/utils/MediaGrid.module.css';
import Image from 'next/image';
import MediaPlayer from '../../components/windows/mediaPlayer/MediaPlayer';

function Videos({ data }) {
	const [openVideo, setOpenVideo] = useState(null);
	const VideoContent = () => {
		return (
			<div className={styles.wrapper}>
				{data.map((video) => (
					<div
						className={styles.mediaItem}
						key={video.filename}
						onClick={() => {
							setOpenVideo(video);
						}}
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
				{openVideo && (
					<MediaPlayer
						close={setOpenVideo}
						media={openVideo}
						component={
							<video
								controls
								src={openVideo.secure_url}
								style={{ width: '100%', height: '100%' }}
							/>
						}
					/>
				)}
				<FileExplorer
					folder="Videos"
					topNav={false}
					icon="videos"
					component={<VideoContent />}
				/>
				<Icons />
			</div>
		</>
	);
}

export async function getStaticProps() {
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
			filename:
				video.public_id.replace('videos/', '').length > 25
					? video.public_id.replace('videos/', '').slice(0, 25)
					: video.public_id.replace('videos/', ''),
			secure_url: video.secure_url,
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
