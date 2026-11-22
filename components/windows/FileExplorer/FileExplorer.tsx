'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import {
	LuArrowLeft,
	LuArrowRight,
	LuArrowUp,
	LuArrowUpDown,
	LuCirclePlus,
	LuClipboard,
	LuCopy,
	LuEllipsis,
	LuGrid2X2,
	LuLayoutDashboard,
	LuLayoutList,
	LuList,
	LuMonitor,
	LuPanelRight,
	LuRotateCw,
	LuScissors,
	LuSearch,
	LuShare,
	LuSquare,
	LuSquareSplitHorizontal,
	LuTableProperties,
	LuTextCursorInput,
	LuTrash2,
} from 'react-icons/lu';
import { parentOf } from '../../../lib/explorer';
import { useWindowStore } from '../../../store/windows';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import AddressBar from './AddressBar';
import CommandMenu, { type MenuEntry } from './CommandMenu';
import styles from './FileExplorer.module.css';
import Sidebar from './Sidebar';

export type Column = { label: string; width: string; align?: 'right' };

/** Folder-specific commands, shown after View like Windows does. */
export type ToolbarAction = {
	label: string;
	icon: ReactNode;
	onClick: () => void;
	disabled?: boolean;
};

// Matches the widths of the list rows in styles/utils/List.module.css.
const DEFAULT_COLUMNS: Column[] = [
	{ label: 'Name', width: '40%' },
	{ label: 'Date modified', width: '25%' },
	{ label: 'Type', width: '25%' },
	{ label: 'Size', width: '10%' },
];

const menuImage = (src: string) => (
	<Image src={src} alt="" width={16} height={16} />
);

const NEW_MENU: MenuEntry[] = [
	{ label: 'Folder', icon: menuImage('/icons/folder/folder.png') },
	'separator',
	{ label: 'Shortcut', icon: menuImage('/icons/shortcut/shortcut.png') },
	{ label: 'Text Document', icon: menuImage('/icons/notes/notes.png') },
];

const SORT_MENU: MenuEntry[] = [
	{ label: 'Name', checked: true },
	{ label: 'Date modified' },
	{ label: 'Type' },
	{ label: 'Size' },
	'separator',
	{ label: 'Ascending', checked: true },
	{ label: 'Descending' },
	'separator',
	{ label: 'Group by', submenu: true },
];

const viewMenu = (details: boolean): MenuEntry[] => [
	{ label: 'Extra large icons', icon: <LuSquare /> },
	{ label: 'Large icons', icon: <LuSquare />, checked: !details },
	{ label: 'Medium icons', icon: <LuSquare /> },
	{ label: 'Small icons', icon: <LuGrid2X2 /> },
	{ label: 'List', icon: <LuList /> },
	{ label: 'Details', icon: <LuTableProperties />, checked: details },
	{ label: 'Tiles', icon: <LuLayoutList /> },
	{ label: 'Content', icon: <LuLayoutDashboard /> },
	'separator',
	{ label: 'Details pane', icon: <LuPanelRight /> },
	{ label: 'Preview pane', icon: <LuSquareSplitHorizontal /> },
	'separator',
	{ label: 'Show', submenu: true },
];

const MORE_MENU: MenuEntry[] = [
	{ label: 'Undo' },
	{ label: 'Pin to Home' },
	'separator',
	{ label: 'Select all' },
	{ label: 'Select none' },
	{ label: 'Invert selection' },
	'separator',
	{ label: 'Properties' },
	{ label: 'Options' },
];

// Clipboard and file commands; greyed out because nothing is ever selected.
const EDIT_COMMANDS = [
	{ label: 'Cut', icon: <LuScissors /> },
	{ label: 'Copy', icon: <LuCopy /> },
	{ label: 'Paste', icon: <LuClipboard /> },
	{ label: 'Rename', icon: <LuTextCursorInput /> },
	{ label: 'Share', icon: <LuShare /> },
	{ label: 'Delete', icon: <LuTrash2 /> },
];

type Props = {
	folder: string;
	/** Icon folder name under /icons, or a full path starting with "/". */
	icon: string;
	/** Details view: column headers above a list. Otherwise an icon view. */
	topNav: boolean;
	/** Header columns when topNav is on; defaults to the usual file columns. */
	columns?: Column[];
	toolbarActions?: ToolbarAction[];
	/** Folders like the Recycle Bin where "New" is unavailable. */
	readOnly?: boolean;
	/** Shown in the status bar; omit when the count isn't meaningful. */
	itemCount?: number;
	component?: ReactNode;
};

function FileExplorer(props: Props) {
	const router = useRouter();
	// The explorer's own route, not the URL: the URL follows whichever window
	// is focused, but the sidebar should keep highlighting this folder.
	const explorerPath =
		useWindowStore((s) => s.windows.fileExplorer.path) ?? '';

	// History is recorded by useRouteSync on every explorer navigation.
	const { entries, index } = useWindowStore((s) => s.explorerHistory);
	const explorerGo = useWindowStore((s) => s.explorerGo);

	const iconSrc = props.icon.startsWith('/')
		? props.icon
		: `/icons/${props.icon}/${props.icon}.png`;

	const go = (delta: -1 | 1) => {
		const target = explorerGo(delta);
		if (target) router.push(target);
	};
	const parent = parentOf(explorerPath);

	const itemCount = props.itemCount ?? (props.component ? undefined : 0);

	return (
		<DraggableWindow
			windowId="fileExplorer"
			topTitle={props.folder}
			topIcon={<Image src={iconSrc} alt="" width={16} height={16} />}
			tabbed
		>
			<div className={styles.explorer}>
				<div className={styles.addressRow}>
					<div className={styles.navButtons}>
						<button
							type="button"
							onClick={() => go(-1)}
							disabled={entries[index - 1] === undefined}
							aria-label="Back"
						>
							<LuArrowLeft />
						</button>
						<button
							type="button"
							onClick={() => go(1)}
							disabled={entries[index + 1] === undefined}
							aria-label="Forward"
						>
							<LuArrowRight />
						</button>
						<button
							type="button"
							onClick={() => parent && router.push(parent)}
							disabled={!parent}
							aria-label="Up"
						>
							<LuArrowUp />
						</button>
						<button
							type="button"
							onClick={() => router.refresh()}
							aria-label="Refresh"
						>
							<LuRotateCw />
						</button>
					</div>
					{/* Remount on folder change so an open edit resets. */}
					<AddressBar key={props.folder} folder={props.folder} />
					<label className={styles.search}>
						<input
							placeholder={`Search ${props.folder}`}
							aria-label={`Search ${props.folder}`}
						/>
						<LuSearch />
					</label>
				</div>

				<div className={styles.commandBar}>
					<CommandMenu
						icon={<LuCirclePlus />}
						label="New"
						items={NEW_MENU}
						disabled={props.readOnly}
					/>
					<span className={styles.divider} />
					{EDIT_COMMANDS.map((command) => (
						<button
							key={command.label}
							type="button"
							className={styles.iconCommand}
							aria-label={command.label}
							title={command.label}
							disabled
						>
							{command.icon}
						</button>
					))}
					<span className={styles.divider} />
					<CommandMenu
						icon={<LuArrowUpDown />}
						label="Sort"
						items={SORT_MENU}
					/>
					<CommandMenu
						icon={<LuMonitor />}
						label="View"
						items={viewMenu(props.topNav)}
					/>
					{props.toolbarActions && (
						<>
							<span className={styles.divider} />
							{props.toolbarActions.map((action) => (
								<button
									key={action.label}
									type="button"
									className={styles.textCommand}
									onClick={action.onClick}
									disabled={action.disabled}
								>
									{action.icon}
									<span>{action.label}</span>
								</button>
							))}
						</>
					)}
					<span className={styles.divider} />
					<CommandMenu
						icon={<LuEllipsis />}
						ariaLabel="See more"
						items={MORE_MENU}
					/>
					<button
						type="button"
						className={`${styles.textCommand} ${styles.details}`}
					>
						<LuPanelRight />
						<span>Details</span>
					</button>
				</div>

				<div className={styles.body}>
					<Sidebar currentPath={explorerPath} />
					<main className={styles.content}>
						{props.topNav && (
							<div className={styles.columns}>
								{(props.columns ?? DEFAULT_COLUMNS).map(
									(column) => (
										<div
											key={column.label}
											style={{
												width: column.width,
												textAlign: column.align,
											}}
										>
											<p>{column.label}</p>
										</div>
									),
								)}
							</div>
						)}
						<div className={styles.child}>
							{props.component || (
								<p className={styles.emptyFolder}>
									This folder is empty.
								</p>
							)}
						</div>
					</main>
				</div>

				<footer className={styles.statusBar}>
					<p>
						{itemCount !== undefined &&
							`${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
					</p>
					<div className={styles.viewToggles}>
						<span
							className={props.topNav ? styles.activeView : ''}
							title="Details"
						>
							<LuTableProperties />
						</span>
						<span
							className={props.topNav ? '' : styles.activeView}
							title="Large icons"
						>
							<LuSquare />
						</span>
					</div>
				</footer>
			</div>
		</DraggableWindow>
	);
}

export default FileExplorer;
