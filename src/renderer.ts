import { proxy } from 'valtio/vanilla';
import { setup } from './setup';
import { sync } from './sync';

export const setupRenderer = <T extends object>(): T => {
  let store: T;
  const state = ElectronValtioBridge.getState<T>((path, value) => {
    sync(store, path, JSON.parse(value));
  });
  store = setup(proxy(state), (path, value) => {
    ElectronValtioBridge.forward(path, JSON.stringify(value));
  });
  return store;
};
