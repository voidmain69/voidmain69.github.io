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
  /** Filename shown as the window title, e.g. "pim-platform.doc". */
  file: string;
  kicker: string;
  name: string;
  sub: string;
  shot: string;
  meta: ProjectMeta[];
  sections: ProjectSection[];
  tags: string[];
  /** CTA link label — only rendered if the project also has a `repo`. */
  cta?: string;
}

export interface Project {
  id: string;
  tag: string;
  color1: string;
  color2: string;
  /** Public repo URL. Omitted for internal/proprietary work — DocViewer hides the CTA button then. */
  repo?: string;
  ua: ProjectContent;
  en: ProjectContent;
}
