import { useEffect, useState } from 'react';

/**
 * Ticks once a second, isolated in its own local state so only the tray
 * clock re-renders every second instead of the whole desktop tree.
 */
export function useClock(use24Hour: boolean): string {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const hh = use24Hour ? String(hours).padStart(2, '0') : String(((hours + 11) % 12) + 1);
  const suffix = use24Hour ? '' : hours < 12 ? ' AM' : ' PM';
  return `${hh}:${String(minutes).padStart(2, '0')}${suffix}`;
}
