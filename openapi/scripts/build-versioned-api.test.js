const test = require('node:test');
const assert = require('node:assert/strict');

const {
  assertVersionedSpecsExist,
  resolveOutputDir,
  resolveSpecPath,
} = require('./build-versioned-api');

test('resolves the versioned spec path from the docs version slug', () => {
  const specPath = resolveSpecPath('1.x');

  assert.match(specPath, /openapi\/1\.x\.yaml$/u);
});

test('resolves the versioned generated output directory from the docs version slug', () => {
  const outputDir = resolveOutputDir('1.x');

  assert.match(outputDir, /static\/openapi\/1\.x$/u);
});

test('fails when a published docs version has no matching OpenAPI spec', () => {
  const act = () => assertVersionedSpecsExist(['1.x', '2.x']);

  assert.throws(act, /Missing OpenAPI spec for version "2\.x"/u);
});
