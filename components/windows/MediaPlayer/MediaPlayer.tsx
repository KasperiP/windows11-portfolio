import { MediaType } from '../../../typings';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './MediaPlayer.module.css';

type Props = {
	media: MediaType;
	component: JSX.Element;
	closeMedia: (newMedia: MediaType | null) => void;
};

function MediaPlayer(props: Props) {
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
