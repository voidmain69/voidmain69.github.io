import { useEffect, useRef } from 'react';
import { useWindowManagerStore } from '../store/windowManager';
import { useSystemStore } from '../store/system';
import { ASSISTANT_DELAY_MS } from '../constants';

/** Shows the assistant bubble once, after an idle delay, unless the visitor already opened Pager. */
export function useAssistantTimer(): void {
  const windows = useWindowManagerStore((s) => s.windows);
  const showAssistant = useSystemStore((s) => s.showAssistant);
  const windowsRef = useRef(windows);
  windowsRef.current = windows;

  useEffect(() => {
    const id = window.setTimeout(() => {
      const hasPagerOpen = windowsRef.current.some((w) => w.kind === 'pager');
      if (!hasPagerOpen) showAssistant();
    }, ASSISTANT_DELAY_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
