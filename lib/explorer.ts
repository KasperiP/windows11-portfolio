import { RECYCLE_BIN_PATH } from './desktop';

export type NavItem = {
	label: string;
	href: string;
	icon: string;
	/** Shows the pin glyph, like folders pinned to Home. */
	pinned?: boolean;
	children?: NavItem[];
};

export const HOME_PATH = '/explorer/quick-access';
export const THIS_PC_PATH = '/explorer/this-pc';
export const DESKTOP_FOLDER_PATH = '/explorer/desktop';

const FOLDER_ICON = '/icons/folder/folder.png';

export const HOME: NavItem = {
	label: 'Home',
	href: HOME_PATH,
	icon: '/icons/quickaccess/quickaccess.png',
};

const DRIVES: NavItem[] = [
	{
		label: '250GB SSD (C:)',
		href: '/explorer/drives/C',
		icon: '/icons/drives/c.png',
	},
	{
		label: '1TB SSD (D:)',
		href: '/explorer/drives/D',
		icon: '/icons/drives/d.png',
	},
];

export const THIS_PC: NavItem = {
	label: 'This PC',
	href: THIS_PC_PATH,
	icon: '/icons/this-pc/this-pc.png',
	children: DRIVES,
};

// Folders that live on the desktop, so Up from them goes to Desktop.
const DESKTOP_FOLDERS: NavItem[] = [
	{ label: 'Projects', href: '/explorer/projects', icon: FOLDER_ICON },
	{ label: 'Tools', href: '/explorer/tools', icon: FOLDER_ICON },
	{ label: 'Podcasts', href: '/explorer/podcasts', icon: FOLDER_ICON },
	{ label: 'Links', href: '/explorer/links', icon: '/icons/links/links.png' },
];

/** The navigation pane's folder group: pinned user folders, then the rest. */
export const FOLDERS: NavItem[] = [
	{
		label: 'Desktop',
		href: DESKTOP_FOLDER_PATH,
		icon: '/icons/desktop/desktop.png',
		pinned: true,
	},
	{
		label: 'Downloads',
		href: '/explorer/downloads',
		icon: '/icons/downloads/downloads_small.png',
		pinned: true,
	},
	{
		label: 'Documents',
		href: '/explorer/documents',
		icon: '/icons/documents/documents_small.png',
		pinned: true,
	},
	{
		label: 'Pictures',
		href: '/explorer/pictures',
		icon: '/icons/pictures/pictures_small.png',
		pinned: true,
	},
	{
		label: 'Music',
		href: '/explorer/music',
		icon: '/icons/music/music_small.png',
		pinned: true,
	},
	{
		label: 'Videos',
		href: '/explorer/videos',
		icon: '/icons/videos/videos_small.png',
		pinned: true,
	},
	...DESKTOP_FOLDERS,
];

/** The folder the Up button goes to, or null at the top (Home). */
export const parentOf = (path: string): string | null => {
	if (path === HOME_PATH) return null;
	if (DRIVES.some((drive) => drive.href === path)) return THIS_PC_PATH;
	if (
		path === RECYCLE_BIN_PATH ||
		DESKTOP_FOLDERS.some((folder) => folder.href === path)
	) {
		return DESKTOP_FOLDER_PATH;
	}
	return HOME_PATH;
};

const ADDRESSABLE = [
	HOME,
	...FOLDERS,
	THIS_PC,
	...DRIVES,
	{ label: 'Recycle Bin', href: RECYCLE_BIN_PATH, icon: '' },
];

/** Resolves a folder name typed into the address bar to its route. */
export const findFolder = (name: string): string | null => {
	const query = name.trim().toLowerCase();
	const match = ADDRESSABLE.find(
		(item) => item.label.toLowerCase() === query,
	);
	return match?.href ?? null;
};
