# Azure Static Web Apps Einrichtung

## 1. Azure Static Web App erstellen

### Im Azure Portal:
1. Gehe zu **portal.azure.com**
2. Suche nach **"Static Web Apps"**
3. Klick **"+ Create"**
4. Fülle aus:
   - **Subscription:** Deine Subscription
   - **Resource Group:** Neu erstellen oder vorhandene wählen
   - **Name:** `orderlyze-docs`
   - **Plan type:** Free
   - **Region:** West Europe
   - **Source:** GitHub
5. **Mit GitHub verbinden** und Repository auswählen:
   - Organization: `Orderlyze`
   - Repository: `Orderlyze.Docs`
   - Branch: `main`
6. **Build Details:**
   - Build Preset: `Custom`
   - App location: `/`
   - Api location: `api`
   - Output location: `build`
7. Klick **"Review + create"** → **"Create"**

Azure erstellt automatisch einen GitHub Actions Workflow und deployed die App.

## 2. GitHub OAuth App erstellen

1. Gehe zu: https://github.com/settings/developers
2. Klick **"New OAuth App"**
3. Fülle aus:
   - **Application name:** `Orderlyze Docs CMS`
   - **Homepage URL:** `https://DEINE-APP.azurestaticapps.net`
   - **Authorization callback URL:** `https://DEINE-APP.azurestaticapps.net/api/callback`
4. Klick **"Register application"**
5. Kopiere **Client ID**
6. Generiere **Client Secret** und kopiere es

## 3. Azure App Settings konfigurieren

Im Azure Portal → Deine Static Web App → **Configuration**:

| Name | Wert |
|------|------|
| `GITHUB_CLIENT_ID` | Deine GitHub Client ID |
| `GITHUB_CLIENT_SECRET` | Dein GitHub Client Secret |

Klick **"Save"**

## 4. CMS Config anpassen

In `static/admin/config.yml`:

```yaml
backend:
  name: github
  repo: Orderlyze/Orderlyze.Docs
  branch: main
  base_url: https://DEINE-APP.azurestaticapps.net  # <- Deine Azure URL
  auth_endpoint: /api/auth

local_backend: false  # <- Auf false setzen!
```

Committe und pushe die Änderung.

## 5. Testen

1. Öffne `https://DEINE-APP.azurestaticapps.net/admin`
2. Klicke auf **"Login with GitHub"**
3. Autorisiere die App
4. Du bist eingeloggt!

## Troubleshooting

### "redirect_uri mismatch"
→ Callback URL in GitHub OAuth App muss exakt mit Azure URL übereinstimmen

### "Bad credentials"
→ GITHUB_CLIENT_SECRET in Azure App Settings prüfen

### API gibt 404
→ Prüfe ob `api` Ordner korrekt deployed wurde (Build Logs prüfen)

### Lokale Entwicklung
Für lokale Entwicklung `local_backend: true` setzen und:
```bash
npm run start:cms
```
