import { create } from 'zustand';
import type { Lang } from '../types/i18n';

export type Wallpaper = 'teal' | 'graphite' | 'plum';

const ASSISTANT_MUTE_KEY = 'voidos.assistant.off';

function loadAssistantMuted(): boolean {
  try {
    return window.localStorage.getItem(ASSISTANT_MUTE_KEY) === '1';
  } catch {
    return false;
  }
}

interface SystemState {
  lang: Lang;
  wallpaper: Wallpaper;
  muted: boolean;
  clock24: boolean;
  startOpen: boolean;
  startSub: string | null;
  selectedIcon: string | null;
  assistantVisible: boolean;
  assistantDismissed: boolean;
  assistantMuted: boolean;
  crashed: boolean;
  crashCommand: string | null;
  toggleLang: () => void;
  setWallpaper: (wallpaper: Wallpaper) => void;
  toggleMuted: () => void;
  toggleStart: () => void;
  closeStart: () => void;
  hoverStartSub: (key: string | null) => void;
  selectIcon: (key: string | null) => void;
  showAssistant: () => void;
  dismissAssistant: () => void;
  toggleAssistantMuted: () => void;
  crash: (command: string) => void;
  recoverFromCrash: () => void;
}

export const useSystemStore = create<SystemState>((set, get) => ({
  lang: 'ua',
  wallpaper: 'teal',
  muted: false,
  clock24: true,
  startOpen: false,
  startSub: null,
  selectedIcon: null,
  assistantVisible: false,
  assistantDismissed: false,
  assistantMuted: loadAssistantMuted(),
  crashed: false,
  crashCommand: null,

  toggleLang: () => set((s) => ({ lang: s.lang === 'ua' ? 'en' : 'ua' })),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  toggleMuted: () => set((s) => ({ muted: !s.muted })),
  toggleStart: () => set((s) => ({ startOpen: !s.startOpen, startSub: null })),
  closeStart: () => set({ startOpen: false, startSub: null }),
  hoverStartSub: (key) => set({ startSub: key }),
  selectIcon: (key) => set({ selectedIcon: key }),

  showAssistant: () => {
    if (get().assistantDismissed || get().assistantMuted) return;
    set({ assistantVisible: true });
  },
  dismissAssistant: () => set({ assistantVisible: false, assistantDismissed: true }),
  toggleAssistantMuted: () => {
    const next = !get().assistantMuted;
    set({ assistantMuted: next });
    try {
      window.localStorage.setItem(ASSISTANT_MUTE_KEY, next ? '1' : '0');
    } catch {
      // storage unavailable — in-memory state still updated above
    }
  },

  crash: (command) => set({ crashed: true, crashCommand: command }),
  recoverFromCrash: () => set({ crashed: false, crashCommand: null }),
}));
