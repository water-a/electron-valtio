// eslint-disable-next-line import/no-extraneous-dependencies
import { build, Plugin } from 'esbuild';
import { resolve } from 'path';

export const setNonRelativeImportsAsExternalPlugin: Plugin = {
  name: 'Set non-relative imports as external',
  setup({ onResolve }) {
    onResolve({ filter: /^[^\.]/ }, ({ path, namespace }) => {
      if (namespace === '') {
        return {};
      }
      return { path, external: true };
    });
  },
};

build({
  bundle: true,
  entryPoints: [resolve(__dirname, 'src/preload.ts')],
  platform: 'node',
  plugins: [setNonRelativeImportsAsExternalPlugin],
  outfile: resolve(__dirname, 'dist/preload.js'),
});
