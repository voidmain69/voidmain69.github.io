export const TASKBAR_HEIGHT = 44;
export const MOBILE_BREAKPOINT = 820;
/** Top gap left above every mobile window so the desktop icon grid peeks out behind it —
 * without this, a fullscreen window would hide the whole desktop and nothing would hint
 * there's more to explore. */
export const MOBILE_WINDOW_TOP_INSET = 110;
/** Continuous user inactivity (no mouse/keyboard/touch/scroll) before the assistant nudges in.
 * Also the re-arm interval — the assistant keeps reappearing on this cadence, not just once. */
export const ASSISTANT_IDLE_MS = 15000;
export const PAGER_LOG_LIMIT = 40;
export const PAGER_LOG_STORAGE_KEY = 'voidos.pager.log';
export const PAGER_MESSAGE_MAX_LENGTH = 2000;
export const PAGER_CONTACT_STORAGE_KEY = 'voidos.pager.contact';
export const PAGER_CONTACT_FIELD_MAX_LENGTH = 200;
export const MINE_BOARD_SIZE = 9;
export const MINE_COUNT = 10;
