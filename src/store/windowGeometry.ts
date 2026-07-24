import { MOBILE_WINDOW_TOP_INSET } from '../constants';

/**
 * Clamps a dragged window's top-left corner so it can't be thrown fully off
 * screen. Mirrors the original design's drag bounds: up to 140px of the
 * window may hang off the left edge, and at least 90px stays reachable on
 * the right/bottom.
 */
export function clampDragPosition(
  x: number,
  y: number,
  viewportWidth: number,
  viewportHeight: number,
): { x: number; y: number } {
  return {
    x: Math.max(-140, Math.min(viewportWidth - 90, x)),
    y: Math.max(0, Math.min(viewportHeight - 90, y)),
  };
}

export interface WindowRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WindowGeometryInput {
  isMobile: boolean;
  maximized: boolean;
  rect: WindowRect;
  availWidth: number;
  availHeight: number;
}

/**
 * Resolves a window's on-screen rect from its stored (x, y, w, h) plus chrome state.
 * - Mobile: full width, but inset from the top so the desktop icon grid stays visible
 *   behind the window — otherwise a fullscreen window hides the desktop entirely and
 *   nothing hints there's more to explore.
 * - Maximized (desktop only — mobile windows can't be un/maximized from the UI): fills
 *   the available area.
 * - Otherwise: the window's own size/position, clamped to stay on screen.
 */
export function computeWindowGeometry({
  isMobile,
  maximized,
  rect,
  availWidth,
  availHeight,
}: WindowGeometryInput): WindowRect {
  if (isMobile) {
    const top = Math.min(MOBILE_WINDOW_TOP_INSET, Math.round(availHeight * 0.4));
    return { x: 0, y: top, w: availWidth, h: Math.max(160, availHeight - top) };
  }
  if (maximized) {
    return { x: 0, y: 0, w: availWidth, h: availHeight };
  }
  const w = Math.min(rect.w, availWidth - 24);
  const h = Math.min(rect.h, availHeight - 16);
  return {
    w,
    h,
    x: Math.max(0, Math.min(rect.x, availWidth - w)),
    y: Math.max(0, Math.min(rect.y, availHeight - h)),
  };
}
