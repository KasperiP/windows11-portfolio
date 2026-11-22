export type DesktopItem = {
	id: string;
	name: string;
	href: string;
	icon: string;
	/** Item type as Windows shows it in the Recycle Bin. */
	type: string;
	size: string;
	/** Shown after the name in the Recycle Bin, e.g. ".txt". */
	extension?: string;
	/** ISO date for the Recycle Bin's "Date modified" column. */
	modified: string;
	/** next/image quality override, for icons that look rough compressed. */
	quality?: number;
};

/** Desktop shortcuts, in their on-screen order. */
export const DESKTOP_ITEMS: DesktopItem[] = [
	{
		id: 'about',
		name: 'About me',
		href: '/notepad/about',
		icon: '/icons/notes/notes.png',
		type: 'Text Document',
		size: '1 KB',
		extension: '.txt',
		modified: '2026-10-14T18:22:00',
	},
	{
		id: 'projects',
		name: 'Projects',
		href: '/explorer/projects',
		icon: '/icons/folder/folder.png',
		type: 'File folder',
		size: '24 KB',
		modified: '2026-11-20T21:05:00',
	},
	{
		id: 'tools',
		name: 'Tools',
		href: '/explorer/tools',
		icon: '/icons/folder/folder.png',
		type: 'File folder',
		size: '12 KB',
		modified: '2026-11-02T16:40:00',
	},
	{
		id: 'podcasts',
		name: 'Podcasts I listen to',
		href: '/explorer/podcasts',
		icon: '/icons/folder/folder.png',
		type: 'File folder',
		size: '8 KB',
		modified: '2026-09-28T09:12:00',
	},
	{
		id: 'links',
		name: 'Links',
		href: '/explorer/links',
		icon: '/icons/links/links.png',
		type: 'File folder',
		size: '4 KB',
		modified: '2026-11-05T12:31:00',
	},
	{
		id: 'pictures',
		name: 'Pictures',
		href: '/explorer/pictures',
		icon: '/icons/pictures/pictures.png',
		type: 'File folder',
		size: '18.4 MB',
		modified: '2026-08-17T20:48:00',
	},
	{
		id: 'videos',
		name: 'Videos',
		href: '/explorer/videos',
		icon: '/icons/videos/videos.png',
		type: 'File folder',
		size: '96.1 MB',
		modified: '2026-07-30T14:03:00',
		quality: 100,
	},
];

export const DESKTOP_PATH = 'C:\\Users\\kassq\\Desktop';

export const RECYCLE_BIN_PATH = '/explorer/recycle-bin';

export const recycleBinIcon = (full: boolean) =>
	full ? '/icons/trash/trash_full.png' : '/icons/trash/trash_empty.png';

/** Explorer's date format, e.g. "11/22/2026 9:34 PM" in en-US. Client only. */
export const formatFileDate = (date: number | string) =>
	new Date(date)
		.toLocaleString(undefined, {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
		})
		.replace(',', '');
