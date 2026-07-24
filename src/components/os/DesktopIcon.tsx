import clsx from 'clsx';
import type { WindowKind } from '../../types/window';
import { ICON_ART } from '../../data/desktop-icons';
import styles from './DesktopIcon.module.css';

interface DesktopIconProps {
  iconKey: WindowKind;
  label: string;
  tag: string;
  variant: 'desktop' | 'mobile';
  selected?: boolean;
  onOpen: () => void;
  onSelect?: () => void;
}

export function DesktopIcon({
  iconKey,
  label,
  tag,
  variant,
  selected = false,
  onOpen,
  onSelect,
}: DesktopIconProps) {
  const art = ICON_ART[iconKey];
  const isMobile = variant === 'mobile';

  return (
    <div
      className={clsx(styles.tile, isMobile && styles.tileMobile, selected && styles.selected)}
      onDoubleClick={isMobile ? undefined : onOpen}
      onClick={isMobile ? onOpen : onSelect}
    >
      <div
        className={clsx(styles.glyph, isMobile && styles.glyphMobile)}
        style={{ background: art.color1 }}
      >
        <div className={styles.glyphBar} style={{ background: art.color2 }} />
        <div className={styles.glyphTag}>{tag}</div>
      </div>
      <div
        className={clsx(styles.label, isMobile && styles.labelMobile, selected && styles.selected)}
      >
        {label}
      </div>
    </div>
  );
}
