export const setup = <T extends Record<string, any>>(
  initialObject: T,
  onSet: (path: string[], value: any) => void,
  path: string[] = [],
): T => {
  const baseObject = Array.isArray(initialObject)
    ? []
    : Object.create(Object.getPrototypeOf(initialObject));
  return new Proxy(baseObject, {
    get(_, prop: string) {
      const accessed = initialObject[prop];
      if (
        typeof prop !== 'symbol' &&
        (typeof accessed === 'object' || typeof accessed === 'function') &&
        accessed != null
      ) {
        return setup(accessed, onSet, [...path, prop]);
      }
      return initialObject[prop];
    },
    set(_, prop: string, value) {
      onSet([...path, prop], value);
      // @ts-ignore
      initialObject[prop] = value;
      return true;
    },
  });
};
