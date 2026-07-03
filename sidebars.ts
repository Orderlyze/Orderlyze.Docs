import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    // Erste Schritte (oberster Eintrag)
    'erste-schritte/erste-schritte',

    // Handbuch (Web Dashboard + Bonier App)
    {
      type: 'category',
      label: 'Handbuch',
      collapsed: false,
      collapsible: true,
      className: 'sidebar-section-header',
      link: {
        type: 'generated-index',
        slug: '/handbuch',
        description: 'Komplette Anleitung zum Orderlyze Web Dashboard und zur Bonier App.',
      },
      items: [
        // Web Dashboard Bereich
        {
          type: 'category',
          label: 'Web Dashboard',
          collapsed: true,
          collapsible: true,
          link: {
            type: 'doc',
            id: 'home',
          },
          items: [
            {
              type: 'category',
              label: 'Verwaltung',
              collapsed: true,
              link: {
                type: 'generated-index',
                description: 'Kategorien, Produkte, Extras, Gutscheine, Gänge, Tische, Räume, Benutzer und Stammkunden verwalten.',
              },
              items: [
                'stammdaten/kategorien/kategorien',
                'stammdaten/produkte/produkte',
                'stammdaten/extras/extras',
                'stammdaten/gutscheine/gutscheine',
                'betrieb/gaenge/gaenge',
                'personal/kunden/kunden',
                'stammdaten/tische/tische',
                'stammdaten/raeume/raeume',
                'personal/benutzer/benutzer',
                'stammdaten/lagerbestand/lagerbestand',
              ],
            },
            {
              type: 'category',
              label: 'Rechnungen',
              collapsed: true,
              link: {
                type: 'generated-index',
                description: 'Rechnungen, Abos und Belege direkt im Web-Portal erstellen und verwalten.',
              },
              items: [
                'rechnungen/erstellen/rechnungen-erstellen',
                'rechnungen/uebersicht/rechnungen-uebersicht',
                'rechnungen/wiederkehrend/rechnungen-wiederkehrend',
                'rechnungen/belege/rechnungen-belege',
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
                {
                  type: 'category',
                  label: 'Finanzamt',
                  collapsed: true,
                  link: { type: 'doc', id: 'einstellungen/finanzamt/einstellungen-finanzamt' },
                  items: [
                    'einstellungen/finanzamt/oesterreich/einstellungen-finanzamt-oesterreich',
                    'einstellungen/finanzamt/deutschland/einstellungen-finanzamt-deutschland',
                  ],
                },
                'einstellungen/buchungskonten/einstellungen-buchungskonten',
                'einstellungen/eigenverbrauch/einstellungen-eigenverbrauch',
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
                'einstellungen/online-bestellsystem/einstellungen-online-bestellsystem',
                'einstellungen/mein-benutzer/einstellungen-mein-benutzer',
              ],
            },
          ],
        },

        // Bonier App Bereich
        {
          type: 'category',
          label: 'Bonier App',
          collapsed: true,
          collapsible: true,
          link: {
            type: 'doc',
            id: 'app/app-home',
          },
          items: [
            'app/login/app-login',
            'app/navigation/app-navigation',
            {
              type: 'category',
              label: 'Hauptseite',
              collapsed: true,
              items: [
                'app/tischuebersicht/app-tischuebersicht',
                'app/bestellung/app-bestellung',
                'app/zahlung/app-zahlung',
                'app/drucker/app-drucker',
              ],
            },
            'app/benutzeransicht/app-benutzeransicht',
            'app/rechnungsuebersicht/app-rechnungsuebersicht',
            'app/tagesabschluss/app-tagesabschluss',
            'app/verwaltung/app-verwaltung',
            'app/tischplan/app-tischplan',
            'app/kartenzahlung/app-kartenzahlung',
            'app/einstellungen/app-einstellungen',
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
        'funktionen/abholung/funktionen-abholung',
        'funktionen/pfand/funktionen-pfand',
        'funktionen/steuer-aendern/funktionen-steuer-aendern',
      ],
    },

    // Häufig gestellte Fragen
    {
      type: 'category',
      label: 'Häufig gestellte Fragen',
      collapsed: true,
      collapsible: true,
      className: 'sidebar-section-header',
      link: {
        type: 'generated-index',
        slug: '/faq',
        description: 'Häufig gestellte Fragen zu Orderlyze.',
      },
      items: [
        { type: 'autogenerated', dirName: 'faq' },
      ],
    },

    // Seltene Fragen
    {
      type: 'category',
      label: 'Seltene Fragen',
      collapsed: true,
      collapsible: true,
      className: 'sidebar-section-header',
      link: {
        type: 'generated-index',
        slug: '/seltene-fragen',
        description: 'Spezielle Anleitungen und seltenere Fragen zu Orderlyze und angebundener Hardware.',
      },
      items: [
        { type: 'autogenerated', dirName: 'seltene-fragen' },
      ],
    },

    // Kontakt
    {
      type: 'doc',
      id: 'kontakt/kontakt',
      className: 'sidebar-section-header',
    },
  ],
};

export default sidebars;
