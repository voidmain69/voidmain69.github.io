import clsx from 'clsx';
import { useSystemStore } from '../../store/system';
import { useWindowManagerStore } from '../../store/windowManager';
import { useT } from '../../i18n';
import { useBeep } from '../../hooks/useBeep';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { DESKTOP_ICON_GLYPHS, ICON_ART } from '../../data/desktop-icons';
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
  const isMobile = useIsMobile();

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
          const ItemGlyph = DESKTOP_ICON_GLYPHS[item.key as WindowKind];
          return (
            <div
              key={item.key}
              className={clsx(
                styles.item,
                isOpen && styles.itemOpen,
                isMobile && styles.itemMobile,
              )}
              onMouseEnter={() => {
                // Touch browsers can synthesize a hover on tap; only desktop should hover-preview.
                if (!isMobile) hoverStartSub(isSub ? item.key : null);
              }}
              onClick={() => {
                if (isSub) {
                  // Touch devices don't fire mouseenter reliably, so tapping toggles the flyout too.
                  hoverStartSub(startSub === item.key ? null : item.key);
                } else if (item.key === 'network') {
                  openAndClose('network');
                } else if (item.key === 'help') {
                  openAndClose('help');
                }
              }}
            >
              <div
                className={clsx(styles.itemIcon, ItemGlyph && styles.itemIconArt)}
                style={
                  ItemGlyph
                    ? undefined
                    : {
                        background:
                          (ICON_ART as Record<string, { color1: string }>)[item.key]?.color1 ??
                          '#b9bfc4',
                      }
                }
              >
                {ItemGlyph && <ItemGlyph className={styles.itemIconSvg} />}
              </div>
              <div className={styles.itemLabel}>{item.label}</div>
              <div className={styles.itemArrow}>{item.arrow}</div>

              {isOpen && item.key === 'programs' && (
                <div className={clsx(styles.flyout, isMobile && styles.flyoutMobile)}>
                  {t.programs.map((p) => {
                    const FlyoutGlyph = DESKTOP_ICON_GLYPHS[p.key as WindowKind];
                    return (
                      <button
                        key={p.key}
                        type="button"
                        className={styles.flyoutItem}
                        onClick={() => openAndClose(p.key as WindowKind)}
                      >
                        <div
                          className={clsx(styles.flyoutIcon, FlyoutGlyph && styles.flyoutIconArt)}
                          style={
                            FlyoutGlyph
                              ? undefined
                              : { background: ICON_ART[p.key as WindowKind].color1 }
                          }
                        >
                          {FlyoutGlyph && <FlyoutGlyph className={styles.flyoutIconSvg} />}
                        </div>
                        <div>{p.label}</div>
                      </button>
                    );
                  })}
                </div>
              )}

              {isOpen && item.key === 'documents' && (
                <div className={clsx(styles.flyout, isMobile && styles.flyoutMobile)}>
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
