'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { handleWindowPriority } from '../../../components/utils/WindowPriority/WindowPriority';
import FileExplorer from '../../../components/windows/FileExplorer/FileExplorer';
import MediaPlayer from '../../../components/windows/MediaPlayer/MediaPlayer';
import { Context } from '../../../context/ContextProvider';
import styles from '../../../styles/utils/MediaGrid.module.css';
import type { VideoType } from '../../../types';

function VideoGrid({ data }: { data: VideoType[] }) {
	const [openVideo, setOpenVideo] = useState<VideoType | null>(null);

	const DraggableWindowContext = useContext(Context);
	const [windowState, setWindowState] =
		DraggableWindowContext.windowPriorityState;

	const content = () => {
		return (
			<div className={styles.wrapper}>
				{data.map((video) => (
					<div
						className={`${styles.mediaItem} no_click`}
						key={video.filename}
						onClick={async () => {
							setOpenVideo(video);

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
								src={video.thumbnail}
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
							{video.filename.slice(0, -7)}.{video.format}
						</p>
					</div>
				))}
			</div>
		);
	};

	return (
		<>
			{openVideo && (
				<MediaPlayer
					closeMedia={setOpenVideo}
					media={openVideo}
					component={
						<video
							controls
							autoPlay
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
				// Falsy lets FileExplorer render its own
				// "This folder is empty." message.
				component={data.length ? content() : undefined}
			/>
		</>
	);
}

export default VideoGrid;
