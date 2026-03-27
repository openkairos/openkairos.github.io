const test = require('node:test');
const assert = require('node:assert/strict');

const {
  parseCurrentDocPath,
  resolveVersionSwitchTarget,
} = require('./resolve-version-switch-target');

test('parses the current doc path from the default branch docs route', () => {
  const currentDocPath = parseCurrentDocPath({
    currentPathname: '/docs/getting-started',
    defaultBranch: '1.x',
    docsSiteBase: '/',
    targetVersion: 'next',
  });

  assert.equal(currentDocPath, 'getting-started');
});

test('preserves the current doc path when the target version has it', () => {
  const target = resolveVersionSwitchTarget({
    availableDocPathsByVersion: {
      '1.x': ['intro', 'getting-started'],
      next: ['intro', 'getting-started'],
    },
    currentPathname: '/docs/getting-started',
    defaultBranch: '1.x',
    docsSiteBase: '/',
    fallbackDocPath: 'intro',
    targetVersion: 'next',
  });

  assert.equal(target, '/docs/next/getting-started');
});

test('falls back when the target version does not have the current doc path', () => {
  const target = resolveVersionSwitchTarget({
    availableDocPathsByVersion: {
      '1.x': ['intro', 'getting-started'],
      next: ['intro'],
    },
    currentPathname: '/docs/getting-started',
    defaultBranch: '1.x',
    docsSiteBase: '/',
    fallbackDocPath: 'intro',
    targetVersion: 'next',
  });

  assert.equal(target, '/docs/next/intro');
});
