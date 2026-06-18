import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const allowedPackage = '@a11ypros/a11y-ui-components';
const changesetDir = path.resolve('.changeset');

const entries = await readdir(changesetDir, { withFileTypes: true });
const changesetFiles = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md')
  .map((entry) => path.join(changesetDir, entry.name));

for (const filePath of changesetFiles) {
  const content = await readFile(filePath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    continue;
  }

  const referencedPackages = Array.from(
    match[1].matchAll(/['"]([^'"\n]+)['"]\s*:/g),
    ([, packageName]) => packageName,
  );

  const invalidPackages = referencedPackages.filter((packageName) => packageName !== allowedPackage);

  if (invalidPackages.length > 0) {
    console.error(
      `Changeset ${path.basename(filePath)} references unsupported package(s): ${invalidPackages.join(', ')}`,
    );
    console.error(`Only ${allowedPackage} is allowed in this repository's release workflow.`);
    process.exit(1);
  }
}

console.log(`Validated ${changesetFiles.length} changeset file(s); only ${allowedPackage} is referenced.`);