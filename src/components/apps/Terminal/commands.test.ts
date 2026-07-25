import { describe, expect, it } from 'vitest';
import { runCommand } from './commands';

describe('terminal commands', () => {
  it('help lists the available commands', () => {
    const result = runCommand('help', 'en');
    expect(result.lines[0]).toBe('Commands:');
    expect(result.lines.some((l) => l.includes('whoami'))).toBe(true);
  });

  it('whoami returns a short bio with no side effect', () => {
    const result = runCommand('whoami', 'en');
    expect(result.effect).toBeUndefined();
    expect(result.lines.length).toBeGreaterThan(0);
  });

  it('skills opens the computer window after a delay', () => {
    const result = runCommand('skills', 'en');
    expect(result.effect).toEqual({ type: 'open', kind: 'computer', delayMs: 220 });
  });

  it('projects lists the known project aliases', () => {
    const result = runCommand('projects', 'en');
    expect(result.lines.join('\n')).toContain('pim');
    expect(result.lines.join('\n')).toContain('ci');
    expect(result.lines.join('\n')).toContain('wiki');
    expect(result.lines.join('\n')).toContain('pcc');
  });

  it('open <alias> resolves every project alias to its doc window', () => {
    expect(runCommand('open pim', 'en').effect).toEqual({
      type: 'open',
      kind: 'doc',
      key: 'pim',
      delayMs: 200,
    });
    expect(runCommand('open pim-platform', 'en').effect).toEqual({
      type: 'open',
      kind: 'doc',
      key: 'pim',
      delayMs: 200,
    });
    expect(runCommand('open ci', 'en').effect).toEqual({
      type: 'open',
      kind: 'doc',
      key: 'competitor-intel',
      delayMs: 200,
    });
    expect(runCommand('open wiki', 'en').effect).toEqual({
      type: 'open',
      kind: 'doc',
      key: 'wiki',
      delayMs: 200,
    });
    expect(runCommand('open pcc', 'en').effect).toEqual({
      type: 'open',
      kind: 'doc',
      key: 'pc-configurator',
      delayMs: 200,
    });
    expect(runCommand('open configurator', 'en').effect).toEqual({
      type: 'open',
      kind: 'doc',
      key: 'pc-configurator',
      delayMs: 200,
    });
  });

  it('open <unknown> reports not found and beeps error', () => {
    const result = runCommand('open nope', 'en');
    expect(result.effect).toBeUndefined();
    expect(result.beep).toBe('error');
    expect(result.lines[0]).toContain('Not found');
  });

  it('mine, minesweeper and game all launch Miner.EXE', () => {
    for (const alias of ['mine', 'minesweeper', 'game']) {
      expect(runCommand(alias, 'en').effect).toEqual({ type: 'open', kind: 'mine', delayMs: 200 });
    }
  });

  it('contact, msg, icq and pager all launch PAGER 98', () => {
    for (const alias of ['contact', 'msg', 'icq', 'pager']) {
      expect(runCommand(alias, 'en').effect).toEqual({ type: 'open', kind: 'pager', delayMs: 220 });
    }
  });

  it('lang toggles the language after a delay', () => {
    const result = runCommand('lang', 'ua');
    expect(result.effect).toEqual({ type: 'toggle-lang', delayMs: 120 });
  });

  it('an unknown command reports itself and beeps error', () => {
    const result = runCommand('frobnicate', 'en');
    expect(result.beep).toBe('error');
    expect(result.lines[0]).toContain('Unknown command: frobnicate');
  });

  it('an empty command produces no output', () => {
    expect(runCommand('   ', 'en')).toEqual({ lines: [] });
  });

  it('is case-insensitive on the command word', () => {
    expect(runCommand('HELP', 'en').lines[0]).toBe('Commands:');
  });

  it('classic destructive commands crash the OS instead of running as a normal command', () => {
    const dangerous = [
      'format',
      'format c:',
      'del /f /s /q c:\\',
      'deltree c:\\',
      'rd /s /q c:\\',
      'rm -rf /',
      'rm -rf --no-preserve-root /',
      'sudo rm -rf /',
      ':(){ :|:& };:',
      'fdisk /mbr',
      'mkfs.ext4 /dev/sda1',
      'dd if=/dev/zero of=/dev/sda',
    ];
    for (const cmd of dangerous) {
      const result = runCommand(cmd, 'en');
      expect(result.effect).toEqual({ type: 'crash', command: cmd, delayMs: 900 });
      expect(result.beep).toBe('error');
    }
  });

  it('crash detection is case-insensitive and bilingual in its terminal message', () => {
    expect(runCommand('FORMAT C:', 'en').effect).toEqual({
      type: 'crash',
      command: 'FORMAT C:',
      delayMs: 900,
    });
    expect(runCommand('format', 'ua').lines[0]).toContain('КРИТИЧНА ПОМИЛКА');
    expect(runCommand('format', 'en').lines[0]).toContain('CRITICAL ERROR');
  });

  it('does not crash on lookalike but harmless input', () => {
    expect(runCommand('formatting my thoughts', 'en').effect).toBeUndefined();
    expect(runCommand('information', 'en').effect).toBeUndefined();
  });
});
