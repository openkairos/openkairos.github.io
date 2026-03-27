const test = require('node:test');
const assert = require('node:assert/strict');

const {resolvePublishLayout} = require('./resolve-publish-layout');

test('publishes default branch output to root and docs', () => {
  const layout = resolvePublishLayout({
    currentBranch: '1.x',
    defaultBranch: '1.x',
    siteBase: '/',
    versionSlug: '1.x',
  });

  assert.deepEqual(layout, {
    buildBaseUrl: '/',
    docsRouteBasePath: 'docs',
    isDefaultBranch: true,
    publishSourceDir: 'build',
    publishTargetDir: '.gh-pages',
    versionedDocsDir: '.gh-pages/docs/1.x',
  });
});

test('publishes main docs under docs next', () => {
  const layout = resolvePublishLayout({
    currentBranch: 'main',
    defaultBranch: '1.x',
    siteBase: '/',
    versionSlug: 'next',
  });

  assert.deepEqual(layout, {
    buildBaseUrl: '/',
    docsRouteBasePath: 'docs/next',
    isDefaultBranch: false,
    publishSourceDir: 'build/docs/next',
    publishTargetDir: '.gh-pages/docs/next',
    versionedDocsDir: '.gh-pages/docs/next',
  });
});
