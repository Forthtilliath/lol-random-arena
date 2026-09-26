# Changelog

Toutes les évolutions notables de ce projet sont documentées ici.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), et le projet suit le [Semantic Versioning](https://semver.org/lang/fr/) (`MAJOR.MINOR.PATCH`).

## [Unreleased]

## [1.0.0] - 2026-09-26

### Ajouté

- Thème « Hextech » inspiré du client League of Legends (noir hextech, bleu nuit, or, bleu hextech, titres en Cinzel), partagé avec l'[app mobile](https://github.com/Forthtilliath/reactnative-lol-random-arena).
- Format **Trios** (6 équipes de 3) en plus des Duos (8 équipes de 2).
- Lien de partage du tirage, et bouton « Relancer » pour refaire un tirage avec la même configuration.
- Liste des champions et portraits synchronisés depuis Data Dragon (`bun run sync-champions`) : 173 champions, dont Ambessa, Aurora, Locke, Mel, Yunara et Zaahen.
- Critère de bannissement « Mixte » qui pondère à égalité popularité et taux de victoire.

### Modifié

- Interface entièrement en français, en deux étapes (Joueurs, Bannissements) avec un bouton de tirage collé en bas d'écran sur mobile.
- Mise en page adaptée au mobile (les champs et les résultats étaient illisibles).
- Chargement d'une sauvegarde en un clic depuis une liste filtrable.
- Statistiques de bannissement tirées d'op.gg ; le champ « Rang » disparaît (op.gg n'a pas de filtre par rang).
- Migration Svelte 5, Vite 8, ESLint 9, Tailwind CSS v4 ; 0 vulnérabilité connue.

### Corrigé

- Le bannissement automatique ne fonctionnait plus (leagueofgraphs bloque les requêtes avec Cloudflare).
- Le nombre de bannissements choisi était ignoré (toujours 8).
- Deux joueurs pouvaient tirer le même champion.
- Une deuxième sauvegarde dans la même session écrasait la première ; les nouvelles sauvegardes n'apparaissaient pas dans « Charger » avant un rechargement ; charger une ancienne sauvegarde faisait planter la page.
- Les portraits des champions étaient masqués par un voile noir.

### Retiré

- Dépendances `jsdom` et `sass`, devenues inutiles.
