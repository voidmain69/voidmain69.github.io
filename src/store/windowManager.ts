import { create } from 'zustand';
import type { WindowKind, WindowState } from '../types/window';
import { WINDOW_SIZES } from '../data/desktop-icons';

interface WindowManagerState {
  windows: WindowState[];
  /** Running z-index counter — the z assigned to the most recently raised window. */
  z: number;
  open: (kind: WindowKind, key?: string) => void;
  close: (id: string) => void;
  closeAll: () => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  patch: (id: string, partial: Partial<WindowState>) => void;
}

export function windowId(kind: WindowKind, key?: string): string {
  return `${kind}:${key ?? ''}`;
}

const BASE_Z = 20;

export const useWindowManagerStore = create<WindowManagerState>((set, get) => ({
  windows: [],
  z: BASE_Z,

  open: (kind, key) => {
    const id = windowId(kind, key);
    const existing = get().windows.find((w) => w.id === id);
    const z = get().z + 1;

    if (existing) {
      set((s) => ({
        z,
        windows: s.windows.map((w) => (w.id === id ? { ...w, z, minimized: false } : w)),
      }));
      return;
    }

    const n = get().windows.length;
    const size = WINDOW_SIZES[kind];
    const win: WindowState = {
      id,
      kind,
      key,
      z,
      minimized: false,
      maximized: false,
      x: 190 + (n % 5) * 34,
      y: 42 + (n % 5) * 30,
      w: size.w,
      h: size.h,
    };
    set((s) => ({ z, windows: [...s.windows, win] }));
  },

  close: (id) => set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

  closeAll: () => set({ windows: [] }),

  focus: (id) => {
    const win = get().windows.find((w) => w.id === id);
    if (!win || win.z >= get().z) return;
    const z = get().z + 1;
    set((s) => ({ z, windows: s.windows.map((w) => (w.id === id ? { ...w, z } : w)) }));
  },

  minimize: (id) =>
    set((s) => ({ windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)) })),

  toggleMaximize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)),
    })),

  patch: (id, partial) =>
    set((s) => ({ windows: s.windows.map((w) => (w.id === id ? { ...w, ...partial } : w)) })),
}));
