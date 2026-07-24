import type { Lang, UiStrings } from '../types/i18n';
import { useSystemStore } from '../store/system';
import { ua } from './ua';
import { en } from './en';

const dictionaries: Record<Lang, UiStrings> = { ua, en };

export function useT(): UiStrings {
  const lang = useSystemStore((s) => s.lang);
  return dictionaries[lang];
}

export function getDictionary(lang: Lang): UiStrings {
  return dictionaries[lang];
}
