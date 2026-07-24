import type { ProjectContent } from '../../../types/project';

export function countWords(content: ProjectContent): number {
  const text =
    content.sub + ' ' + content.sections.map((s) => s.body + ' ' + s.bullets.join(' ')).join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}
