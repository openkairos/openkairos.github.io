const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildVersionedPagePath,
  createVersionedPagesConfig,
} = require('./index');

test('builds a canonical route for a versioned page', () => {
  const route = buildVersionedPagePath({
    versionSlug: '1.x',
    pageSlug: 'api-reference',
  });

  assert.equal(route, '/docs/1.x/api-reference');
});

test('derives versioned page metadata without coupling to docs registry', () => {
  const versionedPagesConfig = createVersionedPagesConfig();

  const latestApiReferencePath =
    versionedPagesConfig.customFields.latestVersionedPagePaths['api-reference'];

  assert.deepEqual(versionedPagesConfig.customFields.versionedPages, [
    {
      slug: 'api-reference',
      label: 'API Reference',
    },
  ]);
  assert.equal(latestApiReferencePath, '/docs/1.x/api-reference');
  assert.equal(versionedPagesConfig.routes.length, 1);
  assert.equal(versionedPagesConfig.routes[0].path, '/docs/1.x/api-reference');
});
