import { contextBridge, ipcRenderer } from 'electron';

declare global {
  interface Bridge {
    getState: typeof getState;
    forward: typeof forward;
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

const forward = (path: string[], value: any) => {
  ipcRenderer.send('ev-forward', path, JSON.stringify(value));
};

const bridge = {
  getState,
  forward,
};

try {
  contextBridge.exposeInMainWorld('ElectronValtioBridge', bridge);
} catch {
  window.ElectronValtioBridge = bridge;
}
