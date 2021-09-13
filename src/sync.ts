import { ref } from 'valtio/vanilla';

export const sync = (
  target: any,
  path: string[],
  value: any,
  refPaths: Set<string>,
) => {
  let curr = target;
  let index = 0;
  while (index < path.length - 1 && curr != null) {
    curr = curr[path[index]];
    index += 1;
  }
  if (curr != null) {
    const pathKey = path.join('.');
    if (refPaths.has(pathKey)) {
      curr[path[index]] = ref(value);
    } else {
      curr[path[index]] = value;
    }
  } else {
    throw new Error('Failed to sync!');
  }
};
