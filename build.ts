// eslint-disable-next-line import/no-extraneous-dependencies
import esbuild from 'esbuild';
import { resolve } from 'path';

export const setNonRelativeImportsAsExternalPlugin: esbuild.Plugin = {
  name: 'Set non-relative imports as external',
  setup(build) {
    build.onResolve({ filter: /^[^\.]/ }, ({ path, namespace }) => {
      if (namespace === '') {
        return {};
      }
      return { path, external: true };
    });
  },
};

esbuild.build({
  bundle: true,
  entryPoints: [resolve(__dirname, 'src/preload.ts')],
  platform: 'node',
  plugins: [setNonRelativeImportsAsExternalPlugin],
  outfile: resolve(__dirname, 'dist/preload.js'),
});
