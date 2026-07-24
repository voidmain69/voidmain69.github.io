import { describe, expect, it } from 'vitest';
import { clampDragPosition } from './windowGeometry';

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
