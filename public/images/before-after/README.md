# Images Avant/Après pour la Landing Page

Ce dossier contient les **2 images** utilisées dans la comparaison avant/après de la section hero.

## Images à placer ici :

1. **`before.jpg`** - Image de la pièce AVANT nettoyage (sale, rayée, usée)
2. **`after.jpg`** - Image de la même pièce APRÈS nettoyage IA (propre, restaurée)

## Spécifications :
- **Taille :** 800x600px
- **Format :** JPEG
- **Qualité :** 85-95%
- **Poids :** < 500KB par image

## Pour remplacer les images actuelles :

1. **Placez vos 2 images** dans ce dossier : `before.jpg` et `after.jpg`
2. **Modifiez** `components/home/hero.tsx` :
   ```jsx
   // Remplacez les URLs Pexels par :
   src="/images/before-after/before.jpg"
   src="/images/before-after/after.jpg"
   ```

C'est tout ! 🚀