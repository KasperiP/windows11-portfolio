'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type KeyboardEvent, useState } from 'react';
import { LuChevronRight, LuMonitor } from 'react-icons/lu';
import { findFolder, THIS_PC_PATH } from '../../../lib/explorer';
import styles from './AddressBar.module.css';

/**
 * Breadcrumbs that turn into a text field when clicked, like Windows.
 * Typing a folder name (e.g. "Downloads") and pressing Enter opens it.
 */
function AddressBar({ folder }: { folder: string }) {
	const router = useRouter();
	const [editing, setEditing] = useState(false);

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Escape') setEditing(false);
		if (e.key !== 'Enter') return;
		const target = findFolder(e.currentTarget.value);
		if (target) router.push(target);
		setEditing(false);
	};

	if (editing) {
		return (
			<div className={styles.bar}>
				<input
					className={styles.input}
					defaultValue={folder}
					aria-label="Address"
					autoFocus
					onFocus={(e) => e.target.select()}
					onBlur={() => setEditing(false)}
					onKeyDown={handleKeyDown}
				/>
			</div>
		);
	}

	return (
		<div className={styles.bar} onClick={() => setEditing(true)}>
			<Link
				href={THIS_PC_PATH}
				className={styles.crumb}
				aria-label="This PC"
				draggable={false}
				onClick={(e) => e.stopPropagation()}
			>
				<LuMonitor />
			</Link>
			<LuChevronRight className={styles.separator} />
			<span className={styles.crumb}>{folder}</span>
			<LuChevronRight className={styles.separator} />
		</div>
	);
}

export default AddressBar;
