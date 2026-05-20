import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    // Web Dashboard Bereich
    {
      type: 'category',
      label: 'Web Dashboard',
      collapsed: false,
      collapsible: true,
      className: 'sidebar-section-header',
      link: {
        type: 'doc',
        id: 'home',
      },
      items: [
        'erste-schritte',
        {
          type: 'category',
          label: 'Verwaltung',
          collapsed: true,
          link: {
            type: 'generated-index',
            description: 'Kategorien, Produkte, Extras, Gutscheine, Gänge, Benutzer und Stammkunden verwalten.',
          },
          items: [
            'stammdaten/kategorien/kategorien',
            'stammdaten/produkte/produkte',
            'stammdaten/extras/extras',
            'stammdaten/gutscheine/gutscheine',
            'betrieb/gaenge/gaenge',
            'personal/kunden/kunden',
            'personal/benutzer/benutzer',
          ],
        },
        {
          type: 'category',
          label: 'Küche',
          collapsed: true,
          link: {
            type: 'generated-index',
            description: 'Küchenmonitor und Küchenbons verwalten.',
          },
          items: [
            'betrieb/kueche/kueche',
            'betrieb/kuechenbons/kuechenbons',
          ],
        },
        {
          type: 'category',
          label: 'Auswertung & Berichte',
          collapsed: true,
          link: {
            type: 'generated-index',
            description: 'Berichte, Statistiken und Buchhaltungs-Export.',
          },
          items: [
            'auswertung/berichte/berichte',
            {
              type: 'category',
              label: 'Weitere Berichte',
              collapsed: true,
              link: { type: 'doc', id: 'auswertung/weitere-berichte/weitere-berichte' },
              items: [
                'auswertung/weitere-berichte/rechnungsbericht/weitere-berichte-rechnungsbericht',
                'auswertung/weitere-berichte/tagesumsatzbericht/weitere-berichte-tagesumsatzbericht',
                'auswertung/weitere-berichte/produktbericht/weitere-berichte-produktbericht',
                'auswertung/weitere-berichte/zahlungsartenbericht/weitere-berichte-zahlungsartenbericht',
                'auswertung/weitere-berichte/kategoriebericht/weitere-berichte-kategoriebericht',
                'auswertung/weitere-berichte/stornobericht/weitere-berichte-stornobericht',
                'auswertung/weitere-berichte/benutzerbericht/weitere-berichte-benutzerbericht',
              ],
            },
            'auswertung/export/export',
          ],
        },
        {
          type: 'category',
          label: 'Einstellungen',
          collapsed: true,
          link: {
            type: 'generated-index',
            description: 'Unternehmens-Stammdaten und Buchhaltung konfigurieren.',
          },
          items: [
            'einstellungen/unternehmen/einstellungen-unternehmen',
            'einstellungen/adresse/einstellungen-adresse',
            'einstellungen/logo/einstellungen-logo',
            'einstellungen/rechnung/einstellungen-rechnung',
            'einstellungen/kundenrechnungen/einstellungen-kundenrechnungen',
            'einstellungen/finanzamt/einstellungen-finanzamt',
            'einstellungen/buchungskonten/einstellungen-buchungskonten',
            {
              type: 'category',
              label: 'Features aktivieren/deaktivieren',
              collapsed: true,
              link: { type: 'doc', id: 'einstellungen/features/einstellungen-features' },
              items: [
                'einstellungen/features/allgemein/einstellungen-features-allgemein',
                'einstellungen/features/benutzer/einstellungen-features-benutzer',
              ],
            },
          ],
        },
      ],
    },

    // Funktionen Bereich
    {
      type: 'category',
      label: 'Funktionen',
      collapsed: true,
      collapsible: true,
      className: 'sidebar-section-header',
      link: { type: 'doc', id: 'funktionen/funktionen' },
      items: [
        'funktionen/datenuebermittlung-finanzamt/funktionen-datenuebermittlung-finanzamt',
        'funktionen/kassenbuch/funktionen-kassenbuch',
        'funktionen/zahlungsarten/funktionen-zahlungsarten',
        'funktionen/tagesumsaetze/funktionen-tagesumsaetze',
        'funktionen/tischplan/funktionen-tischplan',
        'funktionen/dynamisches-produkt/funktionen-dynamisches-produkt',
        'funktionen/rechnungen-bearbeiten/funktionen-rechnungen-bearbeiten',
        'funktionen/bewirtungsbeleg/funktionen-bewirtungsbeleg',
        'funktionen/farbeinstellungen/funktionen-farbeinstellungen',
        'funktionen/abholung/funktionen-abholung',
        'funktionen/pfand/funktionen-pfand',
        'funktionen/steuer-aendern/funktionen-steuer-aendern',
      ],
    },

    // Bonier App Bereich
    {
      type: 'category',
      label: 'Bonier App',
      collapsed: true,
      collapsible: true,
      className: 'sidebar-section-header',
      link: {
        type: 'doc',
        id: 'app/app-home',
      },
      items: [
        { type: 'autogenerated', dirName: 'app' },
      ],
    },

    // Hilfe Bereich
    {
      type: 'category',
      label: 'Hilfe',
      collapsed: true,
      collapsible: true,
      className: 'sidebar-section-header',
      items: [
        {
          type: 'category',
          label: 'FAQ',
          collapsed: true,
          link: {
            type: 'generated-index',
            description: 'Häufig gestellte Fragen zu Orderlyze.',
          },
          items: [
            { type: 'autogenerated', dirName: 'faq' },
          ],
        },
        {
          type: 'category',
          label: 'Problemlösung',
          collapsed: true,
          link: {
            type: 'generated-index',
            description: 'Lösungen für häufige Probleme.',
          },
          items: [
            { type: 'autogenerated', dirName: 'troubleshooting' },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
