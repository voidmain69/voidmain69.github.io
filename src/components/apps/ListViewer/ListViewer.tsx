import { useT } from '../../../i18n';
import { useBeep } from '../../../hooks/useBeep';
import styles from './ListViewer.module.css';

interface ListViewerProps {
  kind: 'computer' | 'network';
}

export function ListViewer({ kind }: ListViewerProps) {
  const t = useT();
  const beep = useBeep();
  const groups = kind === 'computer' ? t.drives : t.network;

  return (
    <div className={styles.pane}>
      {groups.map((group) => (
        <div key={group.name} className={styles.group}>
          <div className={styles.groupHeader}>{group.name}</div>
          {group.rows.map((row) => (
            <button
              key={row.k}
              type="button"
              className={styles.row}
              onClick={() => {
                if (row.url) window.open(row.url, '_blank', 'noopener,noreferrer');
                else beep('click');
              }}
            >
              <div className={styles.rowKey}>{row.k}</div>
              <div>{row.v}</div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
