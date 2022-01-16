import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './MediaPlayer.module.css';

function MediaPlayer(props) {
	return (
		<DraggableWindow
			windowName={'mediaPlayer'}
			topTitle={`${props.media.filename.slice(0, -7)}.
            ${props.media.format}`}
			close={props.close}
		>
			<section className={styles.mediaArea}>{props.component}</section>
			<footer className={styles.footer} />
		</DraggableWindow>
	);
}

export default MediaPlayer;
