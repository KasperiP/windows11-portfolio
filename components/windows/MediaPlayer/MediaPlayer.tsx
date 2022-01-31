import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './MediaPlayer.module.css';

type MediaType = {
	filename: string;
	thumbnail: string;
	secure_url: string;
	format: string;
	public_id: string;
	url: string;
};

type MediaPlayerProps = {
	media: MediaType;
	component: JSX.Element;
	closeMedia: (newMedia: MediaType | null) => void;
};

function MediaPlayer(props: MediaPlayerProps) {
	return (
		<DraggableWindow
			windowName={'mediaPlayer'}
			topTitle={`${props.media.filename.slice(0, -7)}.
            ${props.media.format}`}
			close={props.closeMedia}
		>
			<section className={styles.mediaArea}>{props.component}</section>
			<footer className={styles.footer} />
		</DraggableWindow>
	);
}

export default MediaPlayer;
