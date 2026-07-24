import { describe, expect, it } from 'vitest';
import { createBoard, reveal, toggleFlag, countFlags } from './board';

describe('minesweeper board', () => {
  it('never places a mine in the first click or its 3x3 neighborhood', () => {
    const board = createBoard(9);
    const revealed = reveal(board, 4, 4, 9, 10);

    for (let y = 3; y <= 5; y++) {
      for (let x = 3; x <= 5; x++) {
        expect(revealed.cells[y]?.[x]?.mine).toBe(false);
      }
    }
    expect(revealed.started).toBe(true);
  });

  it('flood-fills connected zero-adjacency cells on reveal', () => {
    let board = createBoard(9);
    board = reveal(board, 0, 0, 9, 10);

    const revealedCount = board.cells.flat().filter((c) => c.revealed).length;
    expect(revealedCount).toBeGreaterThan(1);
  });

  it('wins once every non-mine cell has been revealed', () => {
    // Hand-build a 2x2 board (bypassing random placement) so the win threshold is exact and deterministic.
    let board = createBoard(2);
    board.started = true;
    board.cells[0]![0]!.mine = true;
    board.cells[0]![1]!.adjacent = 1;
    board.cells[1]![0]!.adjacent = 1;
    board.cells[1]![1]!.adjacent = 1;

    board = reveal(board, 1, 0, 2, 1);
    board = reveal(board, 0, 1, 2, 1);
    expect(board.won).toBe(false);

    board = reveal(board, 1, 1, 2, 1);
    expect(board.won).toBe(true);
    expect(board.dead).toBe(false);
  });

  it('a losing reveal marks the board dead and reveals every mine', () => {
    let board = createBoard(2);
    board.started = true;
    board.cells[0]![0]!.mine = true;

    board = reveal(board, 0, 0, 2, 1);
    expect(board.dead).toBe(true);
    expect(board.cells[0]![0]!.revealed).toBe(true);
  });

  it('reveal() is a no-op on an already-revealed or flagged cell', () => {
    let board = createBoard(9);
    board = reveal(board, 4, 4, 9, 10);
    const again = reveal(board, 4, 4, 9, 10);
    expect(again).toBe(board);

    const fresh = createBoard(9);
    const flagged = toggleFlag(fresh, 0, 0);
    const afterReveal = reveal(flagged, 0, 0, 9, 10);
    expect(afterReveal).toBe(flagged);
  });

  it('toggleFlag blocks flagging an already-revealed cell', () => {
    const board = createBoard(9);
    const revealed = reveal(board, 4, 4, 9, 10);
    const next = toggleFlag(revealed, 4, 4);
    expect(next).toBe(revealed);
  });

  it('toggleFlag flips the flag on a hidden cell and countFlags reflects it', () => {
    const board = createBoard(9);
    const flagged = toggleFlag(board, 0, 0);
    expect(flagged.cells[0]?.[0]?.flagged).toBe(true);
    expect(countFlags(flagged)).toBe(1);

    const unflagged = toggleFlag(flagged, 0, 0);
    expect(unflagged.cells[0]?.[0]?.flagged).toBe(false);
    expect(countFlags(unflagged)).toBe(0);
  });
});
