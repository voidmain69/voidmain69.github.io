import { beforeEach, describe, expect, it } from 'vitest';
import { useWindowManagerStore, windowId } from './windowManager';

function reset() {
  useWindowManagerStore.setState({ windows: [], z: 20 });
}

describe('windowManager store', () => {
  beforeEach(reset);

  it('open() creates a window with an incrementing z and default position', () => {
    const { open } = useWindowManagerStore.getState();
    open('readme');
    open('terminal');

    const { windows } = useWindowManagerStore.getState();
    expect(windows).toHaveLength(2);
    expect(windows[0]?.id).toBe(windowId('readme'));
    expect(windows[1]?.z).toBeGreaterThan(windows[0]?.z ?? 0);
    expect(windows[0]?.x).toBe(190);
    expect(windows[0]?.y).toBe(42);
  });

  it('open() on an already-open id focuses and un-minimizes instead of duplicating', () => {
    const { open, minimize } = useWindowManagerStore.getState();
    open('readme');
    minimize(windowId('readme'));
    open('terminal');
    open('readme');

    const { windows } = useWindowManagerStore.getState();
    expect(windows).toHaveLength(2);
    const readme = windows.find((w) => w.id === windowId('readme'));
    expect(readme?.minimized).toBe(false);
    expect(readme?.z).toBe(useWindowManagerStore.getState().z);
  });

  it('close() removes the window by id', () => {
    const { open, close } = useWindowManagerStore.getState();
    open('readme');
    open('terminal');
    close(windowId('readme'));

    const { windows } = useWindowManagerStore.getState();
    expect(windows).toHaveLength(1);
    expect(windows[0]?.id).toBe(windowId('terminal'));
  });

  it('focus() only bumps z when the window is not already topmost', () => {
    const { open, focus } = useWindowManagerStore.getState();
    open('readme');
    open('terminal');
    const zBefore = useWindowManagerStore.getState().z;

    focus(windowId('terminal'));
    expect(useWindowManagerStore.getState().z).toBe(zBefore);

    focus(windowId('readme'));
    expect(useWindowManagerStore.getState().z).toBe(zBefore + 1);
  });

  it('minimize() and toggleMaximize() flip their respective flags', () => {
    const { open, minimize, toggleMaximize } = useWindowManagerStore.getState();
    open('readme');
    const id = windowId('readme');

    minimize(id);
    expect(useWindowManagerStore.getState().windows.find((w) => w.id === id)?.minimized).toBe(true);

    toggleMaximize(id);
    toggleMaximize(id);
    expect(useWindowManagerStore.getState().windows.find((w) => w.id === id)?.maximized).toBe(
      false,
    );
  });

  it('closeAll() clears every window', () => {
    const { open, closeAll } = useWindowManagerStore.getState();
    open('readme');
    open('terminal');
    closeAll();
    expect(useWindowManagerStore.getState().windows).toHaveLength(0);
  });
});
