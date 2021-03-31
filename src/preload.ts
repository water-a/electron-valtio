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

const getState = <T>(subscriber: (path: string[], value: any) => void): T => {
  const state = ipcRenderer.sendSync('ev-get-state');
  ipcRenderer.on('ev-forward', (_, path: string[], value: any) => {
    subscriber(path, value);
  });
  return JSON.parse(state);
};

const forward = (path: string[], value: any) => {
  ipcRenderer.send('ev-forward', path, value);
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
