# AutoShine - Nettoyage IA de Pièces Automobiles

## 🚗 Description

AutoShine est une application web SaaS qui utilise l'intelligence artificielle pour nettoyer et restaurer automatiquement les photos de pièces automobiles. L'application permet aux concessionnaires, garagistes et vendeurs particuliers d'améliorer la qualité visuelle de leurs pièces automobiles en quelques secondes.

## ✨ Fonctionnalités principales

- **Nettoyage IA automatique** : Suppression de la saleté, rayures et restauration de l'éclat original
- **15+ types de pièces supportées** : Volant, jantes, sièges, phares, pare-chocs, etc.
- **Traitement adaptatif** : Algorithmes spécialisés selon le type de pièce et matériau
- **Interface intuitive** : Comparaison avant/après avec slider interactif
- **Traitement rapide** : Résultats en 30 secondes à 3 minutes
- **Téléchargement facile** : Export des images améliorées

## 🛠️ Stack technique

### Frontend
- **Next.js 13** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI modernes
- **Lucide React** - Icônes

### Backend
- **Next.js API Routes** - API serverless
- **Vercel Blob** - Stockage d'images
- **ModelsLab API** - Service d'IA pour le traitement d'images

### Déploiement
- **Vercel** - Hébergement et déploiement automatique
- **Variables d'environnement** - Configuration sécurisée

## 🚀 Installation et développement

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte ModelsLab (pour l'API IA)
- Compte Vercel (pour le stockage Blob)

### Installation

```bash
# Cloner le repository
git clone https://github.com/Chakibprojects/autoshine.git
cd autoshine

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
```

### Configuration des variables d'environnement

Créer un fichier `.env.local` avec :

```env
# ModelsLab API (obligatoire)
MODELSLAB_API_KEY=votre_cle_api_modelslab

# Vercel Blob (obligatoire)
BLOB_READ_WRITE_TOKEN=votre_token_vercel_blob

# Next.js (optionnel)
NEXTAUTH_SECRET=votre_secret_nextauth
NEXTAUTH_URL=http://localhost:3000
```

### Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du projet

```
autoshine/
├── app/                          # App Router Next.js
│   ├── api/clean-part/          # API de traitement d'images
│   ├── auth/                    # Pages d'authentification
│   ├── dashboard/               # Interface principale
│   └── contact/                 # Page de contact
├── components/                   # Composants React
│   ├── dashboard/               # Composants du dashboard
│   ├── home/                    # Composants de la landing page
│   ├── layout/                  # Layout et navigation
│   └── ui/                      # Composants UI (shadcn)
├── lib/                         # Utilitaires
├── public/                      # Assets statiques
└── styles/                      # Styles globaux
```

## 🔧 API et intégrations

### ModelsLab API
- **Modèle utilisé** : flux-kontext-pro
- **Endpoint** : `/api/clean-part`
- **Méthode** : POST avec FormData
- **Timeout** : 3 minutes maximum

### Types de pièces supportées
- Volant (cuir)
- Jantes alliage
- Sièges auto (tissu/cuir)
- Tableau de bord
- Pare-chocs
- Phares
- Rétroviseurs
- Poignées de porte
- Levier de vitesse
- Disques de frein
- Airbag de volant
- Carrosserie
- Autres pièces (générique)

## 🎨 Design et UX

- **Design system** : Couleurs primaires (bleu) et accent (orange)
- **Responsive** : Compatible mobile, tablette et desktop
- **Dark mode** : Support du thème sombre
- **Animations** : Micro-interactions fluides
- **Accessibilité** : Respect des standards WCAG

## 📊 Fonctionnalités business

### Plans tarifaires
- **Essai gratuit** : 3 améliorations
- **Basic** : 100 images/mois - 49€
- **Pro** : 500 images/mois - 99€
- **Enterprise** : Illimité - Sur mesure

### Gestion d'erreurs
- Gestion des timeouts ModelsLab
- Messages d'erreur contextuels
- Suggestions de résolution
- Retry automatique

## 🔒 Sécurité

- Variables d'environnement pour les clés API
- Validation des types de fichiers
- Limitation de taille des uploads
- Gestion sécurisée des tokens

## 📈 Performance

- Images optimisées avec Next.js Image
- Lazy loading des composants
- Compression des assets
- CDN Vercel pour la distribution

## 🧪 Tests et qualité

- TypeScript pour la sécurité des types
- ESLint pour la qualité du code
- Prettier pour le formatage
- Validation des formulaires avec Zod

## 🚀 Déploiement

### Vercel (recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Configurer les variables d'environnement sur Vercel
vercel env add MODELSLAB_API_KEY
vercel env add BLOB_READ_WRITE_TOKEN
```

### Variables d'environnement de production
Configurer sur Vercel Dashboard :
- `MODELSLAB_API_KEY`
- `BLOB_READ_WRITE_TOKEN`

## 📝 Roadmap

- [ ] Authentification utilisateur complète
- [ ] Système de crédits et facturation
- [ ] API publique pour intégrations
- [ ] Traitement par lots
- [ ] Analytics d'utilisation
- [ ] Support de nouveaux formats d'image
- [ ] Intégration avec plateformes e-commerce

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📞 Contact

- **Email** : contact@autoshine.com
- **GitHub** : [@Chakibprojects](https://github.com/Chakibprojects)
- **LinkedIn** : [Chakib Mallem](https://www.linkedin.com/in/chakib-mallemm/)

## 🙏 Remerciements

- [ModelsLab](https://modelslab.com) pour l'API d'IA
- [Vercel](https://vercel.com) pour l'hébergement
- [shadcn/ui](https://ui.shadcn.com) pour les composants UI
- [Lucide](https://lucide.dev) pour les icônes

---

**AutoShine** - Transformez vos pièces automobiles avec l'IA 🚗✨