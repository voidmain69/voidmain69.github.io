export interface GlyphProps {
  className?: string;
}

/** CRT monitor: turquoise screen, yellow power LED, on a stand. */
export function ComputerGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect x="4" y="3" width="24" height="17" rx="1.5" fill="#b9bfc4" stroke="#40464a" />
      <rect x="5" y="4" width="22" height="1" fill="#e7eaeb" />
      <rect x="7" y="6" width="18" height="10" fill="#0b7480" />
      <rect x="8.5" y="7.5" width="6" height="3.5" fill="#1fb6c4" />
      <rect x="9" y="8" width="2.5" height="1.3" fill="#8fe9ef" />
      <circle cx="23" cy="18" r="1.3" fill="#b97e00" />
      <circle cx="23" cy="18" r="0.9" fill="#ffd23d" />
      <circle cx="22.6" cy="17.6" r="0.3" fill="#fff4c9" />
      <rect x="12" y="20" width="8" height="2" fill="#7d858c" />
      <rect
        x="8"
        y="22"
        width="16"
        height="3"
        rx="1"
        fill="#7d858c"
        stroke="#40464a"
        strokeWidth="0.75"
      />
    </svg>
  );
}

/** Two networked machines joined by a cable — classic "Network Neighborhood" silhouette. */
export function NetworkGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect
        x="2"
        y="8"
        width="13"
        height="10"
        rx="1"
        fill="#b9bfc4"
        stroke="#40464a"
        strokeWidth="0.9"
      />
      <rect x="4" y="10" width="9" height="6" fill="#24405c" />
      <rect x="6" y="18" width="5" height="1.5" fill="#7d858c" />
      <rect
        x="13"
        y="13"
        width="17"
        height="12"
        rx="1.5"
        fill="#c7cbcc"
        stroke="#40464a"
        strokeWidth="0.9"
      />
      <rect x="15.5" y="15.5" width="12" height="7" fill="#2f5a82" />
      <rect x="16.5" y="16.5" width="4" height="2" fill="#6fa0c9" />
      <rect x="18" y="25" width="7" height="2" fill="#8b9092" />
      <path
        d="M8 19.5 L8 24 L21.5 24 L21.5 25"
        fill="none"
        stroke="#5cc38a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="19.5" r="1" fill="#2f9e5a" stroke="#1c6b3c" strokeWidth="0.4" />
      <circle cx="21.5" cy="25" r="1" fill="#2f9e5a" stroke="#1c6b3c" strokeWidth="0.4" />
    </svg>
  );
}

/** Spiked mine with a glossy shine, sitting on an unrevealed Minesweeper-style tile. */
export function MineGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="30" height="30" fill="#bdbdbd" />
      <rect x="1" y="1" width="30" height="2" fill="#eaeaea" />
      <rect x="1" y="1" width="2" height="30" fill="#eaeaea" />
      <rect x="1" y="29" width="30" height="2" fill="#7a7a7a" />
      <rect x="29" y="1" width="2" height="30" fill="#7a7a7a" />
      <g stroke="#141414" strokeWidth="2.2" strokeLinecap="square">
        <line x1="22.3" y1="17" x2="25.5" y2="17" />
        <line x1="20.5" y1="12.6" x2="22.7" y2="10.3" />
        <line x1="16" y1="10.7" x2="16" y2="7.5" />
        <line x1="11.6" y1="12.6" x2="9.3" y2="10.3" />
        <line x1="9.7" y1="17" x2="6.5" y2="17" />
        <line x1="11.6" y1="21.4" x2="9.3" y2="23.7" />
        <line x1="16" y1="23.3" x2="16" y2="26.5" />
        <line x1="20.5" y1="21.4" x2="22.7" y2="23.7" />
      </g>
      <circle cx="16" cy="17" r="6.3" fill="#141414" />
      <ellipse cx="13.4" cy="14.2" rx="1.6" ry="1" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}

/** Pager with an antenna, a green LCD, and a row of buttons. */
export function PagerGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <line
        x1="21"
        y1="6"
        x2="26"
        y2="1"
        stroke="#101312"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="26" cy="1" r="0.8" fill="#101312" />
      <rect x="8" y="5" width="15" height="23" rx="2.5" fill="#2b302e" stroke="#101312" />
      <rect x="9" y="6.5" width="1.5" height="20" fill="#454b48" />
      <rect
        x="10.5"
        y="8"
        width="10"
        height="6"
        fill="#2f9e5a"
        stroke="#1c6b3c"
        strokeWidth="0.5"
      />
      <rect x="11.5" y="9.5" width="6" height="1" fill="#8fe0b0" />
      <rect x="11.5" y="11.5" width="8" height="1" fill="#8fe0b0" />
      <rect
        x="10.5"
        y="17.5"
        width="2.2"
        height="2"
        fill="#c7cbcc"
        stroke="#7d858c"
        strokeWidth="0.4"
      />
      <rect
        x="13.3"
        y="17.5"
        width="2.2"
        height="2"
        fill="#c7cbcc"
        stroke="#7d858c"
        strokeWidth="0.4"
      />
      <rect
        x="16.1"
        y="17.5"
        width="2.2"
        height="2"
        fill="#c7cbcc"
        stroke="#7d858c"
        strokeWidth="0.4"
      />
      <rect
        x="18.9"
        y="17.5"
        width="2.2"
        height="2"
        fill="#c7cbcc"
        stroke="#7d858c"
        strokeWidth="0.4"
      />
      <circle cx="12" cy="22.3" r="0.5" fill="#101312" />
      <circle cx="15" cy="22.3" r="0.5" fill="#101312" />
      <circle cx="18" cy="22.3" r="0.5" fill="#101312" />
    </svg>
  );
}

/** Wire-mesh trash bin: lid, handle, tapered wire body, and two ribs. */
export function TrashGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect
        x="13.5"
        y="3"
        width="5"
        height="2"
        rx="0.5"
        fill="#c7cbcc"
        stroke="#5c6165"
        strokeWidth="0.6"
      />
      <rect
        x="6"
        y="5"
        width="20"
        height="3"
        rx="1"
        fill="#c7cbcc"
        stroke="#5c6165"
        strokeWidth="0.8"
      />
      <rect x="8" y="8" width="16" height="1.5" fill="#8b9092" />
      <path
        d="M8 9 L24 9 L21.5 27 L10.5 27 Z"
        fill="none"
        stroke="#8b9092"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <g stroke="#8b9092" strokeWidth="1">
        <line x1="8" y1="9" x2="10.5" y2="27" />
        <line x1="12" y1="9" x2="13.4" y2="27" />
        <line x1="16" y1="9" x2="16" y2="27" />
        <line x1="20" y1="9" x2="18.6" y2="27" />
        <line x1="24" y1="9" x2="21.5" y2="27" />
      </g>
      <line x1="8.7" y1="14" x2="23.3" y2="14" stroke="#5c6165" strokeWidth="1.1" />
      <line x1="9.5" y1="21" x2="22.3" y2="21" stroke="#5c6165" strokeWidth="1.1" />
    </svg>
  );
}
