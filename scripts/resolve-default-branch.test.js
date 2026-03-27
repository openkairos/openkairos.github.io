const test = require('node:test');
const assert = require('node:assert/strict');

const {resolveDefaultBranch} = require('./resolve-default-branch');

test('returns the configured default branch', () => {
  const defaultBranch = resolveDefaultBranch();

  assert.equal(defaultBranch, '1.x');
});
