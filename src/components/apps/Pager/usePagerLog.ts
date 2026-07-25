import { useEffect, useRef, useState } from 'react';
import type { BeepKind } from '../../../hooks/useBeep';
import {
  PAGER_CONTACT_FIELD_MAX_LENGTH,
  PAGER_CONTACT_STORAGE_KEY,
  PAGER_LOG_LIMIT,
  PAGER_LOG_STORAGE_KEY,
  PAGER_MESSAGE_MAX_LENGTH,
} from '../../../constants';
import { sendPagerEmail } from '../../../utils/sendPagerEmail';

export interface PagerLogEntry {
  who: 'you' | 'me' | 'sys';
  text: string;
  at: string;
}

export type PagerSendStatus = 'idle' | 'sending' | 'sent' | 'error';

interface PagerContact {
  name: string;
  contact: string;
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

function loadContact(): PagerContact {
  try {
    const raw = window.localStorage.getItem(PAGER_CONTACT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PagerContact) : { name: '', contact: '' };
  } catch {
    return { name: '', contact: '' };
  }
}

function saveContact(value: PagerContact): void {
  try {
    window.localStorage.setItem(PAGER_CONTACT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // storage unavailable — the in-memory fields still work for this session
  }
}

function stamp(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/** Log persists to localStorage, replies are scripted, and each sent message is also relayed
 * to email via EmailJS (client-side only — see sendPagerEmail), along with whatever contact
 * info the visitor left, so a reply is actually possible. Name/contact persist across reloads
 * too, so a returning visitor doesn't have to retype them for every message. */
export function usePagerLog(replies: string[], beep: (kind: BeepKind) => void) {
  const [log, setLog] = useState<PagerLogEntry[]>(() => loadLog());
  const [input, setInput] = useState('');
  const [name, setNameState] = useState(() => loadContact().name);
  const [contact, setContactState] = useState(() => loadContact().contact);
  const [typing, setTyping] = useState(false);
  const [sendStatus, setSendStatus] = useState<PagerSendStatus>('idle');
  const replyTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

  function setName(value: string): void {
    setNameState(value);
    saveContact({ name: value, contact });
  }

  function setContact(value: string): void {
    setContactState(value);
    saveContact({ name, contact: value });
  }

  function send(): void {
    const text = input.trim().slice(0, PAGER_MESSAGE_MAX_LENGTH);
    const contactValue = contact.trim().slice(0, PAGER_CONTACT_FIELD_MAX_LENGTH);
    if (!text || !contactValue) {
      beep('error');
      return;
    }
    const next = [...log, { who: 'you' as const, text, at: stamp() }];
    setLog(next);
    saveLog(next);
    setInput('');
    setTyping(true);
    beep('click');

    setSendStatus('sending');
    const nameValue = name.trim().slice(0, PAGER_CONTACT_FIELD_MAX_LENGTH);
    void sendPagerEmail(text, { name: nameValue, email: contactValue }).then((ok) =>
      setSendStatus(ok ? 'sent' : 'error'),
    );

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

  return { log, input, setInput, name, setName, contact, setContact, typing, sendStatus, send };
}
