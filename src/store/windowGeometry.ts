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
