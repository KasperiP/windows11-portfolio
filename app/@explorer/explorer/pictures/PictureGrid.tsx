'use client';

import Image from 'next/image';
import FileExplorer from '../../../../components/windows/FileExplorer/FileExplorer';
import { useWindowStore } from '../../../../store/windows';
import styles from '../../../../styles/utils/MediaGrid.module.css';
import type { PictureType } from '../../../../types';

function PictureGrid({ data }: { data: PictureType[] }) {
	const openMedia = useWindowStore((s) => s.openMedia);

	const content = () => {
		return (
			<div className={styles.wrapper}>
				{data.map((image) => (
					<div
						className={styles.mediaItem}
						key={image.filename}
						onClick={() =>
							openMedia({ kind: 'picture', item: image })
						}
					>
						<div className={styles.imageWrapper}>
							<Image
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
						<p>
							{image.filename.slice(0, -7)}.{image.format}
						</p>
					</div>
				))}
			</div>
		);
	};

	return (
		<FileExplorer
			folder="Pictures"
			topNav={false}
			icon="pictures"
			// Falsy lets FileExplorer render its own
			// "This folder is empty." message.
			component={data.length ? content() : undefined}
		/>
	);
}

export default PictureGrid;
