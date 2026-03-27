const {resolveDocsRuntime} = require('./scripts/resolve-docs-runtime');
const {versionFallbackDocPath} = require('./docs-site.config');
const prismReact = require('prism-react-renderer');
const {
  buildCanonicalHomePath,
  buildCurrentDocsContentPath,
} = require('./scripts/build-canonical-site-paths');

const {
  versionSlug,
  siteUrl,
  baseUrl,
  docsSiteBase,
  docsRouteBasePath,
  defaultBranch,
  versions,
} = resolveDocsRuntime();
const homePath = buildCanonicalHomePath({docsSiteBase});
const docsIntroPath = buildCurrentDocsContentPath({
  baseUrl,
  docsRouteBasePath,
  docPath: 'intro',
});
const docsGettingStartedPath = buildCurrentDocsContentPath({
  baseUrl,
  docsRouteBasePath,
  docPath: 'getting-started',
});

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open Kairos',
  tagline: 'Open Source CDP',
  favicon: 'img/favicon.svg',
  url: siteUrl,
  baseUrl,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  customFields: {
    defaultBranch,
    homePath,
    docsSiteBase,
    docsIntroPath,
    docsGettingStartedPath,
    versionFallbackDocPath,
  },
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Open Kairos',
      logo: {
        alt: 'Open Kairos Logo',
        src: 'img/favicon.svg',
        href: homePath,
      },
      items: [
        {
          to: docsIntroPath,
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/api-docs',
          position: 'right',
          label: 'API Reference',
        },
        {
          type: 'custom-version-switcher',
          currentVersion: versionSlug,
          position: 'right',
          versions,
        },
        {
          href: 'https://github.com/openkairos',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © 2026 Kairos.`,
      logo: {
        alt: 'Kairos Logo',
        src: 'img/favicon.svg',
        href: homePath,
        width: 32,
        height: 32,
      },
    },
    prism: {
      theme: prismReact.themes.github,
      darkTheme: prismReact.themes.dracula,
    },
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: docsRouteBasePath,
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: `/${docsRouteBasePath}`,
        hashed: true,
        language: ['en'],
      },
    ],
  ],
};

module.exports = config;
