import { useEffect } from 'react';
import { useSystemStore } from '../../store/system';
import { useT } from '../../i18n';
import styles from './BSOD.module.css';

interface BSODProps {
  onReboot: () => void;
}

/** Easter egg: typing a classic "don't run this" command in the Terminal ends up here. */
export function BSOD({ onReboot }: BSODProps) {
  const t = useT();
  const command = useSystemStore((s) => s.crashCommand);

  useEffect(() => {
    window.addEventListener('keydown', onReboot);
    return () => window.removeEventListener('keydown', onReboot);
  }, [onReboot]);

  return (
    <div className={styles.screen} onClick={onReboot}>
      <div className={styles.heading}>{t.bsod.heading}</div>
      {command && (
        <div className={styles.commandLine}>
          {t.bsod.commandLabel} <span className={styles.commandValue}>{command}</span>
        </div>
      )}
      <div className={styles.body}>
        <div>{t.bsod.intro}</div>
        <div>{t.bsod.warning}</div>
      </div>
      <div className={styles.stopCode}>{t.bsod.stopCode}</div>
      <div className={styles.footer}>{t.bsod.footer}</div>
    </div>
  );
}
