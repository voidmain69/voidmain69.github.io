import { describe, expect, it } from 'vitest';
import { ua } from './ua';
import { en } from './en';

/** Recursively collects the shape of an object as a sorted list of dotted key paths.
 * Arrays are shape-checked via their first element (both dictionaries use uniform-shape arrays). */
function keyPaths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return value.length > 0 ? keyPaths(value[0], `${prefix}[]`) : [`${prefix}[]`];
  }
  if (value !== null && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .flatMap((key) =>
        keyPaths((value as Record<string, unknown>)[key], prefix ? `${prefix}.${key}` : key),
      );
  }
  return [prefix];
}

describe('i18n dictionary parity', () => {
  it('ua and en expose the exact same key structure', () => {
    expect(keyPaths(ua).sort()).toEqual(keyPaths(en).sort());
  });

  it('neither dictionary has empty top-level arrays that would hide a shape mismatch', () => {
    for (const dict of [ua, en]) {
      expect(dict.icons.length).toBeGreaterThan(0);
      expect(dict.startItems.length).toBeGreaterThan(0);
      expect(dict.programs.length).toBeGreaterThan(0);
      expect(dict.drives.length).toBeGreaterThan(0);
      expect(dict.network.length).toBeGreaterThan(0);
      expect(dict.boot.length).toBeGreaterThan(0);
      expect(dict.pager.replies.length).toBeGreaterThan(0);
      expect(dict.pager.contacts.length).toBeGreaterThan(0);
      expect(dict.assistant.options.length).toBeGreaterThan(0);
    }
  });
});
