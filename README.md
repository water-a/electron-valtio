# Electron Valtio

## What is this?

This library's purpose is to share state between the Electron main process and various renderer windows simply through mutations of an object. This library utilizes the [valtio library](https://github.com/pmndrs/valtio) to accomplish this.

This library was heavily inspired by electron-redux.

## How do I use it?

### Getting started

`npm i valtio https://github.com/water-a/electron-valtio`

#### Include the preload script when opening the browser window

```typescript
...
const window = new BrowserWindow({
  ...other options,
  webPreferences: {
    preload: path.resolve(__dirname, 'node_modules/electron-valtio/dist/preload.js')
  }
});
...
```

#### Initialize store in the main process

```typescript
import { snapshot } from 'valtio/vanilla';
import { setupMain } from 'electron-valtio';

const store = setupMain({
  count: 0,
});

setTimeout(() => {
  console.log(snapshot(store.count));
  // Output: 1
}, 2000);
```

#### Initialize store in the renderer process

```typescript
import { snapshot } from 'valtio/vanilla';
import { setupRenderer } from 'electron-valtio';

const store = setupRenderer();
console.log(snapshot(store.count));
// Output: 0

store.count++;
```

### Use all the features of Valtio

#### Main process

```typescript
import { store } from './store';
const incrementCount = () => (store.count += 1);
incrementCount();
```

#### Renderer process

```typescript
import React, { FC } from 'react';
import { useSnapshot } from 'valtio';
import { store } from './store';

export const Counter: FC => () => {
  const count = useSnapshot(store.count);
  return <>{count}</>
}
```
