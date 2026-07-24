import clsx from 'clsx';
import { useT } from '../../i18n';
import { useBeep } from '../../hooks/useBeep';
import { useWindowManagerStore, windowId } from '../../store/windowManager';
import styles from './ShutdownDialog.module.css';

export function ShutdownDialog() {
  const t = useT();
  const beep = useBeep();
  const close = useWindowManagerStore((s) => s.close);
  const closeAll = useWindowManagerStore((s) => s.closeAll);
  const open = useWindowManagerStore((s) => s.open);

  function restart() {
    beep('ok');
    closeAll();
    window.setTimeout(() => open('projects'), 260);
  }

  function cancel() {
    close(windowId('shut'));
  }

  return (
    <div className={styles.pane}>
      <div className={styles.body}>
        <div className={styles.icon}>?</div>
        <div className={styles.text}>{t.shutText}</div>
      </div>
      <div className={styles.actions}>
        <button type="button" className={clsx(styles.button, 'bevel-raised')} onClick={restart}>
          {t.shutBtns[0]}
        </button>
        <button type="button" className={clsx(styles.button, 'bevel-raised')} onClick={cancel}>
          {t.shutBtns[1]}
        </button>
      </div>
    </div>
  );
}
