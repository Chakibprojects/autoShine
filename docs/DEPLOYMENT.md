# Guide de déploiement - AutoShine

Ce guide détaille comment déployer AutoShine en production.

## 🚀 Déploiement sur Vercel (Recommandé)

### 1. Prérequis

- Compte Vercel
- Compte ModelsLab avec API key
- Repository GitHub

### 2. Configuration Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer depuis le repository
vercel

# Suivre les instructions :
# - Link to existing project? No
# - Project name: autoshine
# - Directory: ./
# - Override settings? No
```

### 3. Variables d'environnement

Dans le dashboard Vercel, aller dans Settings > Environment Variables :

```env
# Production
MODELSLAB_API_KEY=your_production_api_key
BLOB_READ_WRITE_TOKEN=your_production_blob_token
NODE_ENV=production

# Preview (optionnel)
MODELSLAB_API_KEY=your_preview_api_key
BLOB_READ_WRITE_TOKEN=your_preview_blob_token

# Development (optionnel)
MODELSLAB_API_KEY=your_dev_api_key
BLOB_READ_WRITE_TOKEN=your_dev_blob_token
```

### 4. Configuration du domaine

1. Dans Vercel Dashboard > Domains
2. Ajouter votre domaine personnalisé
3. Configurer les DNS selon les instructions

### 5. Déploiement automatique

Vercel déploie automatiquement :
- **Production** : à chaque push sur `main`
- **Preview** : à chaque push sur les autres branches
- **Pull Requests** : preview automatique

## 🔧 Configuration ModelsLab

### 1. Obtenir une API key

1. Créer un compte sur [ModelsLab](https://modelslab.com)
2. Aller dans API Settings
3. Générer une nouvelle API key
4. Copier la clé pour la configuration

### 2. Limites et quotas

- **Gratuit** : 100 requêtes/mois
- **Basic** : 1000 requêtes/mois
- **Pro** : 10000 requêtes/mois
- **Enterprise** : Illimité

### 3. Monitoring

Surveiller l'utilisation dans le dashboard ModelsLab :
- Nombre de requêtes
- Temps de réponse
- Taux d'erreur

## 💾 Configuration Vercel Blob

### 1. Activer Blob Storage

1. Dans Vercel Dashboard > Storage
2. Créer un nouveau Blob Store
3. Copier le token de lecture/écriture

### 2. Limites

- **Hobby** : 1GB gratuit
- **Pro** : 100GB inclus
- **Enterprise** : Illimité

### 3. Optimisation

- Images automatiquement optimisées
- CDN global
- Cache intelligent

## 📊 Monitoring et analytics

### 1. Vercel Analytics

```bash
# Installer Vercel Analytics
npm install @vercel/analytics

# Ajouter dans app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Monitoring des erreurs

- Logs Vercel pour les erreurs serveur
- Console browser pour les erreurs client
- Monitoring ModelsLab pour les erreurs API

### 3. Performance

- Core Web Vitals dans Vercel
- Lighthouse CI
- Real User Monitoring

## 🔒 Sécurité en production

### 1. Variables d'environnement

- Jamais de clés API dans le code
- Utiliser les variables Vercel
- Rotation régulière des clés

### 2. HTTPS

- Automatique avec Vercel
- Certificats SSL gratuits
- Redirection HTTP → HTTPS

### 3. Headers de sécurité

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

## 🚨 Gestion des erreurs

### 1. Monitoring

- Vercel Functions logs
- Error boundaries React
- API error tracking

### 2. Alertes

- Webhook Vercel pour les déploiements
- Monitoring uptime
- Alertes par email

### 3. Rollback

```bash
# Rollback vers un déploiement précédent
vercel rollback [deployment-url]

# Ou via le dashboard Vercel
```

## 📈 Optimisation performance

### 1. Images

- Next.js Image optimization
- WebP automatique
- Lazy loading

### 2. Code splitting

- Dynamic imports
- Route-based splitting
- Component lazy loading

### 3. Caching

- Static generation
- API route caching
- CDN caching

## 🔄 CI/CD Pipeline

### 1. GitHub Actions (optionnel)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 2. Tests automatiques

```yaml
# Tests avant déploiement
- name: Run tests
  run: |
    npm ci
    npm run test
    npm run build
```

## 📋 Checklist de déploiement

### Avant le déploiement

- [ ] Tests passent localement
- [ ] Build réussit
- [ ] Variables d'environnement configurées
- [ ] API keys valides
- [ ] Documentation mise à jour

### Après le déploiement

- [ ] Site accessible
- [ ] Fonctionnalités principales testées
- [ ] API fonctionne
- [ ] Images s'uploadent
- [ ] Traitement IA fonctionne
- [ ] Téléchargement fonctionne
- [ ] Responsive design OK
- [ ] Performance acceptable

### Monitoring continu

- [ ] Logs surveillés
- [ ] Métriques performance
- [ ] Uptime monitoring
- [ ] Alertes configurées

## 🆘 Dépannage

### Erreurs communes

1. **API ModelsLab timeout**
   - Vérifier la clé API
   - Augmenter le timeout
   - Vérifier les quotas

2. **Upload d'images échoue**
   - Vérifier le token Blob
   - Taille de fichier
   - Format supporté

3. **Build échoue**
   - Erreurs TypeScript
   - Dépendances manquantes
   - Variables d'environnement

### Support

- Documentation Vercel
- Support ModelsLab
- Issues GitHub
- Community Discord

---

**AutoShine** - Déploiement professionnel 🚀