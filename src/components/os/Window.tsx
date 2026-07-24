import { useEffect, useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import type { WindowState } from '../../types/window';
import { useWindowManagerStore } from '../../store/windowManager';
import { useSystemStore } from '../../store/system';
import { useT } from '../../i18n';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useViewportSize } from '../../hooks/useViewportSize';
import { useBeep } from '../../hooks/useBeep';
import { clampDragPosition, computeWindowGeometry } from '../../store/windowGeometry';
import { ICON_ART } from '../../data/desktop-icons';
import { getProject } from '../../data/projects';
import { TASKBAR_HEIGHT } from '../../constants';
import styles from './Window.module.css';

const HAS_MENU_KINDS = new Set(['doc', 'readme', 'resume', 'trash', 'help']);

interface WindowProps {
  win: WindowState;
  paneBackground?: string;
  children: ReactNode;
}

export function Window({ win, paneBackground = 'var(--bevel-face)', children }: WindowProps) {
  const windows = useWindowManagerStore((s) => s.windows);
  const focus = useWindowManagerStore((s) => s.focus);
  const close = useWindowManagerStore((s) => s.close);
  const minimize = useWindowManagerStore((s) => s.minimize);
  const toggleMaximize = useWindowManagerStore((s) => s.toggleMaximize);
  const patch = useWindowManagerStore((s) => s.patch);
  const lang = useSystemStore((s) => s.lang);
  const t = useT();
  const isMobile = useIsMobile();
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const beep = useBeep();
  const dragRef = useRef<{ offsetX: number; offsetY: number } | null>(null);

  const isTopmost = windows.every((w) => w.z <= win.z);
  const barBackground = isTopmost ? 'var(--titlebar-active)' : 'var(--titlebar-inactive)';
  const art = ICON_ART[win.kind];
  const title =
    win.kind === 'doc' ? (getProject(win.key ?? '')?.[lang].file ?? '') : t.win[win.kind];
  const hasMenu = HAS_MENU_KINDS.has(win.kind);

  const availWidth = viewportWidth;
  const availHeight = Math.max(220, viewportHeight - TASKBAR_HEIGHT);
  const geo = computeWindowGeometry({
    isMobile,
    maximized: win.maximized,
    rect: { x: win.x, y: win.y, w: win.w, h: win.h },
    availWidth,
    availHeight,
  });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragRef.current) return;
      const { x, y } = clampDragPosition(
        e.clientX - dragRef.current.offsetX,
        e.clientY - dragRef.current.offsetY,
        window.innerWidth,
        window.innerHeight,
      );
      patch(win.id, { x, y });
    }
    function onUp() {
      dragRef.current = null;
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [win.id, patch]);

  function startDrag(e: React.MouseEvent) {
    if (isMobile || win.maximized) return;
    dragRef.current = { offsetX: e.clientX - win.x, offsetY: e.clientY - win.y };
    focus(win.id);
  }

  return (
    <div
      className={styles.frame}
      style={{
        left: Math.round(geo.x),
        top: Math.round(geo.y),
        width: Math.round(geo.w),
        height: Math.round(geo.h),
        zIndex: win.z,
        display: win.minimized ? 'none' : 'flex',
      }}
      onMouseDown={() => focus(win.id)}
    >
      <div
        className={clsx(styles.titlebar, 'bevel-raised')}
        style={{ background: barBackground }}
        onMouseDown={startDrag}
        onDoubleClick={() => !isMobile && toggleMaximize(win.id)}
      >
        <div className={styles.titlebarIcon} style={{ background: art.color1 }} />
        <div className={styles.title}>{title}</div>
        <div className={styles.buttons}>
          <button
            type="button"
            className={clsx(styles.button, 'bevel-raised')}
            aria-label="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              minimize(win.id);
              beep('click');
            }}
          >
            <span className={styles.minGlyph} />
          </button>
          <button
            type="button"
            className={clsx(styles.button, 'bevel-raised')}
            aria-label="Maximize"
            onClick={(e) => {
              e.stopPropagation();
              if (!isMobile) toggleMaximize(win.id);
            }}
          >
            <span className={styles.maxGlyph} />
          </button>
          <button
            type="button"
            className={clsx(styles.button, styles.buttonClose, 'bevel-raised')}
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              close(win.id);
              beep('close');
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {hasMenu && (
        <div className={styles.menuBar}>
          {t.menu.map((item) => (
            <div key={item} className={styles.menuItem}>
              {item}
            </div>
          ))}
        </div>
      )}

      <div className={clsx(styles.pane, 'bevel-sunken')} style={{ background: paneBackground }}>
        {children}
      </div>
    </div>
  );
}
