import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nuxtModule = join(root, 'node_modules/@aero-cms/vue-sdk/dist/nuxt.mjs');
if (!existsSync(nuxtModule)) process.exit(0);
const src = readFileSync(nuxtModule, 'utf8');
const fixed = src.replaceAll('../../runtime/plugin', '../runtime/plugin');
if (fixed !== src) writeFileSync(nuxtModule, fixed);
