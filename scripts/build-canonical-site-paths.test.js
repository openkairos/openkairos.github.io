const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildAbsoluteSiteUrl,
  buildCanonicalDocsContentPath,
  buildCanonicalDocsRootPath,
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
  buildSharedDocsManifestPath,
} = require('./build-canonical-site-paths');

test('builds canonical docs root for the default branch version', () => {
  const docsRootPath = buildCanonicalDocsRootPath({
    docsSiteBase: '/',
    defaultBranch: '1.x',
    versionSlug: '1.x',
  });

  assert.equal(docsRootPath, '/docs/');
});

test('builds canonical docs root for a non-default version', () => {
  const docsRootPath = buildCanonicalDocsRootPath({
    docsSiteBase: '/',
    defaultBranch: '1.x',
    versionSlug: 'next',
  });

  assert.equal(docsRootPath, '/docs/next/');
});

test('builds current docs content paths from the active docs route base path', () => {
  const docsContentPath = buildCurrentDocsContentPath({
    baseUrl: '/',
    docsRouteBasePath: 'docs/next',
    docPath: 'getting-started',
  });

  assert.equal(docsContentPath, '/docs/next/getting-started');
});

test('builds canonical docs content paths', () => {
  const docsContentPath = buildCanonicalDocsContentPath({
    docsSiteBase: '/',
    defaultBranch: '1.x',
    versionSlug: '1.x',
    docPath: 'intro',
  });

  assert.equal(docsContentPath, '/docs/intro');
});

test('builds canonical home path', () => {
  const homePath = buildCanonicalHomePath({docsSiteBase: '/'});

  assert.equal(homePath, '/');
});

test('builds absolute site urls from canonical paths', () => {
  const siteUrl = buildAbsoluteSiteUrl({
    siteUrl: 'https://openkairos.github.io/',
    path: '/docs/',
  });

  assert.equal(siteUrl, 'https://openkairos.github.io/docs/');
});

test('builds the shared docs manifest path from the site base', () => {
  assert.equal(buildSharedDocsManifestPath({docsSiteBase: '/'}), '/docs/doc-paths.json');
  assert.equal(
    buildSharedDocsManifestPath({docsSiteBase: '/preview'}),
    '/preview/docs/doc-paths.json',
  );
});
