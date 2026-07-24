import { useEffect, useRef } from 'react';

const ACTIVITY_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'scroll',
  'wheel',
] as const;

/** Fires `onIdle` once, after `delayMs` of continuous inactivity (no mouse/keyboard/touch/scroll).
 * Any activity resets the countdown. Fires at most once per mount — it does not re-arm afterwards. */
export function useIdleTimer(delayMs: number, onIdle: () => void): void {
  const onIdleRef = useRef(onIdle);
  onIdleRef.current = onIdle;

  useEffect(() => {
    let firedOnce = false;
    let timer: number;

    function reset() {
      if (firedOnce) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        firedOnce = true;
        onIdleRef.current();
      }, delayMs);
    }

    reset();
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, reset, { passive: true }));
    return () => {
      window.clearTimeout(timer);
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, reset));
    };
  }, [delayMs]);
}
