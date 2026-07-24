import clsx from 'clsx';
import { useSystemStore } from '../../store/system';
import { useWindowManagerStore } from '../../store/windowManager';
import { useT } from '../../i18n';
import { useBeep } from '../../hooks/useBeep';
import { ICON_ART } from '../../data/desktop-icons';
import { projects } from '../../data/projects';
import type { WindowKind } from '../../types/window';
import styles from './StartMenu.module.css';

export function StartMenu() {
  const t = useT();
  const lang = useSystemStore((s) => s.lang);
  const startSub = useSystemStore((s) => s.startSub);
  const hoverStartSub = useSystemStore((s) => s.hoverStartSub);
  const closeStart = useSystemStore((s) => s.closeStart);
  const open = useWindowManagerStore((s) => s.open);
  const beep = useBeep();

  function openAndClose(kind: WindowKind, key?: string) {
    open(kind, key);
    closeStart();
    beep('click');
  }

  return (
    <div className={styles.menu} data-start>
      <div className={styles.spine}>
        <div className={styles.spineLabel}>{t.osName}</div>
      </div>
      <div className={styles.items}>
        {t.startItems.map((item) => {
          const isSub = item.key === 'programs' || item.key === 'documents';
          const isOpen = startSub === item.key;
          return (
            <div
              key={item.key}
              className={clsx(styles.item, isOpen && styles.itemOpen)}
              onMouseEnter={() => hoverStartSub(isSub ? item.key : null)}
              onClick={() => {
                if (!isSub) {
                  if (item.key === 'network') openAndClose('network');
                  else if (item.key === 'help') openAndClose('help');
                }
              }}
            >
              <div
                className={styles.itemIcon}
                style={{
                  background:
                    (ICON_ART as Record<string, { color1: string }>)[item.key]?.color1 ?? '#b9bfc4',
                }}
              />
              <div className={styles.itemLabel}>{item.label}</div>
              <div className={styles.itemArrow}>{item.arrow}</div>

              {isOpen && item.key === 'programs' && (
                <div className={styles.flyout}>
                  {t.programs.map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      className={styles.flyoutItem}
                      onClick={() => openAndClose(p.key as WindowKind)}
                    >
                      <div
                        className={styles.flyoutIcon}
                        style={{ background: ICON_ART[p.key as WindowKind].color1 }}
                      />
                      <div>{p.label}</div>
                    </button>
                  ))}
                </div>
              )}

              {isOpen && item.key === 'documents' && (
                <div className={styles.flyout}>
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      className={styles.flyoutItem}
                      onClick={() => openAndClose('doc', project.id)}
                    >
                      <div className={styles.flyoutIcon} style={{ background: project.color1 }} />
                      <div>{project[lang].file}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className={styles.divider} />

        <button type="button" className={styles.shutdown} onClick={() => openAndClose('shut')}>
          <div className={styles.shutdownIcon} />
          <div>{t.shutdown}</div>
        </button>
      </div>
    </div>
  );
}
