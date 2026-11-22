import { useMemo } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { DESKTOP_ITEMS } from '../lib/desktop';
import type { Layout } from '../lib/desktopGrid';

export type RecycledItem = { id: string; deletedAt: number };

type DesktopStore = {
	/** Desktop items in the Recycle Bin, most recently deleted first. */
	recycled: RecycledItem[];
	/** Items deleted from the Recycle Bin; gone for good, like on Windows. */
	removed: string[];
	/**
	 * Grid cells of icons the user has arranged. Kept while an item is in the
	 * Recycle Bin, so restoring puts it back where it was (if still free).
	 */
	positions: Layout;
	/** False until the saved desktop has been read from sessionStorage. */
	hydrated: boolean;

	recycle: (ids: string[]) => void;
	restore: (ids: string[]) => void;
	/** Permanently deletes the given Recycle Bin items. */
	purge: (ids: string[]) => void;
	setPositions: (positions: Layout) => void;
};

export const useDesktopStore = create<DesktopStore>()(
	persist(
		(set, get) => ({
			recycled: [],
			removed: [],
			positions: {},
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
					positions: Object.fromEntries(
						Object.entries(s.positions).filter(
							([id]) => !ids.includes(id),
						),
					),
				})),

			setPositions: (positions) =>
				set((s) => ({ positions: { ...s.positions, ...positions } })),
		}),
		{
			name: 'desktop',
			version: 1,
			// Per tab and cleared when it closes, so every visit starts with a
			// fresh desktop.
			storage: createJSONStorage(() => sessionStorage),
			partialize: ({ recycled, removed, positions }) => ({
				recycled,
				removed,
				positions,
			}),
			// The server can't see sessionStorage, so render the default desktop
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
	return useMemo(
		() =>
			DESKTOP_ITEMS.filter(
				(item) =>
					!removed.includes(item.id) &&
					!recycled.some((r) => r.id === item.id),
			),
		[recycled, removed],
	);
};
