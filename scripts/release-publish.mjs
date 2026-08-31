import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const token = process.env.NPM_TOKEN?.trim();

if (token) {
  process.env.NPM_TOKEN = token;
  process.env.NODE_AUTH_TOKEN = token;
  console.log('Using npm token auth for release publish');
} else {
  delete process.env.NPM_TOKEN;
  delete process.env.NODE_AUTH_TOKEN;
  console.log('No npm token found; using npm trusted publishing');

  const npmrcPaths = [
    path.join(os.homedir(), '.npmrc'),
    path.resolve('.npmrc'),
  ];

  for (const npmrcPath of npmrcPaths) {
    if (existsSync(npmrcPath)) {
      const content = readFileSync(npmrcPath, 'utf8');
      const filtered = content
        .split('\n')
        .filter((line) => !line.includes('_authToken='))
        .join('\n');
      writeFileSync(npmrcPath, filtered, 'utf8');
    }
  }
}

const executable = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(executable, ['changeset', 'publish'], {
  stdio: 'inherit',
  env: process.env,
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);