import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Orderlyze Hilfe-Center',
  tagline: 'Anleitungen und Hilfestellung für Orderlyze',
  favicon: 'img/favicon.ico',

  headTags: [
    { tagName: 'link', attributes: { rel: 'manifest', href: '/manifest.json' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', href: '/img/apple-touch-icon.png' } },
    { tagName: 'meta', attributes: { name: 'theme-color', content: '#2563eb' } },
    { tagName: 'meta', attributes: { name: 'apple-mobile-web-app-title', content: 'Orderlyze Hilfe' } },
  ],

  url: 'https://hilfe.orderlyze.com',
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
      title: 'Orderlyze Hilfe-Center',
      logo: {
        alt: 'Orderlyze Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: '/erste-schritte',
          position: 'left',
          label: 'Erste Schritte',
        },
        {
          to: '/handbuch',
          position: 'left',
          label: 'Handbuch',
        },
        {
          to: '/funktionen',
          position: 'left',
          label: 'Funktionen',
        },
        {
          to: '/faq',
          position: 'left',
          label: 'Häufig gestellte Fragen',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Dokumentation',
          items: [
            { label: 'Erste Schritte', to: '/erste-schritte' },
            { label: 'Handbuch', to: '/handbuch' },
            { label: 'Funktionen', to: '/funktionen' },
          ],
        },
        {
          title: 'Handbuch',
          items: [
            { label: 'Web Dashboard', to: '/' },
            { label: 'Bonier App', to: '/app' },
          ],
        },
        {
          title: 'Hilfe',
          items: [
            { label: 'Häufig gestellte Fragen', to: '/faq' },
          ],
        },
        {
          title: 'Orderlyze',
          items: [
            { label: 'Website', href: 'https://orderlyze.com' },
            { label: 'Support', href: 'mailto:office@orderlyze.com' },
          ],
        },
        {
          title: 'Rechtliches',
          items: [
            { label: 'Impressum', href: 'https://www.orderlyze.com/impressum' },
            { label: 'AGB', href: 'https://www.orderlyze.com/agb' },
            { label: 'Datenschutz', href: 'https://www.orderlyze.com/datenschutzerklaerung' },
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
