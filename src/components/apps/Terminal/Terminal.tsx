import { useRef, useState } from 'react';
import { useSystemStore } from '../../../store/system';
import { useWindowManagerStore } from '../../../store/windowManager';
import { useT } from '../../../i18n';
import { useBeep } from '../../../hooks/useBeep';
import { runCommand } from './commands';
import styles from './Terminal.module.css';

const HISTORY_LIMIT = 120;

export function Terminal() {
  const t = useT();
  const lang = useSystemStore((s) => s.lang);
  const toggleLang = useSystemStore((s) => s.toggleLang);
  const crash = useSystemStore((s) => s.crash);
  const openWindow = useWindowManagerStore((s) => s.open);
  const beep = useBeep();
  const [history, setHistory] = useState<string[]>(() => t.termHello.slice());
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function submit() {
    const cmd = input.trim();
    if (!cmd) {
      setInput('');
      return;
    }
    const lower = cmd.toLowerCase();
    if (lower === 'clear' || lower === 'cls') {
      setHistory(t.termHello.slice());
      setInput('');
      return;
    }

    const result = runCommand(cmd, lang);
    const echo = 'C:\\> ' + cmd;
    setHistory((h) => [...h, echo, ...result.lines].slice(-HISTORY_LIMIT));
    setInput('');
    if (result.beep) beep(result.beep);
    if (result.effect) {
      const effect = result.effect;
      window.setTimeout(() => {
        if (effect.type === 'open') openWindow(effect.kind, effect.key);
        else if (effect.type === 'toggle-lang') toggleLang();
        else crash(effect.command);
      }, effect.delayMs);
    }
  }

  return (
    <div className={styles.pane} onClick={() => inputRef.current?.focus()}>
      {history.map((line, i) => (
        <div key={i} className={styles.line}>
          {line}
        </div>
      ))}
      <div className={styles.inputRow}>
        <div className={styles.prompt}>C:\&gt;</div>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
          }}
          spellCheck={false}
          className={styles.input}
        />
      </div>
    </div>
  );
}
