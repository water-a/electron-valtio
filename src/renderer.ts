import { proxy } from 'valtio/vanilla';
import { sync } from './sync';

export const setupRenderer = <T extends object>(): T => {
  let store: T;
  const state = ElectronValtioBridge.getState<T>((path, value) => {
    sync(store, path, value);
  });
  store = proxy(state);
  return store;
};
