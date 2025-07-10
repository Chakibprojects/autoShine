# Guide de contribution - AutoShine

Merci de votre intérêt pour contribuer à AutoShine ! Ce guide vous aidera à comprendre comment participer au développement du projet.

## 🚀 Comment contribuer

### 1. Fork et clone

```bash
# Fork le repository sur GitHub
# Puis cloner votre fork
git clone https://github.com/VOTRE_USERNAME/autoshine.git
cd autoshine
```

### 2. Configuration de l'environnement

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Configurer vos variables d'environnement
# Voir README.md pour les détails
```

### 3. Créer une branche

```bash
# Créer une nouvelle branche pour votre fonctionnalité
git checkout -b feature/ma-nouvelle-fonctionnalite

# Ou pour un bugfix
git checkout -b fix/correction-bug
```

### 4. Développement

- Suivez les conventions de code existantes
- Utilisez TypeScript pour tous les nouveaux fichiers
- Ajoutez des commentaires pour les fonctions complexes
- Testez vos modifications localement

### 5. Commit et push

```bash
# Ajouter vos modifications
git add .

# Commit avec un message descriptif
git commit -m "feat: ajout de la fonctionnalité X"

# Push vers votre fork
git push origin feature/ma-nouvelle-fonctionnalite
```

### 6. Pull Request

1. Allez sur GitHub et créez une Pull Request
2. Décrivez clairement vos modifications
3. Ajoutez des captures d'écran si pertinent
4. Attendez la review

## 📝 Conventions de code

### Nommage
- **Variables/fonctions** : camelCase en français (`gererUploadFichier`)
- **Composants** : PascalCase (`ProcesseurImage`)
- **Fichiers** : kebab-case (`image-processor.tsx`)
- **Types/Interfaces** : PascalCase avec préfixe (`PropsComparaisonImage`)

### Structure des commits
```
type(scope): description

Types possibles :
- feat: nouvelle fonctionnalité
- fix: correction de bug
- docs: documentation
- style: formatage, pas de changement de code
- refactor: refactoring du code
- test: ajout de tests
- chore: tâches de maintenance
```

### Code TypeScript
```typescript
// ✅ Bon
interface PropsComposant {
  titre: string;
  optionnel?: boolean;
}

const MonComposant = ({ titre, optionnel = false }: PropsComposant) => {
  // Logique du composant
};

// ❌ Éviter
const MonComposant = (props: any) => {
  // ...
};
```

## 🎯 Domaines de contribution

### Frontend
- Amélioration de l'UI/UX
- Nouvelles fonctionnalités dashboard
- Optimisations performance
- Responsive design

### Backend
- Optimisation API
- Gestion d'erreurs
- Nouvelles intégrations
- Sécurité

### Documentation
- Amélioration README
- Guides d'utilisation
- Documentation API
- Tutoriels

### Tests
- Tests unitaires
- Tests d'intégration
- Tests E2E
- Tests de performance

## 🐛 Signaler un bug

1. Vérifiez que le bug n'est pas déjà signalé
2. Créez une issue avec :
   - Description claire du problème
   - Étapes pour reproduire
   - Comportement attendu vs actuel
   - Captures d'écran si pertinent
   - Informations sur l'environnement

## 💡 Proposer une fonctionnalité

1. Créez une issue "Feature Request"
2. Décrivez :
   - Le problème que ça résout
   - La solution proposée
   - Les alternatives considérées
   - L'impact sur les utilisateurs

## 🔍 Review process

1. **Vérification automatique** : Tests, linting, build
2. **Review manuelle** : Code quality, architecture
3. **Test fonctionnel** : Vérification des fonctionnalités
4. **Merge** : Intégration dans la branche principale

## 📋 Checklist avant PR

- [ ] Le code compile sans erreurs
- [ ] Les tests passent
- [ ] Le code suit les conventions
- [ ] La documentation est mise à jour
- [ ] Les variables sont nommées en français
- [ ] Les commentaires sont clairs
- [ ] Pas de console.log oubliés
- [ ] Les types TypeScript sont corrects

## 🤝 Code de conduite

- Soyez respectueux et constructif
- Aidez les nouveaux contributeurs
- Focalisez sur le code, pas la personne
- Acceptez les critiques constructives

## 📞 Besoin d'aide ?

- Créez une issue avec le label "question"
- Contactez les mainteneurs
- Consultez la documentation

Merci de contribuer à AutoShine ! 🚗✨