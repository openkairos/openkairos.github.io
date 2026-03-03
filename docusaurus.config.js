const {
  buildVersionNavbarItems,
} = require('./scripts/build-version-navbar-items');
const {resolveDocsRuntime} = require('./scripts/resolve-docs-runtime');
const prismReact = require('prism-react-renderer');

const {
  versionSlug,
  siteUrl,
  baseUrl,
  docsSiteBase,
  versions,
} = resolveDocsRuntime();

const versionItems = buildVersionNavbarItems({
  versions,
  versionSlug,
  siteUrl,
  baseUrl,
  docsSiteBase,
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
        href: baseUrl,
      },
      items: [
        {
          to: '/docs/intro',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/api-docs',
          position: 'right',
          label: 'API Reference',
        },
        {
          label: `Version: ${versionSlug}`,
          position: 'right',
          items: versionItems,
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
        href: baseUrl,
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
          routeBasePath: 'docs',
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
        docsRouteBasePath: '/docs',
        hashed: true,
        language: ['en'],
      },
    ],
  ],
};

module.exports = config;
