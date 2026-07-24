import clsx from 'clsx';
import { useT } from '../../../i18n';
import { useBeep } from '../../../hooks/useBeep';
import { useIsMobile } from '../../../hooks/useMediaQuery';
import { usePagerLog } from './usePagerLog';
import { pagerStatus, PAGER_STATUS_DOT } from '../../../utils/pagerStatus';
import styles from './Pager.module.css';

export function Pager() {
  const t = useT();
  const beep = useBeep();
  const isMobile = useIsMobile();
  const { log, input, setInput, typing, send } = usePagerLog(t.pager.replies, beep);
  const status = pagerStatus();
  const displayLog = log.length > 0 ? log : [{ who: 'sys' as const, text: t.pager.hello, at: '' }];

  return (
    <div className={clsx(styles.pane, isMobile && styles.paneMobile)}>
      <div className={clsx(styles.sidebar, isMobile && styles.sidebarMobile)}>
        <div className={styles.selfCard}>
          <div className={styles.dot} style={{ background: PAGER_STATUS_DOT[status] }} />
          <div className={styles.selfInfo}>
            <div className={styles.nick}>{t.pager.nick}</div>
            <div className={styles.status}>{t.pager.statuses[status]}</div>
          </div>
        </div>

        <div className={clsx(styles.contactList, 'bevel-sunken')}>
          <div className={styles.contactSelf}>
            <div className={styles.dotSmall} style={{ background: PAGER_STATUS_DOT[status] }} />
            <div className={styles.contactLabel}>{t.pager.nick}</div>
          </div>
          {t.pager.contacts.map((c) => (
            <button
              key={c.url}
              type="button"
              className={styles.contactRow}
              onClick={() => window.open(c.url, '_blank', 'noopener,noreferrer')}
            >
              <div className={styles.dotSmall} />
              <div className={styles.contactLabel}>{c.label}</div>
            </button>
          ))}
        </div>

        <div className={styles.note}>{t.pager.note}</div>
      </div>

      <div className={clsx(styles.main, isMobile && styles.mainMobile)}>
        <div className={clsx(styles.log, 'bevel-sunken')}>
          {displayLog.map((m, i) => (
            <div key={i} className={styles.entry}>
              <div
                className={styles.entryHead}
                style={{
                  color: m.who === 'you' ? '#1c3f8f' : m.who === 'me' ? '#2f7a44' : '#8a5a12',
                }}
              >
                {m.who === 'you' ? t.pager.you : m.who === 'me' ? t.pager.me : t.pager.sys}
                {m.at ? `  ${m.at}` : ''}
              </div>
              <div className={styles.entryText}>{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className={styles.typing}>
              {t.pager.nick} {t.pager.typing}
            </div>
          )}
        </div>

        <div className={clsx(styles.composer, isMobile && styles.composerMobile)}>
          <textarea
            className={clsx(styles.textarea, 'bevel-sunken')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={t.pager.placeholder}
          />
          <div className={clsx(styles.composerActions, isMobile && styles.composerActionsMobile)}>
            <button
              type="button"
              className={clsx(styles.sendButton, 'bevel-raised')}
              onClick={send}
            >
              {t.pager.send}
            </button>
            <a
              className={clsx(
                styles.mailButton,
                isMobile && styles.mailButtonMobile,
                'bevel-raised',
              )}
              href="mailto:hello@example.com"
            >
              {t.pager.mail}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
