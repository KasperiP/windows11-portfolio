'use client';

import Image from 'next/image';
import { WINDOWS, type WindowId } from '../../../lib/windows';
import { useWindowStore } from '../../../store/windows';
import styles from './Footer.module.css';

type Props = {
	name: string;
	icon: string;
	/** Set for apps backed by a real window; omitted for decorative apps. */
	windowId?: WindowId;
	onClick: () => void;
};

/**
 * A taskbar button with the Windows 11 running indicator: a short grey line
 * while the app is open (or minimized), a longer accent line plus a
 * highlighted background while its window has focus.
 */
function TaskbarItem({ name, icon, windowId, onClick }: Props) {
	const running = useWindowStore((s) =>
		windowId ? s.windows[windowId].open : false,
	);
	const focused = useWindowStore(
		(s) =>
			!!windowId &&
			s.focused === windowId &&
			s.windows[windowId].open &&
			!s.windows[windowId].minimized,
	);
	const title = useWindowStore((s) =>
		windowId ? s.windows[windowId].title : null,
	);

	// Like Windows: a running app's tooltip names its window, otherwise the app.
	const appName = windowId ? WINDOWS[windowId].name : name;
	const tooltip =
		running && title && title !== appName ? `${title} - ${appName}` : name;

	const state = focused ? styles.focused : running ? styles.running : '';

	return (
		<button
			type="button"
			className={`${styles.taskbarItem} ${state}`}
			onClick={onClick}
			aria-label={tooltip}
			aria-pressed={windowId ? focused : undefined}
			// DraggableWindow aims its minimize animation at this button.
			data-taskbar-window={windowId}
		>
			<Image src={icon} width={25} height={25} alt="" draggable={false} />
			<span className={styles.indicator} />
			<span className={styles.tooltip} role="tooltip">
				{tooltip}
			</span>
		</button>
	);
}

export default TaskbarItem;
