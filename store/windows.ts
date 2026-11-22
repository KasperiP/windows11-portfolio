import { create } from 'zustand';
import {
	DEFAULT_HEIGHT,
	DEFAULT_WIDTH,
	TASKBAR_HEIGHT,
	WINDOW_IDS,
	WINDOWS,
	type WindowId,
} from '../lib/windows';
import type { PictureType, VideoType } from '../types';

export type Rect = { x: number; y: number; width: number; height: number };

export type WindowState = {
	open: boolean;
	minimized: boolean;
	maximized: boolean;
	/** Last restored (non-maximized) bounds; null means centre on next open. */
	rect: Rect | null;
	/** Stacking order; higher is in front. */
	z: number;
	/** Last route this window showed, so focusing it can restore the URL. */
	path: string | null;
	/** Current title bar text, shown in the taskbar tooltip. */
	title: string;
	/**
	 * Bumped each time the window opens from closed. Windows stay mounted in
	 * their route slot after closing, so content keys its state on this to
	 * start fresh on relaunch, like a real app would.
	 */
	session: number;
};

export type OpenMedia =
	{ kind: 'picture'; item: PictureType } | { kind: 'video'; item: VideoType };

type ExplorerHistory = { entries: string[]; index: number };

type WindowStore = {
	windows: Record<WindowId, WindowState>;
	/** Open windows in launch order; unpinned taskbar entries follow it. */
	taskbarOrder: WindowId[];
	focused: WindowId | null;
	nextZ: number;
	explorerHistory: ExplorerHistory;
	/** Last opened media; kept after close so the window can animate out. */
	media: OpenMedia | null;

	open: (id: WindowId, path?: string) => void;
	focus: (id: WindowId) => void;
	minimize: (id: WindowId) => void;
	close: (id: WindowId) => void;
	setMaximized: (id: WindowId, maximized: boolean) => void;
	setRect: (id: WindowId, rect: Rect) => void;
	setTitle: (id: WindowId, title: string) => void;
	clearFocus: () => void;
	openMedia: (media: OpenMedia) => void;
	/** Records an explorer route; a revisit of the current entry is ignored. */
	explorerVisit: (path: string) => void;
	/** Moves through explorer history and returns the route to navigate to. */
	explorerGo: (delta: -1 | 1) => string | null;
};

// React-selecto uses z-index 100, dragging windows use 997 and the taskbar
// 998, so window stacking lives between those.
const BASE_Z = 101;
const MAX_Z = 900;

const initialWindow = (id: WindowId): WindowState => ({
	open: false,
	minimized: false,
	maximized: false,
	rect: null,
	z: 0,
	path: null,
	title: WINDOWS[id].name,
	session: 0,
});

const centeredRect = (): Rect => ({
	x: Math.max(0, (window.innerWidth - DEFAULT_WIDTH) / 2),
	y: Math.max(0, (window.innerHeight - TASKBAR_HEIGHT - DEFAULT_HEIGHT) / 2),
	width: DEFAULT_WIDTH,
	height: DEFAULT_HEIGHT,
});

/** The front-most window that is open and not minimized, like Windows picks. */
const topVisible = (
	windows: Record<WindowId, WindowState>,
	exclude: WindowId,
): WindowId | null => {
	const candidates = WINDOW_IDS.filter(
		(id) => id !== exclude && windows[id].open && !windows[id].minimized,
	);
	if (!candidates.length) return null;
	return candidates.reduce((a, b) => (windows[a].z >= windows[b].z ? a : b));
};

export const useWindowStore = create<WindowStore>()((set, get) => {
	const update = (id: WindowId, patch: Partial<WindowState>) =>
		set((s) => ({
			windows: { ...s.windows, [id]: { ...s.windows[id], ...patch } },
		}));

	return {
		windows: Object.fromEntries(
			WINDOW_IDS.map((id) => [id, initialWindow(id)]),
		) as Record<WindowId, WindowState>,
		taskbarOrder: [],
		focused: null,
		nextZ: BASE_Z,
		explorerHistory: { entries: [], index: -1 },
		media: null,

		open: (id, path) => {
			const { windows, taskbarOrder } = get();
			const current = windows[id];
			update(id, {
				open: true,
				minimized: false,
				rect: current.rect ?? centeredRect(),
				path: path ?? current.path,
				session: current.open ? current.session : current.session + 1,
			});
			if (!taskbarOrder.includes(id)) {
				set({ taskbarOrder: [...taskbarOrder, id] });
			}
			get().focus(id);
		},

		focus: (id) => {
			const { windows, focused, nextZ } = get();
			const current = windows[id];
			if (!current.open) return;
			if (
				focused === id &&
				current.z === nextZ - 1 &&
				!current.minimized
			) {
				return;
			}

			if (nextZ <= MAX_Z) {
				set({
					focused: id,
					nextZ: nextZ + 1,
					windows: {
						...windows,
						[id]: { ...current, minimized: false, z: nextZ },
					},
				});
				return;
			}

			// Renumber from the bottom so z-indexes never climb past the taskbar.
			const order = WINDOW_IDS.filter((w) => w !== id).sort(
				(a, b) => windows[a].z - windows[b].z,
			);
			const renumbered = { ...windows };
			order.forEach((w, i) => {
				renumbered[w] = { ...windows[w], z: BASE_Z + i };
			});
			renumbered[id] = {
				...current,
				minimized: false,
				z: BASE_Z + order.length,
			};
			set({
				focused: id,
				nextZ: BASE_Z + order.length + 1,
				windows: renumbered,
			});
		},

		minimize: (id) => {
			update(id, { minimized: true });
			const { windows, focused } = get();
			if (focused === id) set({ focused: topVisible(windows, id) });
		},

		close: (id) => {
			update(id, { open: false, minimized: false, maximized: false });
			const { windows, focused, taskbarOrder } = get();
			set({
				taskbarOrder: taskbarOrder.filter((w) => w !== id),
				focused: focused === id ? topVisible(windows, id) : focused,
				...(id === 'fileExplorer' && {
					explorerHistory: { entries: [], index: -1 },
				}),
			});
		},

		setMaximized: (id, maximized) => update(id, { maximized }),

		setRect: (id, rect) => update(id, { rect }),

		setTitle: (id, title) => {
			if (get().windows[id].title !== title) update(id, { title });
		},

		clearFocus: () => set({ focused: null }),

		openMedia: (media) => {
			set({ media });
			get().open('mediaPlayer');
		},

		explorerVisit: (path) => {
			const { entries, index } = get().explorerHistory;
			if (entries[index] === path) return;
			const next = [...entries.slice(0, index + 1), path];
			set({ explorerHistory: { entries: next, index: next.length - 1 } });
		},

		explorerGo: (delta) => {
			const { entries, index } = get().explorerHistory;
			const target = entries[index + delta];
			if (target === undefined) return null;
			set({ explorerHistory: { entries, index: index + delta } });
			return target;
		},
	};
});
