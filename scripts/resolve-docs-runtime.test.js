const test = require('node:test');
const assert = require('node:assert/strict');

const {resolveDocsRuntime} = require('./resolve-docs-runtime');

test('rejects missing branch inputs', () => {
  const act = () => resolveDocsRuntime({});

  assert.throws(act, /DOCS_CURRENT_BRANCH must be provided/);
});

test('uses explicit local runtime branch inputs', () => {
  const env = {
    DOCS_CURRENT_BRANCH: '1.x',
    DOCS_DEFAULT_BRANCH: '1.x',
  };

  const runtime = resolveDocsRuntime(env);

  assert.deepEqual(runtime, {
    currentBranch: '1.x',
    defaultBranch: '1.x',
    isDefaultBranch: true,
    versionSlug: '1.x',
    siteUrl: 'http://localhost:3000',
    baseUrl: '/',
    docsSiteBase: '/',
    docsRouteBasePath: 'docs',
    versions: ['1.x'],
  });
});

test('maps main to next under a versioned docs route base path', () => {
  const env = {
    DOCS_CURRENT_BRANCH: 'main',
    DOCS_DEFAULT_BRANCH: '1.x',
    DOCS_VERSIONS: '1.x,next',
  };

  const runtime = resolveDocsRuntime(env);

  assert.deepEqual(runtime, {
    currentBranch: 'main',
    defaultBranch: '1.x',
    isDefaultBranch: false,
    versionSlug: 'next',
    siteUrl: 'http://localhost:3000',
    baseUrl: '/',
    docsSiteBase: '/',
    docsRouteBasePath: 'docs/next',
    versions: ['1.x', 'next'],
  });
});
