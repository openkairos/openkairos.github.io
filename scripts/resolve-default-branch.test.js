const test = require('node:test');
const assert = require('node:assert/strict');

const {LOCAL_PREVIEW_MODE} = require('./resolve-branch-runtime');
const {resolveDefaultBranch} = require('./resolve-default-branch');

test('defaults to the checked out branch when no default branch is injected', () => {
  const defaultBranch = resolveDefaultBranch();

  assert.equal(defaultBranch, '1.x');
});

test('uses the injected default branch when one is provided', () => {
  const defaultBranch = resolveDefaultBranch({
    DOCS_DEFAULT_BRANCH: '2.x',
  });

  assert.equal(defaultBranch, '2.x');
});

test('keeps the checked out branch canonical in local preview mode', () => {
  const defaultBranch = resolveDefaultBranch({
    DOCS_RUNTIME_MODE: LOCAL_PREVIEW_MODE,
    DOCS_DEFAULT_BRANCH: '2.x',
  });

  assert.equal(defaultBranch, '1.x');
});
