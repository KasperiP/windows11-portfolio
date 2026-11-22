'use client';

import Image from 'next/image';
import Link from 'next/link';
import FileExplorer from '../../../../components/windows/FileExplorer/FileExplorer';
import { formatFileDate } from '../../../../lib/desktop';
import { useVisibleDesktopItems } from '../../../../store/desktop';
import styles from '../../../../styles/utils/List.module.css';

/** The desktop shortcuts in Details view, minus what's in the Recycle Bin. */
function DesktopFolder() {
	const items = useVisibleDesktopItems();

	const content = (
		<div className={styles.listItemContainer}>
			{items.map((item) => (
				<Link
					key={item.id}
					href={item.href}
					className={styles.listItem}
					draggable={false}
				>
					<div className={styles.listItemName}>
						<Image src={item.icon} alt="" width={16} height={16} />
						<p>
							{item.name}
							{item.extension}
						</p>
					</div>
					<p className={styles.listItemDateModified}>
						{formatFileDate(item.modified)}
					</p>
					<p className={styles.listItemType}>{item.type}</p>
					{/* Details view leaves the size blank for folders. */}
					<p className={styles.listItemSize}>
						{item.type === 'File folder' ? '' : item.size}
					</p>
				</Link>
			))}
		</div>
	);

	return (
		<FileExplorer
			icon="desktop"
			folder="Desktop"
			topNav={true}
			itemCount={items.length}
			// Falsy lets FileExplorer render "This folder is empty."
			component={items.length ? content : undefined}
		/>
	);
}

export default DesktopFolder;
