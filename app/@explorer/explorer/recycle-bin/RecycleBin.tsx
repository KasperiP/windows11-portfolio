'use client';

import Image from 'next/image';
import { type MouseEvent, useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { MdRestore } from 'react-icons/md';
import ConfirmDialog from '../../../../components/windows/ConfirmDialog/ConfirmDialog';
import FileExplorer, {
	type Column,
	type ToolbarAction,
} from '../../../../components/windows/FileExplorer/FileExplorer';
import {
	DESKTOP_ITEMS,
	DESKTOP_PATH,
	type DesktopItem,
	formatFileDate,
	RECYCLE_BIN_PATH,
	recycleBinIcon,
} from '../../../../lib/desktop';
import { useDesktopStore } from '../../../../store/desktop';
import { useWindowStore } from '../../../../store/windows';
import listStyles from '../../../../styles/utils/List.module.css';
import styles from './RecycleBin.module.css';

type Entry = DesktopItem & { deletedAt: number };

// The columns of the Windows 11 Recycle Bin. Name is rendered separately
// because it carries the icon.
const COLUMNS: (Column & { value?: (entry: Entry) => string })[] = [
	{ label: 'Name', width: '25%' },
	{ label: 'Original Location', width: '20%', value: () => DESKTOP_PATH },
	{
		label: 'Date Deleted',
		width: '17%',
		value: (entry) => formatFileDate(entry.deletedAt),
	},
	{
		label: 'Size',
		width: '8%',
		align: 'right',
		value: (entry) => entry.size,
	},
	{ label: 'Item type', width: '13%', value: (entry) => entry.type },
	{
		label: 'Date modified',
		width: '17%',
		value: (entry) => formatFileDate(entry.modified),
	},
];

function RecycleBin() {
	const recycled = useDesktopStore((s) => s.recycled);
	const restore = useDesktopStore((s) => s.restore);
	const purge = useDesktopStore((s) => s.purge);
	const explorer = useWindowStore((s) => s.windows.fileExplorer);

	const [selected, setSelected] = useState<string[]>([]);
	// Items waiting on the "permanently delete?" confirmation. The dialog
	// belongs to the Explorer window: it hides while the window is minimized
	// and is dropped when the window closes (keyed on its session).
	const [pending, setPending] = useState<{
		session: number;
		ids: string[];
	} | null>(null);
	const confirming =
		pending?.session === explorer.session ? pending.ids : null;

	const entries: Entry[] = recycled.flatMap((r) => {
		const item = DESKTOP_ITEMS.find((i) => i.id === r.id);
		return item ? [{ ...item, deletedAt: r.deletedAt }] : [];
	});
	const allIds = entries.map((e) => e.id);
	// Ignore selections of items that have since left the bin.
	const selection = selected.filter((id) => allIds.includes(id));

	const confirmDelete = (ids: string[]) =>
		setPending({ session: explorer.session, ids });

	// Delete inside the Recycle Bin deletes permanently, after confirming.
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key !== 'Delete' || !selection.length || confirming) return;
			const { focused, windows } = useWindowStore.getState();
			const win = windows.fileExplorer;
			if (
				focused !== 'fileExplorer' ||
				win.minimized ||
				win.path !== RECYCLE_BIN_PATH
			) {
				return;
			}
			if ((e.target as Element).closest('input, textarea')) return;
			setPending({ session: win.session, ids: selection });
		};
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [confirming, selection]);

	// Click selects one item; Ctrl/Cmd+click adds or removes it, like Windows.
	const handleRowClick = (e: MouseEvent, id: string) => {
		if (e.ctrlKey || e.metaKey) {
			setSelected(
				selection.includes(id)
					? selection.filter((s) => s !== id)
					: [...selection, id],
			);
		} else {
			setSelected([id]);
		}
	};

	const handleRestore = (ids: string[]) => {
		restore(ids);
		setSelected([]);
	};

	const handleConfirm = () => {
		if (confirming) purge(confirming);
		setSelected([]);
		setPending(null);
	};

	// Like Windows: "Restore all items" turns into "Restore the selected
	// items" while something is selected, and both grey out when empty.
	const toolbarActions: ToolbarAction[] = [
		{
			label: 'Empty Recycle Bin',
			icon: <BsTrash />,
			onClick: () => confirmDelete(allIds),
			disabled: !entries.length,
		},
		selection.length
			? {
					label: 'Restore the selected items',
					icon: <MdRestore />,
					onClick: () => handleRestore(selection),
				}
			: {
					label: 'Restore all items',
					icon: <MdRestore />,
					onClick: () => handleRestore(allIds),
					disabled: !entries.length,
				},
	];

	const dialog = () => {
		if (!confirming || !explorer.open || explorer.minimized) return null;
		const single =
			confirming.length === 1
				? entries.find((e) => e.id === confirming[0])
				: undefined;
		const noun = single?.type === 'File folder' ? 'folder' : 'file';
		return (
			<ConfirmDialog
				title={
					single
						? `Delete ${noun === 'folder' ? 'Folder' : 'File'}`
						: 'Delete Multiple Items'
				}
				message={
					single
						? `Are you sure you want to permanently delete this ${noun}?`
						: `Are you sure you want to permanently delete these ${confirming.length} items?`
				}
				icon={single?.icon ?? recycleBinIcon(true)}
				onConfirm={handleConfirm}
				onCancel={() => setPending(null)}
			/>
		);
	};

	const content = (
		<div
			className={listStyles.listItemContainer}
			role="listbox"
			aria-label="Recycle Bin"
			aria-multiselectable="true"
		>
			{entries.map((entry) => (
				<div
					key={entry.id}
					className={`${listStyles.listItem} ${
						selection.includes(entry.id) ? styles.selected : ''
					}`}
					onClick={(e) => handleRowClick(e, entry.id)}
					aria-selected={selection.includes(entry.id)}
					role="option"
				>
					<div
						className={listStyles.listItemName}
						style={{ width: COLUMNS[0].width }}
					>
						<Image src={entry.icon} alt="" width={16} height={16} />
						<p>
							{entry.name}
							{entry.extension}
						</p>
					</div>
					{COLUMNS.slice(1).map((column) => (
						<p
							key={column.label}
							className={`${styles.cell} ${
								column.align === 'right' ? styles.right : ''
							}`}
							style={{ width: column.width }}
						>
							{column.value?.(entry)}
						</p>
					))}
				</div>
			))}
		</div>
	);

	return (
		<>
			<FileExplorer
				folder="Recycle Bin"
				icon={recycleBinIcon(entries.length > 0)}
				topNav={entries.length > 0}
				columns={COLUMNS}
				toolbarActions={toolbarActions}
				readOnly
				itemCount={entries.length}
				// Falsy lets FileExplorer render "This folder is empty."
				component={entries.length ? content : undefined}
			/>
			{dialog()}
		</>
	);
}

export default RecycleBin;
