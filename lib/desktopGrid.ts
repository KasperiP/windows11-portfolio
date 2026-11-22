/**
 * The desktop icon grid, like Windows with "Align icons to grid" on: icons
 * sit in fixed cells. Unplaced icons fill rows left to right, then wrap,
 * matching this desktop's original layout.
 */

export type Cell = { col: number; row: number };
export type Grid = { cols: number; rows: number };
export type Layout = Record<string, Cell>;

export const CELL_WIDTH = 84;
export const CELL_HEIGHT = 96;
export const GRID_PADDING = 6;

export const cellKey = (cell: Cell) => `${cell.col}:${cell.row}`;

/** How many cells fit in a desktop of the given size. */
export const gridFor = (width: number, height: number): Grid => ({
	cols: Math.max(1, Math.floor((width - GRID_PADDING * 2) / CELL_WIDTH)),
	rows: Math.max(1, Math.floor((height - GRID_PADDING * 2) / CELL_HEIGHT)),
});

/** Top-left corner of a cell, relative to the desktop. */
export const cellOrigin = (cell: Cell) => ({
	x: GRID_PADDING + cell.col * CELL_WIDTH,
	y: GRID_PADDING + cell.row * CELL_HEIGHT,
});

const inGrid = (cell: Cell, grid: Grid) =>
	cell.col >= 0 &&
	cell.row >= 0 &&
	cell.col < grid.cols &&
	cell.row < grid.rows;

/** The cell whose origin is closest to a point, kept inside the grid. */
export const nearestCell = (x: number, y: number, grid: Grid): Cell => ({
	col: Math.min(
		grid.cols - 1,
		Math.max(0, Math.round((x - GRID_PADDING) / CELL_WIDTH)),
	),
	row: Math.min(
		grid.rows - 1,
		Math.max(0, Math.round((y - GRID_PADDING) / CELL_HEIGHT)),
	),
});

/** The free cell closest to `target`; `target` itself when the grid is full. */
export const nearestFreeCell = (
	target: Cell,
	occupied: Set<string>,
	grid: Grid,
): Cell => {
	let best: Cell | null = null;
	let bestDistance = Infinity;
	for (let col = 0; col < grid.cols; col++) {
		for (let row = 0; row < grid.rows; row++) {
			if (occupied.has(cellKey({ col, row }))) continue;
			const distance = (col - target.col) ** 2 + (row - target.row) ** 2;
			if (distance < bestDistance) {
				best = { col, row };
				bestDistance = distance;
			}
		}
	}
	return best ?? target;
};

/** The first free cell reading left to right, top to bottom. */
const firstFreeCell = (occupied: Set<string>, grid: Grid): Cell => {
	for (let row = 0; row < grid.rows; row++) {
		for (let col = 0; col < grid.cols; col++) {
			if (!occupied.has(cellKey({ col, row }))) return { col, row };
		}
	}
	// Grid full: stack on the last cell rather than lose the icon.
	return { col: grid.cols - 1, row: grid.rows - 1 };
};

/**
 * Places every icon: saved positions first (when they still fit on screen
 * and aren't taken), then the rest in the first free cells, row by row,
 * in the order given.
 */
export const layoutIcons = (ids: string[], saved: Layout, grid: Grid) => {
	const layout: Layout = {};
	const occupied = new Set<string>();
	const place = (id: string, cell: Cell) => {
		layout[id] = cell;
		occupied.add(cellKey(cell));
	};

	for (const id of ids) {
		const cell = saved[id];
		if (cell && inGrid(cell, grid) && !occupied.has(cellKey(cell))) {
			place(id, cell);
		}
	}
	for (const id of ids) {
		if (layout[id]) continue;
		place(id, firstFreeCell(occupied, grid));
	}
	return layout;
};

/**
 * Moves a group of icons by a whole number of cells, keeping their
 * arrangement. Icons that would land outside the grid or on another icon
 * go to the nearest free cell instead. `ids` should start with the icon
 * the pointer grabbed, so it gets its exact target.
 */
export const moveIcons = (
	layout: Layout,
	ids: string[],
	delta: Cell,
	grid: Grid,
): Layout => {
	const next: Layout = { ...layout };
	const occupied = new Set(
		Object.entries(layout)
			.filter(([id]) => !ids.includes(id))
			.map(([, cell]) => cellKey(cell)),
	);
	for (const id of ids) {
		const want = {
			col: layout[id].col + delta.col,
			row: layout[id].row + delta.row,
		};
		const cell =
			inGrid(want, grid) && !occupied.has(cellKey(want))
				? want
				: nearestFreeCell(want, occupied, grid);
		next[id] = cell;
		occupied.add(cellKey(cell));
	}
	return next;
};
