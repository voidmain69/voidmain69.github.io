import type { ComponentType } from 'react';
import type { WindowKind } from '../types/window';
import {
  ComputerGlyph,
  MineGlyph,
  NetworkGlyph,
  PagerGlyph,
  TrashGlyph,
  type GlyphProps,
} from '../components/os/icons/DesktopGlyphs';

/** Order matches the desktop icon grid. */
export const DESKTOP_ICON_KEYS: readonly WindowKind[] = [
  'projects',
  'readme',
  'computer',
  'terminal',
  'network',
  'resume',
  'trash',
  'pager',
  'mine',
];

interface IconArt {
  color1: string;
  color2: string;
}

/** Two-tone "floppy icon" art per window kind — desktop icons and window titlebars both use it. */
export const ICON_ART: Record<WindowKind, IconArt> = {
  projects: { color1: '#e0c46a', color2: '#b08c22' },
  readme: { color1: '#f2f0ea', color2: '#b4afa5' },
  computer: { color1: '#b9bfc4', color2: '#7d858c' },
  terminal: { color1: '#2b3230', color2: '#0b0f0c' },
  network: { color1: '#8fc0a9', color2: '#4d8f74' },
  resume: { color1: '#e2a09a', color2: '#b7524a' },
  trash: { color1: '#c7cbcc', color2: '#8b9092' },
  doc: { color1: '#f2f0ea', color2: '#b4afa5' },
  help: { color1: '#e0a527', color2: '#a9760f' },
  shut: { color1: '#c4562f', color2: '#8c3a1d' },
  mine: { color1: '#4b5a52', color2: '#222c27' },
  pager: { color1: '#8fe0b0', color2: '#2f9e5a' },
};

/** Detailed desktop-icon art for these five kinds; every other `WindowKind` keeps the plain
 * two-tone tag glyph above. Window titlebars/taskbar/Start menu still use `ICON_ART` as-is. */
export const DESKTOP_ICON_GLYPHS: Partial<Record<WindowKind, ComponentType<GlyphProps>>> = {
  computer: ComputerGlyph,
  network: NetworkGlyph,
  mine: MineGlyph,
  pager: PagerGlyph,
  trash: TrashGlyph,
};

export const WINDOW_SIZES: Record<WindowKind, { w: number; h: number }> = {
  projects: { w: 620, h: 400 },
  readme: { w: 560, h: 430 },
  computer: { w: 720, h: 440 },
  terminal: { w: 620, h: 380 },
  network: { w: 680, h: 330 },
  resume: { w: 540, h: 380 },
  trash: { w: 560, h: 300 },
  doc: { w: 760, h: 560 },
  shut: { w: 430, h: 200 },
  mine: { w: 306, h: 420 },
  pager: { w: 660, h: 430 },
  help: { w: 560, h: 400 },
};
