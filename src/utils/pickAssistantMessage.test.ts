import { afterEach, describe, expect, it, vi } from 'vitest';
import { pickAssistantMessage } from './pickAssistantMessage';

const slides = ['slide-0', 'slide-1', 'slide-2'];
const funFacts = ['fact-0', 'fact-1'];

describe('pickAssistantMessage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns slides in order on even appearance indices', () => {
    expect(pickAssistantMessage(0, slides, funFacts)).toBe('slide-0');
    expect(pickAssistantMessage(2, slides, funFacts)).toBe('slide-1');
    expect(pickAssistantMessage(4, slides, funFacts)).toBe('slide-2');
  });

  it('wraps around once every slide has been shown', () => {
    expect(pickAssistantMessage(6, slides, funFacts)).toBe('slide-0');
  });

  it('returns a fun fact on odd appearance indices', () => {
    expect(funFacts).toContain(pickAssistantMessage(1, slides, funFacts));
    expect(funFacts).toContain(pickAssistantMessage(3, slides, funFacts));
  });

  it('picks the fact based on Math.random', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(pickAssistantMessage(1, slides, funFacts)).toBe('fact-0');

    vi.spyOn(Math, 'random').mockReturnValue(0.99);
    expect(pickAssistantMessage(1, slides, funFacts)).toBe('fact-1');
  });

  it('falls back to slides on an odd index when there are no fun facts', () => {
    expect(pickAssistantMessage(1, slides, [])).toBe('slide-0');
  });
});
