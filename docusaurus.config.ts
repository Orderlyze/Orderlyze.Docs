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
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Dokumentation',
        },
        {
          to: '/faq',
          position: 'left',
          label: 'FAQ',
        },
        {
          to: '/troubleshooting',
          position: 'left',
          label: 'Problemlösung',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Dokumentation',
          items: [
            { label: 'Erste Schritte', to: '/erste-schritte/profil' },
            { label: 'Stammdaten', to: '/stammdaten/kategorien' },
            { label: 'Auswertung', to: '/auswertung/berichte' },
          ],
        },
        {
          title: 'Hilfe',
          items: [
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
