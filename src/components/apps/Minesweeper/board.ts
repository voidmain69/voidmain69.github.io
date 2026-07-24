import { MINE_BOARD_SIZE, MINE_COUNT } from '../../../constants';

export interface MineCell {
  mine: boolean;
  adjacent: number;
  revealed: boolean;
  flagged: boolean;
}

export interface MineBoard {
  cells: MineCell[][];
  started: boolean;
  dead: boolean;
  won: boolean;
}

function emptyCell(): MineCell {
  return { mine: false, adjacent: 0, revealed: false, flagged: false };
}

export function createBoard(size: number = MINE_BOARD_SIZE): MineBoard {
  const cells: MineCell[][] = [];
  for (let y = 0; y < size; y++) {
    const row: MineCell[] = [];
    for (let x = 0; x < size; x++) row.push(emptyCell());
    cells.push(row);
  }
  return { cells, started: false, dead: false, won: false };
}

function cloneBoard(board: MineBoard): MineBoard {
  return { ...board, cells: board.cells.map((row) => row.map((cell) => ({ ...cell }))) };
}

function placeMines(
  board: MineBoard,
  safeX: number,
  safeY: number,
  size: number,
  count: number,
): void {
  let placed = 0;
  while (placed < count) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    const cell = board.cells[y]?.[x];
    if (!cell || cell.mine) continue;
    if (Math.abs(x - safeX) <= 1 && Math.abs(y - safeY) <= 1) continue;
    cell.mine = true;
    placed++;
  }
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let count2 = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (board.cells[y + dy]?.[x + dx]?.mine) count2++;
        }
      }
      const cell = board.cells[y]?.[x];
      if (cell) cell.adjacent = count2;
    }
  }
}

/** Reveals a cell (flood-filling zero-adjacency neighbors). Mines are placed lazily on the
 * first reveal, excluding the clicked cell's 3x3 neighborhood, so the first click never loses. */
export function reveal(
  board: MineBoard,
  x: number,
  y: number,
  size: number = MINE_BOARD_SIZE,
  mineCount: number = MINE_COUNT,
): MineBoard {
  const startCell = board.cells[y]?.[x];
  if (board.dead || board.won || !startCell || startCell.flagged || startCell.revealed)
    return board;

  const next = cloneBoard(board);
  if (!next.started) {
    next.started = true;
    placeMines(next, x, y, size, mineCount);
  }

  const stack: Array<[number, number]> = [[x, y]];
  while (stack.length > 0) {
    const point = stack.pop();
    if (!point) continue;
    const [cx, cy] = point;
    const cell = next.cells[cy]?.[cx];
    if (!cell || cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.mine) {
      next.dead = true;
      break;
    }
    if (cell.adjacent === 0) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = cx + dx;
          const ny = cy + dy;
          if (next.cells[ny]?.[nx] && !next.cells[ny]?.[nx]?.revealed) stack.push([nx, ny]);
        }
      }
    }
  }

  if (next.dead) {
    for (const row of next.cells) for (const cell of row) if (cell.mine) cell.revealed = true;
  } else {
    let hidden = 0;
    for (const row of next.cells) for (const cell of row) if (!cell.revealed) hidden++;
    if (hidden === mineCount) next.won = true;
  }

  return next;
}

export function toggleFlag(board: MineBoard, x: number, y: number): MineBoard {
  const cell = board.cells[y]?.[x];
  if (board.dead || board.won || !cell || cell.revealed) return board;
  const next = cloneBoard(board);
  const target = next.cells[y]?.[x];
  if (target) target.flagged = !target.flagged;
  return next;
}

export function countFlags(board: MineBoard): number {
  let flags = 0;
  for (const row of board.cells) for (const cell of row) if (cell.flagged) flags++;
  return flags;
}
