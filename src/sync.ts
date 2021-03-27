export const sync = (target: any, path: string[], value: any) => {
  let curr = target;
  let index = 0;
  while (index < path.length - 1 && curr != null) {
    curr = target[path[index]];
    index += 1;
  }
  if (curr != null) {
    curr[path[index]] = value;
  } else {
    throw new Error('Failed to sync!');
  }
};
