import type { WindowKind } from './window';

export type Lang = 'ua' | 'en';

export interface IconDef {
  key: string;
  label: string;
  tag: string;
}

export interface DriveRow {
  k: string;
  v: string;
  url?: string;
}

export interface DriveGroup {
  name: string;
  rows: DriveRow[];
}

export interface StartItem {
  key: string;
  label: string;
  arrow: string;
}

export interface ProgramItem {
  key: string;
  label: string;
}

export interface PagerContact {
  label: string;
  url: string;
}

/** `doc` windows are titled from the project's own filename, not from here. */
export type WindowTitles = Record<Exclude<WindowKind, 'doc'>, string>;

export interface UiStrings {
  start: string;
  shutdown: string;
  available: string;
  statusTip: string;
  osName: string;
  mobileNote: string;
  icons: IconDef[];
  win: WindowTitles;
  menu: string[];
  startItems: StartItem[];
  programs: ProgramItem[];
  readme: string[];
  trash: string[];
  resume: string[];
  help: string[];
  drives: DriveGroup[];
  network: DriveGroup[];
  shutText: string;
  shutBtns: [string, string];
  words: string;
  sections: string;
  termHello: string[];
  mine: {
    mines: string;
    time: string;
    reset: string;
    idle: string;
    winTitle: string;
    win: string;
    lost: string;
  };
  boot: string[];
  bootSkip: string;
  pagerTip: string;
  pager: {
    nick: string;
    send: string;
    mail: string;
    typing: string;
    placeholder: string;
    note: string;
    statuses: { online: string; away: string; na: string };
    you: string;
    me: string;
    sys: string;
    hello: string;
    replies: string[];
    contacts: PagerContact[];
  };
  assistant: {
    text: string;
    yes: string;
    no: string;
    options: string[];
    mute: string;
  };
}
