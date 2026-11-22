'use client';

import Image from 'next/image';
import { useWindowStore } from '../../../store/windows';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './MediaPlayer.module.css';

export const mediaIcon = (kind: 'picture' | 'video') =>
	kind === 'picture'
		? '/icons/pictures/pictures.png'
		: '/icons/videos/videos.png';

/**
 * Rendered once by the root Layout from the store, so it stays open (and
 * keeps its own taskbar entry) while File Explorer navigates or closes.
 */
function MediaPlayer() {
	const media = useWindowStore((s) => s.media);
	if (!media) return null;

	const { item } = media;

	return (
		<DraggableWindow
			windowId="mediaPlayer"
			topTitle={`${item.filename.slice(0, -7)}.${item.format}`}
			topIcon={
				<Image
					src={mediaIcon(media.kind)}
					alt="ico"
					width={20}
					height={20}
				/>
			}
		>
			<section className={styles.mediaArea}>
				{media.kind === 'picture' ? (
					<Image
						src={media.item.url}
						alt="icon"
						fill
						sizes="860px"
						style={{ objectFit: 'contain' }}
					/>
				) : (
					<video
						// Remount when another video is opened in the same window.
						key={item.secure_url}
						controls
						autoPlay
						src={item.secure_url}
						style={{ width: '100%', height: '100%' }}
					/>
				)}
			</section>
			<footer className={styles.footer} />
		</DraggableWindow>
	);
}

export default MediaPlayer;
