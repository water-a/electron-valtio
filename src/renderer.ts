import { proxy, ref } from 'valtio/vanilla';
import { setup } from './setup';
import { sync } from './sync';

export const setupRenderer = <T extends object>(): T => {
  let store: T;
  const refPaths = ElectronValtioBridge.getRefPaths();
  const state = ElectronValtioBridge.getState<T>((path, value) => {
    sync(store, path, JSON.parse(value), refPaths);
  });

  const target = proxy(state);
  for (const pathKey of refPaths) {
    const path = pathKey.split('.');
    let curr = target as any;
    let value = state as any;
    let index = 0;
    while (index < path.length - 1 && curr != null && value != null) {
      curr = curr[path[index]];
      value = value[path[index]];
      index += 1;
    }
    if (
      curr != null &&
      value != null &&
      curr[path[index]] &&
      value[path[index]]
    ) {
      curr[path[index]] = ref(value[path[index]]);
    }
  }

  store = setup(target, (path, value) => {
    ElectronValtioBridge.forward(path, JSON.stringify(value));
  });
  return store;
};
