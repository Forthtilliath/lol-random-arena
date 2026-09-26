# UPGRADES

Suivi des améliorations faites sur ce projet depuis le 2026-07-27. **Projet terminé (v1.0.0, 2026-09-26)** : le détail des versions est dans [CHANGELOG.md](CHANGELOG.md).

## ✅ Fait le 2026-09-26 (v1.0.0)

- **Refonte « Hextech »** : thème unique inspiré du client LoL, partagé avec l'app React Native ([reactnative-lol-random-arena](https://github.com/Forthtilliath/reactnative-lol-random-arena)), interface en français, parcours en deux étapes, mise en page mobile corrigée
- **Ban auto réparé** : leagueofgraphs bloqué par Cloudflare → stats Arena d'op.gg (extraction du payload RSC, sans JSDOM), critère « mixte » par somme des rangs
- **Bugs corrigés** : nombre de bans ignoré, champions en double dans un lobby, sauvegardes écrasées/invisibles/plantage au chargement des anciennes, 13 avertissements Svelte 5
- **Champions à jour** : synchro Data Dragon (`bun run sync-champions`), 173 champions, noms officiels FR, test de présence des portraits
- **Build Vercel fiabilisé** : `@sveltejs/adapter-vercel` déclaré en devDependency (l'installation à la volée par `adapter-auto` produisait un arbre de dépendances cassé) ; `adapter-auto` conservé pour que le build local sous Windows reste possible (l'adapter Vercel crée des liens symboliques refusés sans mode développeur)
- `sass` et `jsdom` retirés (plus utilisés) : fin de l'avertissement de dépréciation Sass
- 50 tests unitaires, 0 erreur / 0 avertissement `svelte-check`

## ✅ Fait avant

- **Svelte 4 → 5** : migration complète des ~95 fichiers vers les runes (`$props()`, `$state`, `$derived`, snippets à la place des slots), `bits-ui` v0→v2, `formsnap` v1→v2 (composants shadcn-svelte régénérés via la CLI, style `nova`), `cmdk-sv` supprimé (Command géré nativement par `bits-ui`), `lucide-svelte` → `@lucide/svelte`, `svelte-sonner` 0→1, Vite 5→8, `@sveltejs/vite-plugin-svelte` 3→7, vitest 3→4, ESLint 8→9 (flat config, `eslint-plugin-svelte` v3, `typescript-eslint` v8). App vérifiée en conditions réelles (formulaire, selects, switch, dialogs Save/Load, soumission) — aucune erreur console, rendu identique.
- **Sécurité/dépendances** : SvelteKit, sveltekit-superforms (+ migration `zod4`/`zod4Client`), Vite, TypeScript, ESLint, Prettier, Sass, jsdom 24→29 (faille critique `form-data`), vitest 3 (faille critique du serveur UI) — **84 → 45 → 0 vulnérabilités** (`bun audit`, override `cookie` ^0.7 en plus de la migration Svelte 5)
- Lockfile binaire (`bun.lockb`) remplacé par le format texte `bun.lock` — le binaire faisait remonter des versions obsolètes dans `bun audit`
- Imports `sveltekit-superforms` corrigés vers `/client` et `/server` (l'export racine embarque un composant `SuperDebug` incompatible Svelte 4)
- Lignes de fin normalisées en LF (`.gitattributes`)
- **README** réécrit en version pro : description, captures d'écran, fonctionnalités, stack, installation
- **UX** : les 16 champs joueurs regroupés visuellement par duo (reflète la logique de pairing réelle), animation de reveal des équipes au résultat, correction du bug `--ring` qui rendait le focus invisible en dark mode
- **Lint** : 40 erreurs préexistantes corrigées (config ESLint pour `$$Props`/`$$Events` et generics Svelte, imports morts, échappement regex inutile) — `bun run lint` au vert
- **Tests** : 30 tests unitaires ajoutés sur les fonctions pures (`array`, `capitalize`, `asserts`, `number`, `uniqueId`, `actions`, `getChampions`)
- **CI** : pipeline GitHub Actions (lint, check, test, build) sur push/PR vers `main`
- **Tailwind v3 → v4** : migration CSS-first (`@theme`/`@theme inline`, `@tailwindcss/vite`), tous les tokens shadcn-svelte (background, card, popover, primary, secondary, accent, destructive, muted, border, input, ring) vérifiés et portés, rendu visuel identique confirmé par capture avant/après
- `engines.node` épinglé dans `package.json`
