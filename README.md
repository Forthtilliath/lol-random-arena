# ⚔️ LoL Random Arena

![License](https://img.shields.io/github/license/forthtilliath/lol-random-arena?style=for-the-badge) [![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://kit.svelte.dev/) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white&style=for-the-badge) [![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)

> Fini les débats interminables pour former les équipes du mode Arena de League of Legends : renseigne les joueurs présents, laisse le générateur tirer les équipes et les champions au hasard.

**🔗 Démo :** [lol-random-arena.vercel.app](https://lol-random-arena.vercel.app/)

![Formulaire : format Duos/Trios, pseudos des joueurs et bannissements](docs/form.webp)

## Fonctionnalités

- 👥 **Duos ou Trios** : 8 équipes de 2 ou 6 équipes de 3, comme les deux formats du mode Arena
- 🎲 **Répartition aléatoire** des joueurs en équipes (ou par ordre d'inscription si le mode aléatoire est désactivé)
- 🏆 **Un champion par joueur, sans doublon** dans le lobby, parmi les 173 champions du jeu
- 🚫 **Bannissement automatique** des champions les plus joués, les plus gagnants ou un mix des deux, d'après les statistiques Arena actuelles d'[op.gg](https://www.op.gg/lol/modes/arena)
- 🔗 **Lien de partage** du tirage, et bouton **Relancer** pour refaire un tirage avec la même configuration
- 💾 **Sauvegarde/chargement** de la configuration (pseudos, format, bannissements) dans le navigateur
- 📱 Interface en français, pensée pour le mobile comme pour le bureau

## Résultat

![Équipes et champions tirés au sort, avec le portrait de chaque champion](docs/results.webp)

## Thème « Hextech »

L'interface reprend la palette du client League of Legends : fond noir hextech (`#010A13`), panneaux bleu nuit (`#0A1428`) à coins biseautés, liserés or (`#C8AA6E`, `#785A28`), accents bleu hextech (`#0AC8B9`) et titres en [Cinzel](https://fonts.google.com/specimen/Cinzel). Les tokens sont définis dans [`src/app.css`](src/app.css) et partagés à l'identique avec la version mobile [reactnative-lol-random-arena](https://github.com/Forthtilliath/reactnative-lol-random-arena).

## Stack technique

- [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn-svelte](https://www.shadcn-svelte.com/)
- [Zod](https://zod.dev/) + [sveltekit-superforms](https://superforms.rocks/) : validation du formulaire côté client et serveur
- [bits-ui](https://www.bits-ui.com/) : primitives accessibles (switch, dialog, command…)
- [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon) : liste des champions et portraits officiels

## Installation

Ce projet utilise [bun](https://bun.sh) comme gestionnaire de paquets.

```bash
# cloner le repo
git clone https://github.com/Forthtilliath/lol-random-arena.git
cd lol-random-arena

# installer les dépendances
bun install

# lancer le serveur de développement
bun run dev
```

### Scripts disponibles

| Commande                 | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| `bun run dev`            | Serveur de développement                                       |
| `bun run build`          | Build de production                                            |
| `bun run preview`        | Prévisualise le build de production                            |
| `bun run check`          | Vérification des types (svelte-check)                          |
| `bun run lint`           | Lint (Prettier + ESLint)                                       |
| `bun run format`         | Formate le code (Prettier)                                     |
| `bun run test`           | Tests unitaires (Vitest)                                       |
| `bun run sync-champions` | Met à jour les champions et leurs portraits depuis Data Dragon |

Après la sortie d'un nouveau champion, lance `bun run sync-champions` : le script régénère `src/lib/champions.ts` et télécharge les portraits manquants dans `static/champion/`.

## Licence

Distribué sous licence [MIT](./LICENSE).

LoL Random Arena est un projet de fan non affilié à Riot Games. League of Legends et les portraits des champions sont la propriété de Riot Games, Inc.
