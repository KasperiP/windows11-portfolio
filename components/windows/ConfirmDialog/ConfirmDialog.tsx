'use client';

import { createPortal } from 'react-dom';
import Dialog from '../Dialog/Dialog';
import styles from './ConfirmDialog.module.css';

type Props = {
	title: string;
	message: string;
	icon: string;
	onConfirm: () => void;
	onCancel: () => void;
};

/**
 * A Yes/No dialog like Windows shows before a permanent delete.
 * Portalled to <body>: windows are transformed, which would otherwise make
 * position: fixed relative to the window instead of the screen.
 */
function ConfirmDialog({ title, message, icon, onConfirm, onCancel }: Props) {
	return createPortal(
		<div className={styles.position}>
			<Dialog
				title={title}
				icon={icon}
				onClose={onCancel}
				buttons={[
					{ label: 'Yes', onClick: onConfirm, primary: true },
					{ label: 'No', onClick: onCancel },
				]}
			>
				<p>{message}</p>
			</Dialog>
		</div>,
		document.body,
	);
}

export default ConfirmDialog;
