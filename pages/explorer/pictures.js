import Head from 'next/head';
import React from 'react';
import Icons from '../../components/icons/Icons';
import FileExplorer from '../../components/fileExplorer/FileExplorer';
import styles from '../../styles/utils/MediaGrid.module.scss';
import Image from 'next/image';

function pictures({ data }) {
	const Content = () => {
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
					component={<Content />}
				/>
				<Icons />
			</div>
		</>
	);
}

export async function getStaticProps() {
	const res = await fetch(
		`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`,
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

	const data =
		res &&
		res.resources.map((image) => {
			return {
				url: image.secure_url.replace(
					'/upload/',
					'/upload/q_auto:low/'
				),
				secure_url: image.secure_url,
				filename: image.public_id.replace('images/', ''),
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

export default pictures;
