import { contextBridge, ipcRenderer } from 'electron';

declare global {
  interface Bridge {
    getState: typeof getState;
    forward: typeof forward;
    getRefPaths: typeof getRefPaths;
  }
  interface Window {
    ElectronValtioBridge: Bridge;
  }
  const ElectronValtioBridge: Bridge;
}

const getState = <T>(
  subscriber: (path: string[], value: string) => void,
): T => {
  const state = ipcRenderer.sendSync('ev-get-state');
  ipcRenderer.on('ev-forward', (_, path: string[], value: string) => {
    subscriber(path, JSON.parse(value));
  });
  return JSON.parse(state);
};

const forward = (path: string[], value: string) => {
  ipcRenderer.send('ev-forward', path, value);
};

const getRefPaths = (): Set<string> =>
  new Set(ipcRenderer.sendSync('ev-get-ref-paths'));

const bridge = {
  getState,
  forward,
  getRefPaths,
};

try {
  contextBridge.exposeInMainWorld('ElectronValtioBridge', bridge);
} catch {
  window.ElectronValtioBridge = bridge;
}
