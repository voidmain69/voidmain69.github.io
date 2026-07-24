import { useViewportSize } from './useViewportSize';
import { MOBILE_BREAKPOINT } from '../constants';

/** Matches the design's mobile breakpoint (`window.innerWidth < 820`). */
export function useIsMobile(): boolean {
  const { width } = useViewportSize();
  return width < MOBILE_BREAKPOINT;
}
