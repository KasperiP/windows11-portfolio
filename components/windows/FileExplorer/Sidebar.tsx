'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { LuChevronRight, LuPin } from 'react-icons/lu';
import { FOLDERS, HOME, type NavItem, THIS_PC } from '../../../lib/explorer';
import styles from './Sidebar.module.css';

type Props = {
	/** The explorer's current folder route, highlighted in the pane. */
	currentPath: string;
};

/** The Windows 11 navigation pane: Home, folders, then This PC. */
function Sidebar({ currentPath }: Props) {
	const [expanded, setExpanded] = useState<string[]>([]);

	const toggle = (href: string) =>
		setExpanded(
			expanded.includes(href)
				? expanded.filter((h) => h !== href)
				: [...expanded, href],
		);

	const renderItem = (item: NavItem, depth = 0) => {
		const isOpen = expanded.includes(item.href);
		return (
			<li key={item.href}>
				<div
					className={`${styles.item} ${
						currentPath === item.href ? styles.selected : ''
					}`}
					style={{ paddingLeft: 4 + depth * 16 }}
				>
					<span className={styles.expander}>
						{item.children && (
							<button
								type="button"
								onClick={() => toggle(item.href)}
								aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.label}`}
								aria-expanded={isOpen}
							>
								<LuChevronRight
									className={isOpen ? styles.open : ''}
								/>
							</button>
						)}
					</span>
					<Link href={item.href} draggable={false}>
						<Image src={item.icon} alt="" width={16} height={16} />
						<span>{item.label}</span>
						{item.pinned && <LuPin className={styles.pin} />}
					</Link>
				</div>
				{item.children && isOpen && (
					<ul>
						{item.children.map((child) =>
							renderItem(child, depth + 1),
						)}
					</ul>
				)}
			</li>
		);
	};

	return (
		<nav className={styles.sidebar} aria-label="Navigation pane">
			<ul>{renderItem(HOME)}</ul>
			<hr />
			<ul>{FOLDERS.map((item) => renderItem(item))}</ul>
			<hr />
			<ul>{renderItem(THIS_PC)}</ul>
		</nav>
	);
}

export default Sidebar;
