export type WindowId = 'fileExplorer' | 'notepad' | 'terminal' | 'mediaPlayer';

export type WindowConfig = {
	id: WindowId;
	/** App name, shown in the taskbar tooltip when the app is not running. */
	name: string;
	icon: string;
	/** Route opened when the app is launched from the taskbar. */
	defaultPath?: string;
	/** Routes under this prefix belong to this window. */
	routePrefix?: string;
	/** Pinned apps keep a taskbar slot when closed; others only appear while open. */
	pinned: boolean;
};

export const WINDOWS: Record<WindowId, WindowConfig> = {
	fileExplorer: {
		id: 'fileExplorer',
		name: 'File Explorer',
		icon: '/icons/explorer/explorer.png',
		defaultPath: '/explorer/quick-access',
		routePrefix: '/explorer',
		pinned: true,
	},
	notepad: {
		id: 'notepad',
		name: 'Notepad',
		icon: '/icons/notepad/notepad.png',
		defaultPath: '/notepad/about',
		routePrefix: '/notepad',
		pinned: false,
	},
	terminal: {
		id: 'terminal',
		name: 'Terminal',
		icon: '/icons/terminal/terminal.png',
		defaultPath: '/terminal',
		routePrefix: '/terminal',
		pinned: true,
	},
	mediaPlayer: {
		id: 'mediaPlayer',
		name: 'Media Player',
		icon: '/icons/videos/videos.png',
		pinned: false,
	},
};

export const WINDOW_IDS = Object.keys(WINDOWS) as WindowId[];

export const windowForPath = (pathname: string): WindowId | null => {
	const match = WINDOW_IDS.find((id) => {
		const prefix = WINDOWS[id].routePrefix;
		return (
			prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`))
		);
	});
	return match ?? null;
};

// Matches the taskbar height in Footer.module.css.
export const TASKBAR_HEIGHT = 50;
export const DEFAULT_WIDTH = 880;
export const DEFAULT_HEIGHT = 550;
