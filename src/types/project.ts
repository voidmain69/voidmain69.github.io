export interface ProjectMeta {
  key: string;
  value: string;
}

export interface ProjectSection {
  heading: string;
  body: string;
  bullets: string[];
}

export interface ProjectContent {
  /** Filename shown as the window title, e.g. "supplier-aggregation.doc". */
  file: string;
  kicker: string;
  name: string;
  sub: string;
  shot: string;
  meta: ProjectMeta[];
  sections: ProjectSection[];
  tags: string[];
  cta: string;
}

export interface Project {
  id: string;
  tag: string;
  color1: string;
  color2: string;
  repo: string;
  ua: ProjectContent;
  en: ProjectContent;
}
