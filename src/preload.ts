import { contextBridge, ipcRenderer } from 'electron';
import { proxy } from 'valtio/vanilla';
import { setup } from './setup';
import { sync } from './sync';

declare global {
  interface Bridge {
    getStore: typeof getStore;
  }
  interface Window {
    ElectronValtioBridge: Bridge;
  }
  const ElectronValtioBridge: Bridge;
}

const getState = () => {
  const state = ipcRenderer.sendSync('ev-get-state');
  return JSON.parse(state);
};

const getStore = () => {
  let store = proxy(getState());
  ipcRenderer.on('ev-forward', (_, path: string[], value: any) => {
    try {
      sync(store, path, value);
    } catch {
      store = proxy(getState());
    }
  });
  return setup(store, (path, value) =>
    ipcRenderer.send('ev-forward', path, value),
  );
};

const bridge = {
  getStore,
};

try {
  contextBridge.exposeInMainWorld('ElectronValtioBridge', bridge);
} catch {
  window.ElectronValtioBridge = bridge;
}
