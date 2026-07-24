export type WindowKind =
  | 'projects'
  | 'readme'
  | 'computer'
  | 'terminal'
  | 'network'
  | 'resume'
  | 'trash'
  | 'help'
  | 'doc'
  | 'shut'
  | 'mine'
  | 'pager';

/** Window chrome state only — app-specific state (terminal history, pager log,
 * minesweeper board, ...) lives inside each app component, not here. */
export interface WindowState {
  id: string;
  kind: WindowKind;
  /** Sub-identity within a kind, e.g. which project a `doc` window shows. */
  key?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}
