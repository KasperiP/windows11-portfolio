import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';
import MediaPlayer from '../../components/windows/MediaPlayer/MediaPlayer';
import styles from '../../styles/utils/MediaGrid.module.css';

function Pictures({ data }) {
	const [openImage, setOpenImage] = useState(null);

	const ImageContent = () => {
		return (
			<div className={styles.wrapper}>
				{data.map((image) => (
					<div
						className={`${styles.mediaItem} no_click`}
						key={image.filename}
						onClick={() => {
							setOpenImage(image);
						}}
					>
						<div className={styles.imageWrapper}>
							<Image
								className="no_click"
								src={image.url}
								alt="icon"
								width="100%"
								height="100%"
								layout="responsive"
								objectFit="contain"
							/>
						</div>
						<p className="no_click">
							{image.filename.slice(0, -7)}.{image.format}
						</p>
					</div>
				))}
			</div>
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
				{openImage && (
					<MediaPlayer
						media={openImage}
						close={setOpenImage}
						component={
							<Image
								src={openImage.url}
								alt="icon"
								layout="fill"
								objectFit="contain"
							/>
						}
					/>
				)}
				<FileExplorer
					folder="Pictures"
					topNav={false}
					icon="pictures"
					component={<ImageContent />}
				/>
				<Icons />
			</div>
		</>
	);
}

export async function getStaticProps() {
	const res = await fetch(
		`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image?max_results=100`,
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

	const data = res.resources.map((image) => {
		return {
			url: image.secure_url.replace('/upload/', '/upload/q_auto:low/'),
			secure_url: image.secure_url,
			filename:
				image.public_id.replace('images/', '').length > 25
					? image.public_id.replace('images/', '').slice(0, 25)
					: image.public_id.replace('images/', ''),
			format: image.format,
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

export default Pictures;
