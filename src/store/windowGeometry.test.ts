import { describe, expect, it } from 'vitest';
import { clampDragPosition, computeWindowGeometry } from './windowGeometry';
import { MOBILE_WINDOW_TOP_INSET } from '../constants';

describe('clampDragPosition', () => {
  it('leaves an in-bounds position untouched', () => {
    expect(clampDragPosition(300, 200, 1200, 800)).toEqual({ x: 300, y: 200 });
  });

  it('clamps x so at most 140px can hang off the left edge', () => {
    expect(clampDragPosition(-500, 200, 1200, 800)).toEqual({ x: -140, y: 200 });
  });

  it('clamps x so at least 90px stays reachable on the right', () => {
    expect(clampDragPosition(5000, 200, 1200, 800)).toEqual({ x: 1110, y: 200 });
  });

  it('clamps y to the [0, viewportHeight - 90] range', () => {
    expect(clampDragPosition(300, -50, 1200, 800)).toEqual({ x: 300, y: 0 });
    expect(clampDragPosition(300, 5000, 1200, 800)).toEqual({ x: 300, y: 710 });
  });
});

describe('computeWindowGeometry', () => {
  const rect = { x: 200, y: 100, w: 620, h: 400 };

  it('on mobile, insets from the top so the desktop icons peek out behind the window', () => {
    const geo = computeWindowGeometry({
      isMobile: true,
      maximized: false,
      rect,
      availWidth: 390,
      availHeight: 700,
    });
    expect(geo).toEqual({
      x: 0,
      y: MOBILE_WINDOW_TOP_INSET,
      w: 390,
      h: 700 - MOBILE_WINDOW_TOP_INSET,
    });
  });

  it('on mobile, ignores maximized — mobile windows always use the inset layout', () => {
    const geo = computeWindowGeometry({
      isMobile: true,
      maximized: true,
      rect,
      availWidth: 390,
      availHeight: 700,
    });
    expect(geo.y).toBe(MOBILE_WINDOW_TOP_INSET);
  });

  it('on a short mobile viewport, caps the top inset at 40% of available height', () => {
    const geo = computeWindowGeometry({
      isMobile: true,
      maximized: false,
      rect,
      availWidth: 390,
      availHeight: 200,
    });
    expect(geo.y).toBe(80); // 40% of 200, well under the 110px default inset
    expect(geo.h).toBeGreaterThanOrEqual(160); // never shrinks below the height floor
  });

  it('maximized on desktop fills the available area regardless of the stored rect', () => {
    const geo = computeWindowGeometry({
      isMobile: false,
      maximized: true,
      rect,
      availWidth: 1200,
      availHeight: 800,
    });
    expect(geo).toEqual({ x: 0, y: 0, w: 1200, h: 800 });
  });

  it('on desktop, a window that fits stays exactly where it was left', () => {
    const geo = computeWindowGeometry({
      isMobile: false,
      maximized: false,
      rect,
      availWidth: 1200,
      availHeight: 800,
    });
    expect(geo).toEqual(rect);
  });

  it('on desktop, clamps an oversized or off-screen window back into view', () => {
    const geo = computeWindowGeometry({
      isMobile: false,
      maximized: false,
      rect: { x: 5000, y: 5000, w: 620, h: 400 },
      availWidth: 500,
      availHeight: 300,
    });
    expect(geo.w).toBe(500 - 24);
    expect(geo.h).toBe(300 - 16);
    expect(geo.x).toBe(500 - geo.w);
    expect(geo.y).toBe(300 - geo.h);
  });
});
