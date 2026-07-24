import { useCallback, useRef } from 'react';
import { useSystemStore } from '../store/system';

export type BeepKind = 'click' | 'open' | 'close' | 'error' | 'ok' | 'uhoh';

const FREQUENCIES: Record<Exclude<BeepKind, 'uhoh'>, number> = {
  click: 760,
  open: 520,
  close: 320,
  error: 150,
  ok: 1180,
};

function playTone(ctx: AudioContext, frequency: number, startOffset: number): void {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  const t = ctx.currentTime + startOffset;
  gain.gain.setValueAtTime(0.045, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
  oscillator.start(t);
  oscillator.stop(t + 0.14);
}

/** Synthesized WebAudio square-wave beeps — ported 1:1 from the design's `beep()`, no audio assets. */
export function useBeep(): (kind: BeepKind) => void {
  const muted = useSystemStore((s) => s.muted);
  const ctxRef = useRef<AudioContext | null>(null);

  return useCallback(
    (kind: BeepKind) => {
      if (muted) return;
      try {
        const AudioCtx = window.AudioContext;
        const ctx = ctxRef.current ?? new AudioCtx();
        ctxRef.current = ctx;

        if (kind === 'uhoh') {
          playTone(ctx, 520, 0);
          playTone(ctx, 370, 0.16);
          return;
        }
        playTone(ctx, FREQUENCIES[kind], 0);
      } catch {
        // audio unavailable (autoplay policy, unsupported browser) — fail silently
      }
    },
    [muted],
  );
}
