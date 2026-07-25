import { useRef } from 'react';
import { useWindowManagerStore } from '../store/windowManager';
import { useSystemStore } from '../store/system';
import { useIdleTimer } from './useIdleTimer';
import { useBeep } from './useBeep';
import { ASSISTANT_IDLE_MS } from '../constants';

/** Shows the assistant bubble (with a beep) once the visitor has been idle for a while, and keeps
 * reappearing every idle period after that — rotating through a new message each time — unless
 * they've already opened Pager. Any mouse/keyboard/touch/scroll activity resets the idle clock. */
export function useAssistantTimer(): void {
  const windows = useWindowManagerStore((s) => s.windows);
  const showAssistant = useSystemStore((s) => s.showAssistant);
  const beep = useBeep();
  const windowsRef = useRef(windows);
  windowsRef.current = windows;

  useIdleTimer(
    ASSISTANT_IDLE_MS,
    () => {
      const hasPagerOpen = windowsRef.current.some((w) => w.kind === 'pager');
      if (!hasPagerOpen && showAssistant()) {
        beep('click');
      }
    },
    { repeat: true },
  );
}
