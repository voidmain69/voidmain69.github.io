import type { WindowKind } from '../../types/window';

const PANE_BACKGROUND: Partial<Record<WindowKind, string>> = {
  projects: '#ffffff',
  terminal: '#0b0f0c',
};

export function paneBackgroundFor(kind: WindowKind): string {
  return PANE_BACKGROUND[kind] ?? '#d6d2ca';
}
