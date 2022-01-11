import Head from 'next/head';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';
import styles from '../../styles/utils/MediaGrid.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import MediaPlayer from '../../components/mediaViewer/MediaPlayer';

function Pictures({ data }) {
	const [openImage, setOpenImage] = useState(null);

	const ImageContent = () => {
		return (
			<div className={styles.wrapper}>
				{data.map((image) => (
					<div
						className={styles.mediaItem}
						key={image.filename}
						onClick={() => {
							setOpenImage(image);
						}}
					>
						<div className={styles.imageWrapper}>
							<Image
								src={image.url}
								alt="icon"
								width="100%"
								height="100%"
								layout="responsive"
								objectFit="contain"
							/>
						</div>
						<p>
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
