'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import type { KeyboardEvent, ReactNode } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import styles from './Dialog.module.css';

export type DialogButton = {
	label: string;
	onClick: () => void;
	/** Accent-coloured default button, focused when the dialog opens. */
	primary?: boolean;
};

type Props = {
	title: string;
	/** Large icon beside the message (error, file, Recycle Bin...). */
	icon: string;
	children: ReactNode;
	buttons: DialogButton[];
	/** Close button and Escape. */
	onClose: () => void;
};

/** Class on the title bar, for wrappers that make the dialog draggable. */
export const DIALOG_DRAG_HANDLE = 'dialog-drag-handle';

/**
 * A Windows 11 message box: title bar with a close button, icon and
 * message, and a darker button row. Positioning is up to the caller.
 */
function Dialog({ title, icon, children, buttons, onClose }: Props) {
	// Escape closes the dialog that has focus, not every open dialog.
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') onClose();
	};

	return (
		<motion.div
			className={styles.dialog}
			role="alertdialog"
			aria-label={title}
			onKeyDown={handleKeyDown}
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.12, ease: 'easeOut' }}
		>
			<div className={`${styles.titleBar} ${DIALOG_DRAG_HANDLE}`}>
				<p>{title}</p>
				<button
					type="button"
					className={styles.close}
					onClick={onClose}
					aria-label="Close"
				>
					<VscChromeClose />
				</button>
			</div>
			<div className={styles.content}>
				<Image src={icon} alt="" width={32} height={32} />
				<div className={styles.message}>{children}</div>
			</div>
			<div className={styles.buttons}>
				{buttons.map((button) => (
					<button
						key={button.label}
						type="button"
						className={button.primary ? styles.primary : ''}
						onClick={button.onClick}
						autoFocus={button.primary}
					>
						{button.label}
					</button>
				))}
			</div>
		</motion.div>
	);
}

export default Dialog;
