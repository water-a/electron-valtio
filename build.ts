import { build, Plugin } from 'esbuild';
import path from 'path';

export const setNonRelativeImportsAsExternalPlugin: Plugin = {
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

const resolvePath = (filePath: string) => path.resolve(__dirname, filePath);

build({
  bundle: true,
  entryPoints: [resolvePath('src/preload.ts')],
  platform: 'node',
  plugins: [setNonRelativeImportsAsExternalPlugin],
  outfile: resolvePath('dist/preload.js'),
});
