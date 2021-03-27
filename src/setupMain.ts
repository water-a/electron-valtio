import { proxy, snapshot } from 'valtio';
import { ipcMain, webContents } from 'electron';
import { setup } from './setup';
import { sync } from './sync';

export const setupMain = (initialObject: object) => {
  const store = proxy(initialObject);
  ipcMain.on('ev-forward', (_, path: string[], value: any) =>
    sync(store, path, value),
  );
  ipcMain.on('ev-get-state', (event) => {
    event.returnValue = JSON.stringify(snapshot(store));
  });
  return setup(store, (path, value) =>
    webContents
      .getAllWebContents()
      .forEach((contents) => contents.send('ev-forward', path, value)),
  );
};
