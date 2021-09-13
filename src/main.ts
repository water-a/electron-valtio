import { proxy, snapshot } from 'valtio';
import { ipcMain, webContents } from 'electron';
import { setup } from './setup';
import { sync } from './sync';

const refPaths = new Set<string>();
export const markPathAsRef = (path: string) => {
  refPaths.add(path);
};

export const setupMain = <T extends object>(initialObject: T) => {
  const store = proxy(initialObject);
  ipcMain.on('ev-forward', (_, path: string[], value: string) =>
    sync(store, path, JSON.parse(value), refPaths),
  );
  ipcMain.on('ev-get-state', (event) => {
    event.returnValue = JSON.stringify(snapshot(store));
  });
  ipcMain.on('ev-get-ref-paths', (event) => {
    event.returnValue = Array.from(refPaths);
  });
  return setup(store, (path, value) =>
    webContents
      .getAllWebContents()
      .forEach((contents) =>
        contents.send('ev-forward', path, JSON.stringify(value)),
      ),
  );
};
