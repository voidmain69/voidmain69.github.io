import type { WindowState } from '../../types/window';
import { ProjectExplorer } from './ProjectExplorer/ProjectExplorer';
import { DocViewer } from './DocViewer/DocViewer';
import { TextViewer } from './TextViewer/TextViewer';
import { ListViewer } from './ListViewer/ListViewer';
import { Terminal } from './Terminal/Terminal';
import { Pager } from './Pager/Pager';
import { Minesweeper } from './Minesweeper/Minesweeper';
import { ShutdownDialog } from '../os/ShutdownDialog';

interface AppBodyProps {
  win: WindowState;
}

export function AppBody({ win }: AppBodyProps) {
  switch (win.kind) {
    case 'projects':
      return <ProjectExplorer />;
    case 'doc':
      return <DocViewer projectId={win.key ?? ''} />;
    case 'readme':
    case 'resume':
    case 'trash':
    case 'help':
      return <TextViewer kind={win.kind} />;
    case 'computer':
    case 'network':
      return <ListViewer kind={win.kind} />;
    case 'terminal':
      return <Terminal />;
    case 'pager':
      return <Pager />;
    case 'mine':
      return <Minesweeper />;
    case 'shut':
      return <ShutdownDialog />;
    default: {
      const exhaustive: never = win.kind;
      return exhaustive;
    }
  }
}
