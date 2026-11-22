'use client';

import Image from 'next/image';
import FileExplorer from '../../../../components/windows/FileExplorer/FileExplorer';
import { useWindowStore } from '../../../../store/windows';
import styles from '../../../../styles/utils/MediaGrid.module.css';
import type { VideoType } from '../../../../types';

function VideoGrid({ data }: { data: VideoType[] }) {
	const openMedia = useWindowStore((s) => s.openMedia);

	const content = () => {
		return (
			<div className={styles.wrapper}>
				{data.map((video) => (
					<div
						className={styles.mediaItem}
						key={video.filename}
						onClick={() =>
							openMedia({ kind: 'video', item: video })
						}
					>
						<div className={styles.imageWrapper}>
							<Image
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
						<p>
							{video.filename.slice(0, -7)}.{video.format}
						</p>
					</div>
				))}
			</div>
		);
	};

	return (
		<FileExplorer
			folder="Videos"
			topNav={false}
			itemCount={data.length}
			icon="videos"
			// Falsy lets FileExplorer render its own
			// "This folder is empty." message.
			component={data.length ? content() : undefined}
		/>
	);
}

export default VideoGrid;
