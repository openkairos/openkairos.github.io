const prismReact = require('prism-react-renderer');
const createRegistryConfig = require('./versioned-docs/registry/registry');

const siteUrl = process.env.SITE_URL ?? 'https://openkairos.github.io';
const registryConfig = createRegistryConfig();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open Kairos',
  tagline: 'Open source CDP documentation',
  favicon: 'img/favicon.svg',
  url: siteUrl,
  baseUrl: '/',
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
  customFields: registryConfig.customFields,
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
        href: '/',
      },
      items: [
        {
          href: registryConfig.customFields.docsIntroPath,
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
          position: 'right',
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
        href: '/',
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
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    ...registryConfig.docsPlugins,
    [
      '@easyops-cn/docusaurus-search-local',
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        hashed: true,
        language: ['en'],
        docsRouteBasePath: registryConfig.search.docsRouteBasePath,
        searchContextByPaths: registryConfig.search.searchContextByPaths,
        hideSearchBarWithNoSearchContext: true,
      },
    ],
  ],
};

module.exports = config;
