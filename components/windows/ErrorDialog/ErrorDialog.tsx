'use client';

import { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import Dialog, { DIALOG_DRAG_HANDLE } from '../Dialog/Dialog';
import styles from './ErrorDialog.module.css';

type Props = {
	/** App name, shown as "<app>.exe - Application Error". */
	app: string;
	/** Position among open error dialogs; each one cascades down-right. */
	offset: number;
	onClose: () => void;
};

/** The "Application Error" box the decorative taskbar apps open. */
function ErrorDialog({ app, offset, onClose }: Props) {
	// react-draggable needs an explicit nodeRef; without one it falls back to
	// ReactDOM.findDOMNode, which is gone in React 19.
	const nodeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const audio = new Audio('/sounds/error.mp3');
		// play() rejects with AbortError when the cleanup pauses it before
		// playback starts (Strict Mode's remount, or closing the popup fast),
		// and with NotAllowedError if autoplay is blocked. The sound is
		// decorative, so ignore both.
		audio.play().catch(() => {});
		return () => {
			audio.pause();
		};
	}, []);

	// Draggable owns the wrapper's transform; the Dialog animates its own, so
	// the two never fight over the same element.
	return (
		<Draggable
			nodeRef={nodeRef}
			handle={`.${DIALOG_DRAG_HANDLE}`}
			cancel="button"
			positionOffset={{
				x: `calc(-50% + ${offset * 20}px)`,
				y: `calc(-50% + ${offset * 20}px)`,
			}}
		>
			<div ref={nodeRef} className={styles.position}>
				<Dialog
					title={`${app}.exe - Application Error`}
					icon="/icons/error/error.png"
					onClose={onClose}
					buttons={[{ label: 'OK', onClick: onClose, primary: true }]}
				>
					<p>
						The instruction at 0x0000000088000000 referenced memory
						at 0x0000000088000000. The memory could not be written.
					</p>
					<p>Click on OK to terminate the program.</p>
				</Dialog>
			</div>
		</Draggable>
	);
}

export default ErrorDialog;
