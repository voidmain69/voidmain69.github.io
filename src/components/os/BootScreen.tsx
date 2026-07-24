import { useEffect, useRef, useState } from 'react';
import { useT } from '../../i18n';
import { useBeep } from '../../hooks/useBeep';
import { useWindowManagerStore } from '../../store/windowManager';
import styles from './BootScreen.module.css';

const STEP_MS = 210;
const EXTRA_STEPS = 3;

interface BootScreenProps {
  onDone: () => void;
}

export function BootScreen({ onDone }: BootScreenProps) {
  const t = useT();
  const beep = useBeep();
  const open = useWindowManagerStore((s) => s.open);
  const [step, setStep] = useState(0);
  const finishedRef = useRef(false);

  const totalSteps = t.boot.length + EXTRA_STEPS;

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    beep('ok');
    open('projects');
    onDone();
  }

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => {
        if (s + 1 >= totalSteps) {
          clearInterval(id);
          finish();
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onKey() {
      finish();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shown = t.boot.slice(0, step);
  const percent = Math.min(100, Math.round((step / totalSteps) * 100));

  return (
    <div className={styles.screen} onClick={finish}>
      {shown.map((line, i) => (
        <div key={i} className={styles.line}>
          {line}
        </div>
      ))}
      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${percent}%` }} />
      </div>
      <div className={styles.skip}>{t.bootSkip}</div>
    </div>
  );
}
