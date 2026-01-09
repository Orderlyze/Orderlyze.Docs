# Orderlyze Docs

Dokumentation und Hilfe für Orderlyze - gebaut mit [Docusaurus](https://docusaurus.io/).

## Struktur

```
docs/
├── tutorials/           # Schritt-für-Schritt Anleitungen
│   ├── erste-schritte/
│   ├── produkte/
│   ├── bestellungen/
│   ├── drucker/
│   └── einstellungen/
├── troubleshooting/     # Problemlösungen
├── faq/                 # Häufig gestellte Fragen
└── index.md             # Startseite

static/
└── screenshots/         # Alle Screenshots

schemas/
└── frontmatter.schema.json  # Schema für Markdown-Frontmatter

scripts/
├── build-mcp-index.js       # Generiert MCP-Index
├── build-embeddings.js      # Generiert Embeddings für Semantic Search
└── validate-frontmatter.js  # Validiert Frontmatter
```

## Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Development Server starten
npm start

# Frontmatter validieren
npm run validate

# Production Build
npm run build

# MCP Index generieren
npm run build:index

# Alles bauen (validate + build + index + embeddings)
npm run build:all
```

## Artikel schreiben

### Frontmatter-Schema

Jeder Artikel benötigt Frontmatter mit folgenden Feldern:

```yaml
---
id: artikel-id               # Eindeutige ID (kebab-case)
title: Artikel Titel          # Titel
description: Kurzbeschreibung # Für SEO und Vorschau
type: tutorial                # tutorial | troubleshooting | faq
platform: both                # mobile | web | both
sidebar_position: 1           # Position in Sidebar
searchTerms:                  # Zusätzliche Suchbegriffe
  - keyword1
  - keyword2
---
```

### Tutorial-spezifisch

```yaml
tutorial:
  difficulty: anfaenger       # anfaenger | fortgeschritten | experte
  steps:
    - title: Schritt 1
      screenshot: screenshot-id
  navigation:
    - action: Tippen Sie auf
      target: Einstellungen
```

### Troubleshooting-spezifisch

```yaml
troubleshooting:
  category: drucker           # drucker | zahlung | sync | login | netzwerk | allgemein
  symptoms:
    - Drucker reagiert nicht
  errorMessages:
    - "Verbindung fehlgeschlagen"
```

### Screenshots

```yaml
screenshots:
  - id: screenshot-id
    file: tutorials/kategorie/screenshot.png  # Relativ zu /static/screenshots/
    alt: Beschreibung für Barrierefreiheit
    platform: mobile
```

## MCP Integration

Der Build-Prozess generiert:

1. **mcp-index.json** - Strukturierter Index aller Artikel
2. **embeddings.json** - Vector Embeddings für Semantic Search

Diese Dateien werden vom Orderlyze MCP Server geladen.

## CI/CD

Bei Push auf `main`:

1. Frontmatter validieren
2. Docusaurus Website bauen
3. MCP Index generieren
4. Embeddings generieren (benötigt `OPENAI_API_KEY`)
5. Deploy zu GitHub Pages
6. Upload zu Azure Blob Storage
7. MCP Server benachrichtigen

### Erforderliche Secrets

- `OPENAI_API_KEY` - Für Embedding-Generierung
- `AZURE_STORAGE_ACCOUNT` - Azure Storage Account Name
- `AZURE_STORAGE_KEY` - Azure Storage Access Key
- `MCP_WEBHOOK_URL` - URL zum MCP Reload-Endpoint
- `MCP_WEBHOOK_SECRET` - Secret für Webhook-Authentifizierung
