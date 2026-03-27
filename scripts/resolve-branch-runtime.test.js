const test = require('node:test');
const assert = require('node:assert/strict');

const {resolveBranchRuntime} = require('./resolve-branch-runtime');

test('defaults current and default branch to configured default branch', () => {
  const runtime = resolveBranchRuntime({});

  assert.deepEqual(runtime, {
    currentBranch: '1.x',
    defaultBranch: '1.x',
    isDefaultBranch: true,
  });
});

test('uses explicit branch overrides when provided', () => {
  const runtime = resolveBranchRuntime({
    DOCS_CURRENT_BRANCH: 'main',
    DOCS_DEFAULT_BRANCH: '1.x',
  });

  assert.deepEqual(runtime, {
    currentBranch: 'main',
    defaultBranch: '1.x',
    isDefaultBranch: false,
  });
});
