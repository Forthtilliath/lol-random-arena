# UPGRADES

Suivi des améliorations faites sur ce projet depuis le 2026-07-27. Seul le dernier point (Svelte 5) reste ouvert.

## ✅ Fait

- **Sécurité/dépendances** : SvelteKit, sveltekit-superforms (+ migration `zod4`/`zod4Client`), Vite, TypeScript, ESLint, Prettier, Sass, jsdom 24→29 (faille critique `form-data`), vitest 3 (faille critique du serveur UI) — **84 → 45 vulnérabilités** (`bun audit`)
- Imports `sveltekit-superforms` corrigés vers `/client` et `/server` (l'export racine embarque un composant `SuperDebug` incompatible Svelte 4)
- Lignes de fin normalisées en LF (`.gitattributes`)
- **README** réécrit en version pro : description, captures d'écran, fonctionnalités, stack, installation
- **UX** : les 16 champs joueurs regroupés visuellement par duo (reflète la logique de pairing réelle), animation de reveal des équipes au résultat, correction du bug `--ring` qui rendait le focus invisible en dark mode
- **Lint** : 40 erreurs préexistantes corrigées (config ESLint pour `$$Props`/`$$Events` et generics Svelte, imports morts, échappement regex inutile) — `bun run lint` au vert
- **Tests** : 30 tests unitaires ajoutés sur les fonctions pures (`array`, `capitalize`, `asserts`, `number`, `uniqueId`, `actions`, `getChampions`)
- **CI** : pipeline GitHub Actions (lint, check, test, build) sur push/PR vers `main`
- **Tailwind v3 → v4** : migration CSS-first (`@theme`/`@theme inline`, `@tailwindcss/vite`), tous les tokens shadcn-svelte (background, card, popover, primary, secondary, accent, destructive, muted, border, input, ring) vérifiés et portés, rendu visuel identique confirmé par capture avant/après
- `engines.node` épinglé dans `package.json`

## 🔐 Sécurité restante (45 vulnérabilités)

Toutes bloquées derrière **Svelte 5** :

1. **Svelte 4** (6 CVE modérées, XSS en SSR) — correctif uniquement sur Svelte 5
2. **Vite 5** (bypass `server.fs.deny`, injection `launch-editor`...) — correctif nécessite Vite 6+, mais `@sveltejs/vite-plugin-svelte@3.x` (Svelte 4) ne supporte que Vite 5
3. **ESLint 8** (ajv, glob, minimatch, flatted anciens) — correctif nécessite ESLint 9 (flat config)

## 🚀 Prochaine étape : Svelte 5

C'est le seul chantier qui referme vraiment la sécurité restante, et il modernise le code avec les runes. Plus lourd que Tailwind v4 : 95 fichiers, composants shadcn-svelte à régénérer (`bits-ui` v0→v2, `formsnap` v1→v2, syntaxe `export let`→`$props()`), et potentiellement ESLint 9 en même temps puisque `eslint-plugin-svelte` v2 ne supporte pas pleinement Svelte 5. À faire dans une session dédiée.

## Autres pistes non prioritaires

- Avertissement de dépréciation Sass ("legacy JS API") à chaque build
- `@sveltejs/adapter-auto` ne détecte pas d'environnement en local (normal, Vercel le détecte au déploiement) — épingler `@sveltejs/adapter-vercel` explicitement serait plus cohérent avec les autres projets du portfolio
