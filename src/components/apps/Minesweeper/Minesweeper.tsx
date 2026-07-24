import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useT } from '../../../i18n';
import { useBeep } from '../../../hooks/useBeep';
import { createBoard, reveal, toggleFlag, countFlags, type MineBoard } from './board';
import { MINE_COUNT } from '../../../constants';
import styles from './Minesweeper.module.css';

const NUMBER_COLORS = [
  '',
  '#1c3f8f',
  '#2f7a44',
  '#c4562f',
  '#3a2f7a',
  '#8c3a1d',
  '#157e77',
  '#17150f',
  '#6b665c',
];

export function Minesweeper() {
  const t = useT();
  const beep = useBeep();
  const [board, setBoard] = useState<MineBoard>(() => createBoard());
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [endedAt, setEndedAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!startedAt || board.dead || board.won) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [startedAt, board.dead, board.won]);

  function handleReveal(x: number, y: number) {
    const next = reveal(board, x, y);
    if (next === board) return;
    if (!startedAt) setStartedAt(Date.now());
    if (next.dead || next.won) setEndedAt(Date.now());
    setBoard(next);
    beep(next.dead ? 'error' : next.won ? 'ok' : 'click');
  }

  function handleFlag(x: number, y: number, e: React.MouseEvent) {
    e.preventDefault();
    const next = toggleFlag(board, x, y);
    if (next === board) return;
    setBoard(next);
    beep('click');
  }

  function handleReset() {
    setBoard(createBoard());
    setStartedAt(null);
    setEndedAt(null);
    beep('open');
  }

  const flags = countFlags(board);
  const minesLeft = String(Math.max(0, MINE_COUNT - flags)).padStart(2, '0');
  const elapsed = startedAt ? Math.floor(((endedAt ?? now) - startedAt) / 1000) : 0;
  const timeLeft = String(Math.min(999, elapsed)).padStart(3, '0');
  const status = board.dead ? t.mine.lost : board.won ? t.mine.win : t.mine.idle;

  return (
    <div className={styles.pane}>
      <div className={clsx(styles.header, 'bevel-sunken')}>
        <div className={styles.counter}>
          <div className={styles.counterLabel}>{t.mine.mines}</div>
          <div className={styles.counterValue}>{minesLeft}</div>
        </div>
        <button type="button" className={clsx(styles.reset, 'bevel-raised')} onClick={handleReset}>
          {t.mine.reset}
        </button>
        <div className={styles.counter}>
          <div className={styles.counterLabel}>{t.mine.time}</div>
          <div className={styles.counterValue}>{timeLeft}</div>
        </div>
      </div>

      <div className={clsx(styles.board, 'bevel-sunken')}>
        {board.cells.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((cell, x) => (
              <button
                key={x}
                type="button"
                className={clsx(styles.cell, cell.revealed ? 'bevel-sunken' : 'bevel-raised')}
                style={{
                  background: cell.revealed
                    ? cell.mine
                      ? '#c4562f'
                      : '#cdc9c1'
                    : 'var(--bevel-face)',
                  color:
                    cell.revealed && !cell.mine
                      ? NUMBER_COLORS[cell.adjacent]
                      : 'var(--color-text)',
                }}
                onClick={() => handleReveal(x, y)}
                onContextMenu={(e) => handleFlag(x, y, e)}
              >
                {cell.revealed ? (cell.mine ? '✳' : cell.adjacent || '') : cell.flagged ? '⚑' : ''}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.status}>{status}</div>
    </div>
  );
}
