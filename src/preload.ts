import { contextBridge, ipcRenderer } from 'electron';

declare global {
  interface Bridge {
    getState: typeof getState;
  }
  interface Window {
    ElectronValtioBridge: Bridge;
  }
  const ElectronValtioBridge: Bridge;
}

export const getState = () => {
  const state = ipcRenderer.sendSync('ev-get-state');
  return JSON.parse(state);
};

const bridge = {
  getState,
};

try {
  contextBridge.exposeInMainWorld('ElectronValtioBridge', bridge);
} catch {
  window.ElectronValtioBridge = bridge;
}
