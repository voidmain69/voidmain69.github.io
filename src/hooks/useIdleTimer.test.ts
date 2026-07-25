import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIdleTimer } from './useIdleTimer';

describe('useIdleTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('fires onIdle once the delay elapses with no activity', () => {
    const onIdle = vi.fn();
    renderHook(() => useIdleTimer(1000, onIdle));

    vi.advanceTimersByTime(999);
    expect(onIdle).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(onIdle).toHaveBeenCalledTimes(1);
  });

  it('resets the countdown whenever activity occurs', () => {
    const onIdle = vi.fn();
    renderHook(() => useIdleTimer(1000, onIdle));

    vi.advanceTimersByTime(800);
    window.dispatchEvent(new Event('mousemove'));
    vi.advanceTimersByTime(800);
    expect(onIdle).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(onIdle).toHaveBeenCalledTimes(1);
  });

  it('fires at most once, even if activity resumes afterwards', () => {
    const onIdle = vi.fn();
    renderHook(() => useIdleTimer(1000, onIdle));

    vi.advanceTimersByTime(1000);
    expect(onIdle).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new Event('keydown'));
    vi.advanceTimersByTime(5000);
    expect(onIdle).toHaveBeenCalledTimes(1);
  });

  it('cleans up its timer and listeners on unmount', () => {
    const onIdle = vi.fn();
    const { unmount } = renderHook(() => useIdleTimer(1000, onIdle));
    unmount();

    vi.advanceTimersByTime(5000);
    expect(onIdle).not.toHaveBeenCalled();
  });

  describe('with repeat: true', () => {
    it('keeps re-arming and fires again after every subsequent idle period', () => {
      const onIdle = vi.fn();
      renderHook(() => useIdleTimer(1000, onIdle, { repeat: true }));

      vi.advanceTimersByTime(1000);
      expect(onIdle).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(1000);
      expect(onIdle).toHaveBeenCalledTimes(2);

      vi.advanceTimersByTime(3000);
      expect(onIdle).toHaveBeenCalledTimes(5);
    });

    it('still resets the countdown on activity between firings', () => {
      const onIdle = vi.fn();
      renderHook(() => useIdleTimer(1000, onIdle, { repeat: true }));

      vi.advanceTimersByTime(1000);
      expect(onIdle).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(800);
      window.dispatchEvent(new Event('mousemove'));
      vi.advanceTimersByTime(800);
      expect(onIdle).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(200);
      expect(onIdle).toHaveBeenCalledTimes(2);
    });

    it('stops firing after unmount', () => {
      const onIdle = vi.fn();
      const { unmount } = renderHook(() => useIdleTimer(1000, onIdle, { repeat: true }));

      vi.advanceTimersByTime(1000);
      expect(onIdle).toHaveBeenCalledTimes(1);

      unmount();
      vi.advanceTimersByTime(5000);
      expect(onIdle).toHaveBeenCalledTimes(1);
    });
  });
});
