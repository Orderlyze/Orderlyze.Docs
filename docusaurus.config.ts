import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Orderlyze Hilfe',
  tagline: 'Dokumentation und Hilfe für Orderlyze',
  favicon: 'img/favicon.ico',

  url: 'https://docs.orderlyze.com',
  baseUrl: '/',

  organizationName: 'orderlyze',
  projectName: 'orderlyze-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',

  markdown: {
    preprocessor: ({ fileContent }) => fileContent,
  },

  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/orderlyze-social-card.jpg',
    navbar: {
      title: 'Orderlyze Hilfe',
      logo: {
        alt: 'Orderlyze Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialsSidebar',
          position: 'left',
          label: 'Tutorials',
        },
        {
          type: 'docSidebar',
          sidebarId: 'troubleshootingSidebar',
          position: 'left',
          label: 'Problemlösung',
        },
        {
          type: 'docSidebar',
          sidebarId: 'faqSidebar',
          position: 'left',
          label: 'FAQ',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Dokumentation',
          items: [
            { label: 'Tutorials', to: '/tutorials/kategorien' },
            { label: 'Problemlösung', to: '/troubleshooting/drucker-druckt-nicht' },
            { label: 'FAQ', to: '/faq/wie-exportiere-ich-daten' },
          ],
        },
        {
          title: 'Orderlyze',
          items: [
            { label: 'Website', href: 'https://orderlyze.com' },
            { label: 'Support', href: 'mailto:support@orderlyze.com' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Orderlyze. Alle Rechte vorbehalten.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
