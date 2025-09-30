# mc-dev — Portfolio de Mamadou CONDE

Un site portfolio statique moderne pour présenter le profil d'Ingénieur HSE et Développeur Web Full‑Stack de Mamadou CONDE. L'interface est construite en HTML + Tailwind CSS (CDN) et JavaScript (ES6), avec un mode sombre/clair, un basculement de profil (HSE ↔ Dév), des sections projets/compétences, et un système de modale accessible.

## Aperçu

- **Tech stack**: HTML5, Tailwind CSS via CDN, JavaScript (ES6)
- **Fonctionnalités clés**:
  - Mode sombre/clair persistant (localStorage)
  - Bascule de rôle: contenu adapté « Profil HSE » ou « Profil Dév »
  - Navigation fluide avec défilement doux
  - Modales accessibles (piège du focus, fermeture Échap/clic arrière‑plan)
  - Mise en page responsive

## Démarrage rapide

1. Cloner/télécharger le projet.
2. Ouvrir simplement `index.html` dans votre navigateur.

Conseil: pour un rechargement à chaud, servez le dossier avec une extension type « Live Server » (VS Code) ou un serveur local.

## Structure du projet

```
mc-dev/
├─ index.html       # Page principale (sections, Tailwind via CDN)
├─ script.js        # Logique: thème, rôle, modales, scroll
├─ README.md        # Ce fichier
├─ img/             # Images (icônes, visuels)
└─ CV Mamadou CONDE.pdf
```

## Scripts et logique côté client

- Thème: clé `site-theme` dans `localStorage` pour mémoriser dark/light.
- Boutons rôle (`.role-btn`) adaptent le style et le contenu des modales.
- Modales: gestion focus clavier, fermeture via Échap ou clic sur l'arrière‑plan.
- Liens d'ancrage: défilement doux vers les sections.

Tout se trouve dans `script.js` et est déclenché après `DOMContentLoaded`.

## Personnalisation

- Couleurs et typographies: ajuster la config Tailwind inline dans `index.html` (bloc `<script>` `tailwind.config`).
- Contenu: modifier les sections `#home`, `#skills`, `#projects`, `#about`, `#contact` dans `index.html`.
- Modales: adapter les retours de la fonction `getContent(type, role)` dans `script.js`.
- Images/icônes: remplacer les fichiers du dossier `img/` en conservant les mêmes noms ou mettre à jour les chemins dans le HTML.

## Accessibilité

- Composants interactifs au clavier (Tab/Shift+Tab)
- Fermeture des modales avec Échap et clic de fond
- Attributs ARIA (`role="dialog"`, `aria-modal`, `aria-hidden`, `aria-labelledby`)
- Contraste respecté en mode sombre/clair (à vérifier selon vos visuels)

## Déploiement

C'est un site statique: déployable sur GitHub Pages, Netlify, Vercel, Render (static), etc.

Étapes générales:
- Pousser le dossier sur un dépôt Git
- Configurer le fournisseur choisi pour servir `index.html` à la racine

## Crédits et ressources

- Police: Inter (Google Fonts)
- Icônes/images: contenus dans `img/` (vérifier les droits si vous remplacez par d'autres visuels)
- Tailwind CSS via CDN

## Licence

© 2025 — Tous droits réservés. L'usage du code et des visuels est réservé à l'auteur sauf accord explicite.

## Contact

- Email: `mconde043@gmail.com`
- Téléphone: `+224 627 36 95 41`
- WhatsApp: `https://wa.me/224627369541`

Si vous souhaitez une version multilingue, un blog ou des pages projets détaillées, ouvrez une issue et nous pourrons l'ajouter.