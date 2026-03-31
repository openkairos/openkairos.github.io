const test = require('node:test');
const assert = require('node:assert/strict');

const rawVersions = require('../versions');
const createRegistryConfig = require('./registry');

test('registry config derives versioned docs settings from raw declarations', () => {
  const registryConfig = createRegistryConfig();
  const {customFields, docsPlugins, search} = registryConfig;
  const {docPathManifest, latestVersion, versions} = customFields;

  assert.deepEqual(rawVersions, [
    {
      version: '1.x',
      introDocId: 'overview/intro',
      fallbackDocId: 'overview/intro',
      quickStartDocId: 'getting-started/quick-start',
    },
  ]);

  assert.deepEqual(versions, [
    {
      slug: '1.x',
      label: '1.x',
      routeBasePath: 'docs/1.x',
      introDocId: 'overview/intro',
      fallbackDocId: 'overview/intro',
    },
  ]);

  assert.equal(docPathManifest['1.x'].includes('overview/intro'), true);
  assert.equal(docPathManifest['1.x'].includes('overview/aletheia'), true);
  assert.equal(docPathManifest['1.x'].includes('concepts/system-model'), true);

  assert.deepEqual(search.searchContextByPaths, [
    {label: '1.x', path: 'docs/1.x'},
  ]);
  assert.deepEqual(search.docsRouteBasePath, ['docs/1.x']);

  assert.equal(docsPlugins.length, 1);
  assert.equal(docsPlugins[0][1].routeBasePath, 'docs/1.x');
  assert.equal(docsPlugins[0][1].id, undefined);
  assert.equal(docsPlugins[0][1].sidebarPath, undefined);

  assert.equal(latestVersion, '1.x');
  assert.equal(customFields.docsIntroPath, '/docs/1.x/overview/intro');
  assert.equal(
    customFields.docsQuickStartPath,
    '/docs/1.x/getting-started/quick-start',
  );
});
