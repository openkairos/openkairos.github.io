const test = require('node:test');
const assert = require('node:assert/strict');

const {resolveVersionSlug, sanitizeBranchName} = require('./resolve-version-slug');

test('maps main to next', () => {
  const versionSlug = resolveVersionSlug('main');

  assert.equal(versionSlug, 'next');
});

test('sanitizes release branch names', () => {
  const branchName = sanitizeBranchName('Release Candidate.x');

  assert.equal(branchName, 'release-candidate.x');
});
