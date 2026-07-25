import { useEffect, useRef } from 'react';

const ACTIVITY_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'scroll',
  'wheel',
] as const;

export interface UseIdleTimerOptions {
  /** When true, `onIdle` re-arms after every firing instead of firing at most once per mount. */
  repeat?: boolean;
}

/** Fires `onIdle` after `delayMs` of continuous inactivity (no mouse/keyboard/touch/scroll).
 * Any activity resets the countdown. By default fires at most once per mount; pass
 * `{ repeat: true }` to have it keep re-arming and fire again after every subsequent idle period. */
export function useIdleTimer(
  delayMs: number,
  onIdle: () => void,
  options?: UseIdleTimerOptions,
): void {
  const onIdleRef = useRef(onIdle);
  onIdleRef.current = onIdle;
  const repeat = options?.repeat ?? false;

  useEffect(() => {
    let firedOnce = false;
    let timer: number;

    function reset() {
      if (firedOnce && !repeat) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        firedOnce = true;
        onIdleRef.current();
        if (repeat) reset();
      }, delayMs);
    }

    reset();
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, reset, { passive: true }));
    return () => {
      window.clearTimeout(timer);
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, reset));
    };
  }, [delayMs, repeat]);
}
