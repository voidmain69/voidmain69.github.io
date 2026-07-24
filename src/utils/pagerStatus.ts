export type PagerStatusKey = 'online' | 'away' | 'na';

export const PAGER_STATUS_DOT: Record<PagerStatusKey, string> = {
  online: '#2f9e5a',
  away: '#e0a527',
  na: '#8b9092',
};

/** Derives presence from the visitor's local clock — 9:00-19:00 online, 19:00-24:00 away, else n/a. */
export function pagerStatus(date: Date = new Date()): PagerStatusKey {
  const h = date.getHours();
  if (h >= 9 && h < 19) return 'online';
  if (h >= 19 && h < 24) return 'away';
  return 'na';
}
