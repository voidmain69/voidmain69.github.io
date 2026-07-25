import type { Lang } from '../../../types/i18n';
import type { WindowKind } from '../../../types/window';
import type { BeepKind } from '../../../hooks/useBeep';
import { getProject } from '../../../data/projects';

export type TerminalEffect =
  | { type: 'open'; kind: WindowKind; key?: string; delayMs: number }
  | { type: 'toggle-lang'; delayMs: number }
  | { type: 'crash'; command: string; delayMs: number };

export interface CommandResult {
  lines: string[];
  effect?: TerminalEffect;
  beep?: BeepKind;
}

const OPEN_ALIASES: Record<string, string> = {
  pim: 'pim',
  'pim-platform': 'pim',
  ci: 'competitor-intel',
  'competitor-intel': 'competitor-intel',
  competitor: 'competitor-intel',
  wiki: 'wiki',
  'product-wiki': 'wiki',
  pcc: 'pc-configurator',
  'pc-configurator': 'pc-configurator',
  configurator: 'pc-configurator',
};

/** Easter egg: classic "don't run this" commands blue-screen the whole fictional OS. */
const DANGEROUS_PATTERNS: RegExp[] = [
  /^format\b/,
  /^del\s+\/f\s+\/s\s+\/q/,
  /^deltree\b/,
  /^rd\s+\/s\s+\/q/,
  /^rm\s+-rf\s+(\/|--no-preserve-root)/,
  /^sudo\s+rm\s+-rf/,
  /^:\(\)\s*\{\s*:\|:\s*&\s*\}\s*;\s*:/, // fork bomb
  /^fdisk\b/,
  /^mkfs\b/,
  /^dd\s+if=/,
];

/** Pure terminal command interpreter — no DOM/store access, easy to unit test. */
export function runCommand(raw: string, lang: Lang): CommandResult {
  const cmd = raw.trim();
  const ua = lang === 'ua';
  if (!cmd) return { lines: [] };

  if (DANGEROUS_PATTERNS.some((pattern) => pattern.test(cmd.toLowerCase()))) {
    return {
      lines: [
        ua
          ? 'КРИТИЧНА ПОМИЛКА. Ініціюю аварійну зупинку системи...'
          : 'CRITICAL ERROR. Initiating emergency system halt...',
        '',
      ],
      effect: { type: 'crash', command: cmd, delayMs: 900 },
      beep: 'error',
    };
  }

  const [word, ...rest] = cmd.split(' ');
  const c = (word ?? '').toLowerCase();
  const arg = rest.join(' ').toLowerCase();

  if (c === 'help') {
    return {
      lines: [
        ua ? 'Команди:' : 'Commands:',
        '  whoami                 ' + (ua ? 'коротко про мене' : 'short bio'),
        '  skills                 ' + (ua ? 'відкрити C:\\SKILLS' : 'open C:\\SKILLS'),
        '  projects               ' + (ua ? 'список проєктів' : 'list projects'),
        '  open <pim|ci|wiki|pcc> ' + (ua ? 'відкрити проєкт' : 'open a project'),
        '  contact                ' + (ua ? 'канали звʼязку' : 'contact channels'),
        '  mine                   ' + (ua ? 'запустити Мінер.EXE' : 'launch Miner.EXE'),
        '  lang                   ' + (ua ? 'перемкнути мову' : 'switch language'),
        '  clear',
        '',
      ],
    };
  }

  if (c === 'whoami') {
    return {
      lines: [
        'Vitalii Riznychenko — AI Solutions Engineer / AI Solution Architect.',
        ua
          ? 'Будую RAG і event-driven системи, які можна довести.'
          : 'I build RAG and event-driven systems you can prove.',
        '',
      ],
    };
  }

  if (c === 'skills') {
    return {
      lines: [ua ? 'Монтую C:\\SKILLS ...' : 'Mounting C:\\SKILLS ...', ''],
      effect: { type: 'open', kind: 'computer', delayMs: 220 },
    };
  }

  if (c === 'projects') {
    return {
      lines: [
        '  pim    pim-platform',
        '  ci     competitor-intel',
        '  wiki   product-wiki',
        '  pcc    pc-configurator',
        ua ? 'Підказка: open pim' : 'Hint: open pim',
        '',
      ],
    };
  }

  if (c === 'open') {
    const id = OPEN_ALIASES[arg];
    if (id) {
      const project = getProject(id);
      return {
        lines: [(ua ? 'Відкриваю ' : 'Opening ') + (project?.[lang].file ?? id), ''],
        effect: { type: 'open', kind: 'doc', key: id, delayMs: 200 },
      };
    }
    return {
      lines: [(ua ? 'Не знайдено: ' : 'Not found: ') + (arg || '?'), ''],
      beep: 'error',
    };
  }

  if (c === 'mine' || c === 'minesweeper' || c === 'game') {
    return {
      lines: [ua ? 'Запуск Мінер.EXE ...' : 'Launching Miner.EXE ...', ''],
      effect: { type: 'open', kind: 'mine', delayMs: 200 },
    };
  }

  if (c === 'contact' || c === 'msg' || c === 'icq' || c === 'pager') {
    return {
      lines: [
        '  github.com/voidmain69',
        '  linkedin.com/in/vitaliy-riznychenko-340769158',
        '  rv84@i.ua',
        '  +38 099 132-70-37 (WhatsApp/Viber)',
        ua ? 'Запуск PAGER 98 ...' : 'Launching PAGER 98 ...',
        '',
      ],
      effect: { type: 'open', kind: 'pager', delayMs: 220 },
    };
  }

  if (c === 'lang') {
    return {
      lines: [ua ? 'Мова: EN' : 'Language: UA', ''],
      effect: { type: 'toggle-lang', delayMs: 120 },
    };
  }

  return {
    lines: [
      (ua ? 'Невідома команда: ' : 'Unknown command: ') + c,
      ua ? 'Введіть help.' : 'Type help.',
      '',
    ],
    beep: 'error',
  };
}
