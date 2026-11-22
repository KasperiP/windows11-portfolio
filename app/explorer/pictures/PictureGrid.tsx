'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { handleWindowPriority } from '../../../components/utils/WindowPriority/WindowPriority';
import FileExplorer from '../../../components/windows/FileExplorer/FileExplorer';
import MediaPlayer from '../../../components/windows/MediaPlayer/MediaPlayer';
import { Context } from '../../../context/ContextProvider';
import styles from '../../../styles/utils/MediaGrid.module.css';
import type { PictureType } from '../../../types';

function PictureGrid({ data }: { data: PictureType[] }) {
	const [openImage, setOpenImage] = useState<PictureType | null>(null);

	const DraggableWindowContext = useContext(Context);
	const [windowState, setWindowState] =
		DraggableWindowContext.windowPriorityState;

	const content = () => {
		return (
			<div className={styles.wrapper}>
				{data.map((image) => (
					<div
						className={`${styles.mediaItem} no_click`}
						key={image.filename}
						onClick={async () => {
							setOpenImage(image);

							const newWindowState = await handleWindowPriority({
								windowName: 'mediaPlayer',
								windowPriority: windowState,
							});
							if (!newWindowState) return;
							setWindowState(newWindowState);
						}}
					>
						<div className={styles.imageWrapper}>
							<Image
								className="no_click"
								src={image.url}
								alt="icon"
								width={100}
								height={100}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'contain',
								}}
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
			{openImage && (
				<MediaPlayer
					media={openImage}
					closeMedia={setOpenImage}
					component={
						<Image
							src={openImage.url}
							alt="icon"
							fill
							sizes="860px"
							style={{ objectFit: 'contain' }}
						/>
					}
				/>
			)}
			<FileExplorer
				folder="Pictures"
				topNav={false}
				icon="pictures"
				// Falsy lets FileExplorer render its own
				// "This folder is empty." message.
				component={data.length ? content() : undefined}
			/>
		</>
	);
}

export default PictureGrid;
