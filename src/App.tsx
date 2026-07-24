import { useEffect, useState } from 'react';
import { useSystemStore } from './store/system';
import { useWindowManagerStore } from './store/windowManager';
import { useAssistantTimer } from './hooks/useAssistantTimer';
import { BootScreen } from './components/os/BootScreen';
import { BSOD } from './components/os/BSOD';
import { Desktop } from './components/os/Desktop';
import { Taskbar } from './components/os/Taskbar';
import { StartMenu } from './components/os/StartMenu';
import { Assistant } from './components/os/Assistant';

export function App() {
  const [booting, setBooting] = useState(true);
  const startOpen = useSystemStore((s) => s.startOpen);
  const closeStart = useSystemStore((s) => s.closeStart);
  const assistantVisible = useSystemStore((s) => s.assistantVisible);
  const crashed = useSystemStore((s) => s.crashed);
  const recoverFromCrash = useSystemStore((s) => s.recoverFromCrash);
  const closeAllWindows = useWindowManagerStore((s) => s.closeAll);

  useAssistantTimer();

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!startOpen) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-start]')) return;
      closeStart();
    }
    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, [startOpen, closeStart]);

  if (booting) {
    return <BootScreen onDone={() => setBooting(false)} />;
  }

  if (crashed) {
    return (
      <BSOD
        onReboot={() => {
          recoverFromCrash();
          closeAllWindows();
          setBooting(true);
        }}
      />
    );
  }

  return (
    <>
      <Desktop />
      <Taskbar />
      {startOpen && <StartMenu />}
      {assistantVisible && <Assistant />}
    </>
  );
}
