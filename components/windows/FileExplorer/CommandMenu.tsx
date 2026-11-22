'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuChevronRight } from 'react-icons/lu';
import styles from './CommandMenu.module.css';

export type MenuEntry =
	| {
			label: string;
			icon?: ReactNode;
			/** Shows the radio dot, like the current View mode. */
			checked?: boolean;
			submenu?: boolean;
	  }
	| 'separator';

type Props = {
	icon: ReactNode;
	/** Visible label; icon-only buttons (like "•••") pass ariaLabel instead. */
	label?: string;
	ariaLabel?: string;
	items: MenuEntry[];
	disabled?: boolean;
};

/**
 * A command bar button that opens a dropdown on click, like the Windows 11
 * File Explorer. The commands themselves are decorative: choosing one just
 * closes the menu.
 */
function CommandMenu({ icon, label, ariaLabel, items, disabled }: Props) {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const onMouseDown = (e: MouseEvent) => {
			if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
		};
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
		};
		document.addEventListener('mousedown', onMouseDown);
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('mousedown', onMouseDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [open]);

	return (
		<div className={styles.root} ref={rootRef}>
			<button
				type="button"
				className={`${styles.trigger} ${open ? styles.active : ''}`}
				onClick={() => setOpen(!open)}
				disabled={disabled}
				aria-label={ariaLabel}
				aria-haspopup="menu"
				aria-expanded={open}
			>
				{icon}
				{label && (
					<>
						<span>{label}</span>
						<LuChevronDown className={styles.chevron} />
					</>
				)}
			</button>
			{open && (
				<div className={styles.menu} role="menu">
					{items.map((item, i) =>
						item === 'separator' ? (
							<div key={i} className={styles.separator} />
						) : (
							<button
								key={item.label}
								type="button"
								role="menuitem"
								className={styles.item}
								onClick={() => setOpen(false)}
							>
								<span className={styles.check}>
									{item.checked && (
										<span className={styles.dot} />
									)}
								</span>
								<span className={styles.itemIcon}>
									{item.icon}
								</span>
								<span className={styles.itemLabel}>
									{item.label}
								</span>
								{item.submenu && <LuChevronRight />}
							</button>
						),
					)}
				</div>
			)}
		</div>
	);
}

export default CommandMenu;
