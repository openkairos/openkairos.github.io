const test = require('node:test');
const assert = require('node:assert/strict');
const {mkdtempSync, mkdirSync, writeFileSync} = require('node:fs');
const {join} = require('node:path');
const {tmpdir} = require('node:os');

const {collectDocsPaths} = require('./build-docs-path-manifest');

test('collects logical docs paths from markdown files', () => {
  const rootDir = mkdtempSync(join(tmpdir(), 'kairos-docs-'));
  mkdirSync(join(rootDir, 'guides'));
  writeFileSync(join(rootDir, 'intro.md'), '# Intro\n');
  writeFileSync(join(rootDir, 'guides', 'index.md'), '# Guides\n');
  writeFileSync(join(rootDir, 'guides', 'advanced.mdx'), '# Advanced\n');

  const docPaths = collectDocsPaths(rootDir);

  assert.deepEqual(docPaths, ['guides', 'guides/advanced', 'intro']);
});
