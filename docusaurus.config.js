// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Intuit Intelligence Design',
  tagline: 'Source treatments, components, tokens, and patterns',
  favicon: 'img/favicon.ico',

  url: 'https://nicholashunter-coder.github.io',
  baseUrl: '/intuit-intelligence-design/',

  organizationName: 'nicholashunter-coder',
  projectName: 'intuit-intelligence-design',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Intuit Intelligence Design',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/nicholashunter-coder/intuit-intelligence-design',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Getting Started', to: '/' },
              { label: 'Design', to: '/design/inline-treatments' },
              { label: 'FAQ', to: '/faq' },
            ],
          },
          {
            title: 'Resources',
            items: [
              { label: 'GitHub', href: 'https://github.com/nicholashunter-coder/intuit-intelligence-design' },
            ],
          },
        ],
        copyright: `Intuit Intelligence — Platform Design · ${new Date().getFullYear()}`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
      },
    }),
};

module.exports = config;
