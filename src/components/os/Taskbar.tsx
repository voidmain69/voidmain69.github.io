import clsx from 'clsx';
import { useSystemStore } from '../../store/system';
import { useWindowManagerStore } from '../../store/windowManager';
import { useT } from '../../i18n';
import { useBeep } from '../../hooks/useBeep';
import { useClock } from '../../hooks/useClock';
import { getProject } from '../../data/projects';
import { ICON_ART } from '../../data/desktop-icons';
import { pagerStatus, PAGER_STATUS_DOT } from '../../utils/pagerStatus';
import type { WindowState } from '../../types/window';
import styles from './Taskbar.module.css';

export function Taskbar() {
  const t = useT();
  const lang = useSystemStore((s) => s.lang);
  const clock24 = useSystemStore((s) => s.clock24);
  const muted = useSystemStore((s) => s.muted);
  const startOpen = useSystemStore((s) => s.startOpen);
  const toggleStart = useSystemStore((s) => s.toggleStart);
  const toggleLang = useSystemStore((s) => s.toggleLang);
  const toggleMuted = useSystemStore((s) => s.toggleMuted);
  const windows = useWindowManagerStore((s) => s.windows);
  const open = useWindowManagerStore((s) => s.open);
  const focus = useWindowManagerStore((s) => s.focus);
  const minimize = useWindowManagerStore((s) => s.minimize);
  const beep = useBeep();
  const clock = useClock(clock24);

  function taskTitle(w: WindowState): string {
    return w.kind === 'doc' ? (getProject(w.key ?? '')?.[lang].file ?? '') : t.win[w.kind];
  }

  function isTop(w: WindowState): boolean {
    return !w.minimized && windows.every((o) => o.minimized || o.z <= w.z);
  }

  function handleTaskClick(w: WindowState) {
    if (w.minimized) open(w.kind, w.key);
    else if (isTop(w)) minimize(w.id);
    else focus(w.id);
    beep('click');
  }

  return (
    <div className={styles.bar} data-start>
      <button
        type="button"
        className={clsx(styles.startButton, startOpen ? 'bevel-sunken' : 'bevel-raised')}
        onClick={() => {
          toggleStart();
          beep('click');
        }}
      >
        <div className={styles.startOrb} />
        <div>{t.start}</div>
      </button>

      <div className={styles.divider} />

      <div className={styles.tasks}>
        {windows.map((w) => {
          const top = isTop(w);
          const art = ICON_ART[w.kind];
          return (
            <button
              key={w.id}
              type="button"
              className={clsx(styles.task, top ? 'bevel-sunken' : 'bevel-raised')}
              style={{ fontWeight: top ? 700 : 400 }}
              onClick={() => handleTaskClick(w)}
            >
              <div className={styles.taskIcon} style={{ background: art.color1 }} />
              <div className={styles.taskTitle}>{taskTitle(w)}</div>
            </button>
          );
        })}
      </div>

      <div className={styles.tray}>
        <button
          type="button"
          className={styles.trayItem}
          title={t.pagerTip}
          onClick={() => {
            open('pager');
            beep('click');
          }}
        >
          <div
            className={styles.pagerDot}
            style={{ background: PAGER_STATUS_DOT[pagerStatus()] }}
          />
        </button>
        <button
          type="button"
          className={styles.trayItem}
          title="Language"
          onClick={() => {
            toggleLang();
            beep('ok');
          }}
        >
          <div className={styles.langBadge}>{lang === 'ua' ? 'UA' : 'EN'}</div>
        </button>
        <button type="button" className={styles.trayItem} onClick={toggleMuted}>
          <div className={styles.soundIcon} style={{ background: muted ? '#8b9092' : '#2f9e5a' }} />
        </button>
        <div className={styles.statusItem} title={t.statusTip}>
          <div className={styles.statusDot} />
          <div className={styles.statusText}>{t.available}</div>
        </div>
        <div className={styles.clock}>{clock}</div>
      </div>
    </div>
  );
}
