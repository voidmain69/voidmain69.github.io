import { useEffect, useRef, useState } from 'react';
import type { BeepKind } from '../../../hooks/useBeep';
import { PAGER_LOG_LIMIT, PAGER_LOG_STORAGE_KEY } from '../../../constants';

export interface PagerLogEntry {
  who: 'you' | 'me' | 'sys';
  text: string;
  at: string;
}

function loadLog(): PagerLogEntry[] {
  try {
    const raw = window.localStorage.getItem(PAGER_LOG_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PagerLogEntry[]) : [];
  } catch {
    return [];
  }
}

function saveLog(log: PagerLogEntry[]): void {
  try {
    window.localStorage.setItem(PAGER_LOG_STORAGE_KEY, JSON.stringify(log.slice(-PAGER_LOG_LIMIT)));
  } catch {
    // storage unavailable — the in-memory log still works for this session
  }
}

function stamp(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/** Client-only demo chat: log persists to localStorage, replies are scripted, nothing is sent anywhere. */
export function usePagerLog(replies: string[], beep: (kind: BeepKind) => void) {
  const [log, setLog] = useState<PagerLogEntry[]>(() => loadLog());
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const replyTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

  function send(): void {
    const text = input.trim();
    if (!text) {
      beep('error');
      return;
    }
    const next = [...log, { who: 'you' as const, text, at: stamp() }];
    setLog(next);
    saveLog(next);
    setInput('');
    setTyping(true);
    beep('click');

    window.clearTimeout(replyTimer.current);
    replyTimer.current = window.setTimeout(() => {
      const sentCount = next.filter((m) => m.who === 'you').length;
      const reply = replies[Math.min(sentCount - 1, replies.length - 1)] ?? '';
      const withReply = [...next, { who: 'me' as const, text: reply, at: stamp() }];
      setLog(withReply);
      saveLog(withReply);
      setTyping(false);
      beep('uhoh');
    }, 1400);
  }

  return { log, input, setInput, typing, send };
}
