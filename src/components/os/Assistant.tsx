import clsx from 'clsx';
import { useSystemStore } from '../../store/system';
import { useWindowManagerStore } from '../../store/windowManager';
import { useT } from '../../i18n';
import { useBeep } from '../../hooks/useBeep';
import { useIsMobile } from '../../hooks/useMediaQuery';
import styles from './Assistant.module.css';

export function Assistant() {
  const t = useT();
  const beep = useBeep();
  const isMobile = useIsMobile();
  const assistantMuted = useSystemStore((s) => s.assistantMuted);
  const dismissAssistant = useSystemStore((s) => s.dismissAssistant);
  const toggleAssistantMuted = useSystemStore((s) => s.toggleAssistantMuted);
  const open = useWindowManagerStore((s) => s.open);

  function handleOption(index: number) {
    dismissAssistant();
    if (index === 0) open('pager');
    else if (index === 1) open('projects');
    else if (index === 2) open('computer');
    else beep('close');
  }

  function handleClose() {
    dismissAssistant();
    beep('close');
  }

  return (
    <div className={clsx(styles.root, isMobile && styles.rootMobile)}>
      <div className={styles.bubble}>
        <button type="button" className={styles.close} onClick={handleClose} aria-label="Close">
          ✕
        </button>
        <div className={styles.text}>{t.assistant.text}</div>
        <div className={styles.options}>
          {t.assistant.options.map((label, i) => (
            <button
              key={label}
              type="button"
              className={styles.option}
              onClick={() => handleOption(i)}
            >
              <div className={styles.optionMark} />
              <div className={styles.optionLabel}>{label}</div>
            </button>
          ))}
        </div>
        <button type="button" className={styles.muteRow} onClick={toggleAssistantMuted}>
          <div className={styles.muteBox}>{assistantMuted ? '✓' : ''}</div>
          <div className={styles.muteLabel}>{t.assistant.mute}</div>
        </button>
        <div className={styles.tail} />
      </div>

      <div className={styles.figure}>
        <div className={`${styles.coil} ${styles.coil1}`} />
        <div className={`${styles.coil} ${styles.coil2}`} />
        <div className={`${styles.coil} ${styles.coil3}`} />
        <div className={styles.shadow} />
        <div className={styles.eyes}>
          <div className={styles.eye}>
            <div className={styles.pupil} />
          </div>
          <div className={styles.eye}>
            <div className={styles.pupil} />
          </div>
        </div>
      </div>
    </div>
  );
}
