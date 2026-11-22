import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { DESKTOP_ITEMS } from '../lib/desktop';

export type RecycledItem = { id: string; deletedAt: number };

type DesktopStore = {
	/** Desktop items in the Recycle Bin, most recently deleted first. */
	recycled: RecycledItem[];
	/** Items deleted from the Recycle Bin; gone for good, like on Windows. */
	removed: string[];
	/** False until the saved desktop has been read from localStorage. */
	hydrated: boolean;

	recycle: (ids: string[]) => void;
	restore: (ids: string[]) => void;
	/** Permanently deletes the given Recycle Bin items. */
	purge: (ids: string[]) => void;
};

export const useDesktopStore = create<DesktopStore>()(
	persist(
		(set, get) => ({
			recycled: [],
			removed: [],
			hydrated: false,

			recycle: (ids) => {
				const { recycled } = get();
				const deletedAt = Date.now();
				const added = ids
					.filter((id) => !recycled.some((r) => r.id === id))
					.map((id) => ({ id, deletedAt }));
				if (added.length) set({ recycled: [...added, ...recycled] });
			},

			restore: (ids) =>
				set((s) => ({
					recycled: s.recycled.filter((r) => !ids.includes(r.id)),
				})),

			purge: (ids) =>
				set((s) => ({
					recycled: s.recycled.filter((r) => !ids.includes(r.id)),
					removed: [...s.removed, ...ids],
				})),
		}),
		{
			name: 'desktop',
			version: 1,
			storage: createJSONStorage(() => localStorage),
			partialize: ({ recycled, removed }) => ({ recycled, removed }),
			// The server can't see localStorage, so render the default desktop
			// first and rehydrate after mount (see Icons) to avoid a hydration
			// mismatch.
			skipHydration: true,
			onRehydrateStorage: () => () =>
				useDesktopStore.setState({ hydrated: true }),
		},
	),
);

/** Desktop items that are neither in the Recycle Bin nor deleted for good. */
export const useVisibleDesktopItems = () => {
	const recycled = useDesktopStore((s) => s.recycled);
	const removed = useDesktopStore((s) => s.removed);
	return DESKTOP_ITEMS.filter(
		(item) =>
			!removed.includes(item.id) &&
			!recycled.some((r) => r.id === item.id),
	);
};
