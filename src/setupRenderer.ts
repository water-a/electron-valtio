import { ipcRenderer } from 'electron';
import { proxy } from 'valtio';
import { setup } from './setup';
import { sync } from './sync';

export const setupRenderer = () => {
  let store = proxy(ElectronValtioBridge.getState());
  ipcRenderer.on('ev-forward', (_, path: string[], value: any) => {
    try {
      sync(store, path, value);
    } catch {
      store = proxy(ElectronValtioBridge.getState());
    }
  });
  return setup(store, (path, value) =>
    ipcRenderer.send('ev-forward', path, value),
  );
};
