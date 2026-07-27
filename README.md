# ⚔️ LOL Nuclear Random Arena

![License](https://img.shields.io/github/license/forthtilliath/lol-random-arena?style=for-the-badge) [![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://kit.svelte.dev/) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white&style=for-the-badge) [![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)

> Fini les débats interminables pour former les équipes du mode Arena de League of Legends : renseigne les joueurs présents, laisse le générateur tirer les équipes et les champions au hasard.

**🔗 Démo :** [lol-random-arena.vercel.app](https://lol-random-arena.vercel.app/)

![Formulaire de configuration des joueurs et du ban automatique](docs/form.webp)

## Fonctionnalités

- 🎲 **Répartition aléatoire** des joueurs en équipes de 2 (ou par ordre d'inscription si le mode aléatoire est désactivé)
- 🏆 **Génération aléatoire de champion** pour chaque joueur
- 🚫 **Ban automatique** des champions les plus joués ou les mieux gagnants, avec un curseur pour choisir combien en bannir
- 💾 **Sauvegarde/chargement** de la configuration des joueurs (noms, options) pour ne pas tout ressaisir à chaque partie
- ⚡ Résultat instantané, sans rechargement de page (SvelteKit + form actions)

## Résultat

![Équipes et champions générés aléatoirement, avec le portrait de chaque champion](docs/results.webp)

## Stack technique

- [SvelteKit](https://kit.svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn-svelte](https://www.shadcn-svelte.com/)
- [Zod](https://zod.dev/) + [sveltekit-superforms](https://superforms.rocks/) — validation de formulaire côté client et serveur
- [bits-ui](https://www.bits-ui.com/) — primitives accessibles (switch, dialog, select...)

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

| Commande        | Description                           |
| --------------- | -------------------------------------- |
| `bun run dev`    | Serveur de développement               |
| `bun run build`  | Build de production                    |
| `bun run preview`| Prévisualise le build de production    |
| `bun run check`  | Vérification des types (svelte-check)  |
| `bun run lint`   | Lint (Prettier + ESLint)               |
| `bun run format` | Formate le code (Prettier)             |

## Licence

Distribué sous licence [MIT](./LICENSE).
