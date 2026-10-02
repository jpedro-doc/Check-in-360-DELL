import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const require = createRequire(import.meta.url);
const cliPackage = require('@tailwindcss/cli/package.json');
const cli = join(dirname(require.resolve('@tailwindcss/cli/package.json')), cliPackage.bin.tailwindcss);

// Compile first: a compilation failure must not erase the previous output.
execFileSync(process.execPath, [cli, '-i', './src/input.css', '-o', './styles.css', '--minify'], {
  cwd: root,
  stdio: 'inherit',
});

const output = join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'styles.css', 'script.js', 'assets', '360 ROAD SHOW.pdf']) {
  await cp(join(root, name), join(output, name), { recursive: true });
}
console.log('Site pronto para publicação em dist/');
