const rawVersions = require('../versioned-docs/versions');
const configuredPages = require('./config');

const normalizePage = ({slug, label, component}) => {
  if (!slug || !component) {
    throw new Error('Versioned pages must define both "slug" and "component".');
  }

  return {
    slug,
    label: label ?? slug,
    component,
  };
};

const versionedPages = configuredPages.map(normalizePage);
const versionSlugs = rawVersions.map(({version}) => version);
const latestVersion = versionSlugs.at(-1);

const buildVersionedPagePath = ({versionSlug, pageSlug}) =>
  `/docs/${versionSlug}/${pageSlug}`;

const createVersionedPagesConfig = () => ({
  customFields: {
    versionedPages: versionedPages.map(({slug, label}) => ({slug, label})),
    latestVersionedPagePaths: Object.fromEntries(
      versionedPages.map(({slug}) => [
        slug,
        buildVersionedPagePath({
          versionSlug: latestVersion,
          pageSlug: slug,
        }),
      ]),
    ),
  },
  routes: versionSlugs.flatMap((versionSlug) =>
    versionedPages.map((page) => ({
      path: buildVersionedPagePath({
        versionSlug,
        pageSlug: page.slug,
      }),
      component: page.component,
      modules: {},
      exact: true,
      customProps: {
        pageSlug: page.slug,
        versionSlug,
      },
    })),
  ),
});

module.exports = {
  buildVersionedPagePath,
  createVersionedPagesConfig,
};
