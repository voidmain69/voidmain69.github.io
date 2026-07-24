import { useSystemStore } from '../../store/system';
import { useWindowManagerStore } from '../../store/windowManager';
import { useT } from '../../i18n';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { DESKTOP_ICON_KEYS } from '../../data/desktop-icons';
import { DesktopIcon } from './DesktopIcon';
import { Window } from './Window';
import { AppBody } from '../apps/AppBody';
import { paneBackgroundFor } from '../apps/pane-background';
import styles from './Desktop.module.css';

const WALLPAPER_VAR = {
  teal: 'var(--wallpaper-teal)',
  graphite: 'var(--wallpaper-graphite)',
  plum: 'var(--wallpaper-plum)',
};

export function Desktop() {
  const t = useT();
  const wallpaper = useSystemStore((s) => s.wallpaper);
  const selectedIcon = useSystemStore((s) => s.selectedIcon);
  const selectIcon = useSystemStore((s) => s.selectIcon);
  const windows = useWindowManagerStore((s) => s.windows);
  const open = useWindowManagerStore((s) => s.open);
  const isMobile = useIsMobile();

  const iconDefs = t.icons;

  return (
    <div className={styles.root}>
      <div className={styles.wallpaper} style={{ background: WALLPAPER_VAR[wallpaper] }} />
      <div className={styles.scanlines} />

      {isMobile ? (
        <div className={styles.iconsMobile}>
          <div className={styles.mobileNote}>{t.mobileNote}</div>
          <div className={styles.mobileGrid}>
            {DESKTOP_ICON_KEYS.map((key) => {
              const def = iconDefs.find((i) => i.key === key);
              if (!def) return null;
              return (
                <DesktopIcon
                  key={key}
                  iconKey={key}
                  label={def.label}
                  tag={def.tag}
                  variant="mobile"
                  onOpen={() => open(key)}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.iconsDesktop}>
          {DESKTOP_ICON_KEYS.map((key) => {
            const def = iconDefs.find((i) => i.key === key);
            if (!def) return null;
            return (
              <DesktopIcon
                key={key}
                iconKey={key}
                label={def.label}
                tag={def.tag}
                variant="desktop"
                selected={selectedIcon === key}
                onOpen={() => open(key)}
                onSelect={() => selectIcon(key)}
              />
            );
          })}
        </div>
      )}

      {windows.map((win) => (
        <Window key={win.id} win={win} paneBackground={paneBackgroundFor(win.kind)}>
          <AppBody win={win} />
        </Window>
      ))}
    </div>
  );
}
