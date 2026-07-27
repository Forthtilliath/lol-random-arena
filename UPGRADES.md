# UPGRADES

État des lieux après la passe de mise à jour/sécurité du 2026-07-27, et propositions pour la suite. Rien ci-dessous n'a été fait automatiquement — c'est une liste à trier.

## ✅ Déjà fait dans cette passe

- Dépendances mises à jour (SvelteKit, sveltekit-superforms, Vite, TypeScript, ESLint, Prettier, Sass, jsdom, etc.)
- Migration vers l'adaptateur `zod4`/`zod4Client` (le `zod` classique cassait l'inférence de types avec les versions récentes de sveltekit-superforms)
- Imports `sveltekit-superforms` corrigés vers les sous-chemins `/client` et `/server` (l'export racine embarque un composant `SuperDebug` incompatible avec le compilateur Svelte 4)
- `jsdom` 24→29 (corrige une faille **critique** sur `form-data`)
- Lignes de fin normalisées en LF (`.gitattributes`) pour éviter les faux "fichiers modifiés"
- **84 → 45 vulnérabilités** (`bun audit`)

## 🔐 Sécurité restante (45 vulnérabilités)

Les 45 restantes se regroupent en 3 causes racines, chacune nécessitant une vraie migration (pas juste un bump de version) :

1. **Svelte 4** (6 CVE modérées, XSS en SSR) — le correctif n'existe que sur Svelte 5. Svelte 4 est utilisé partout dans le projet (runes non utilisées).
2. **Vite 5** (bypass `server.fs.deny`, injection de commande via `launch-editor`, DOM clobbering...) — le correctif nécessite Vite 6+, mais `@sveltejs/vite-plugin-svelte@3.x` (compatible Svelte 4) ne supporte que Vite 5. Encore une fois : bloqué tant qu'on reste sur Svelte 4.
3. **ESLint 8** (ajv, glob, minimatch, flatted anciens dans sa propre chaîne de dépendances) — le correctif nécessite ESLint 9 (flat config), un changement de format de configuration.

**Recommandation** : migrer vers **Svelte 5** débloque les deux premiers points d'un coup (et modernise le code avec les runes). C'est un chantier plus lourd que ce qui a été fait sur `preact-toc` ou `oriflamme` (95 fichiers, composants shadcn-svelte à régénérer en `bits-ui` v2 + `formsnap` v2), mais c'est la vraie solution long terme. À faire dans une session dédiée si tu veux.

## 🎨 Tailwind v3 → v4

Comme pour Oriflamme et Preact TOC, une partie des vulnérabilités restantes vient de la chaîne `tailwindcss@3 → sucrase → glob/minimatch`. Passer en v4 (CSS-first, `@tailwindcss/vite`) éliminerait cette chaîne entièrement. Ce projet utilise vraiment les composants shadcn-svelte (contrairement à Preact TOC où c'était mort), donc la migration demande de vérifier tous les tokens de couleur (`--background`, `--card`, `--popover`, etc.) — plus long qu'un simple nettoyage, mais faisable.

## 📄 README

Le README est toujours le scaffold par défaut de `create-svelte` sous les badges ajoutés précédemment. Je propose de le refaire façon "pro" comme pour Spotube/Oriflamme :

- Vraie description du projet et de son fonctionnement
- Captures d'écran (formulaire, résultat des équipes/champions générés)
- Section fonctionnalités (génération aléatoire d'équipes, ban auto de champions par winrate/popularité, sauvegarde/chargement de configuration)
- Section installation/dev

## 🧹 Qualité / dette technique

- `bun run lint` échoue actuellement : 40 erreurs ESLint préexistantes (pas causées par cette passe) :
  - ~35 sont des faux positifs `$$Props`/`$$Events` non reconnus sur les composants shadcn-svelte (pattern Svelte 4 legacy que la règle `no-unused-vars` ne reconnaît pas)
  - 5 vraies petites erreurs dans `+page.svelte` : import `cn` inutilisé, type `PlayerWithChampion` non importé, import `getPathImage` inutilisé, échappement regex inutile, variable `i` inutilisée
- Avertissement de dépréciation Sass ("legacy JS API") à chaque build — nécessite de passer `sass` en API moderne dans la config du préprocesseur
- Pas de pipeline CI (GitHub Actions) — comme fait sur `vincent-lisita-portfolio`, un check lint+build sur chaque push/PR serait utile
- Aucun test
- Pas de version Node épinglée dans `package.json` (`engines`)
- `@sveltejs/adapter-auto` ne détecte pas d'environnement en local (normal, le vrai déploiement se fait via Vercel qui le détecte à la volée) — épingler `@sveltejs/adapter-vercel` explicitement serait plus propre et cohérent avec les autres projets Vercel du portfolio

## ✨ UX / "wow factor"

Tu avais dit vouloir le rendre "plus agréable à utiliser, plus sensationnel à montrer". Constats après avoir testé l'appli :

- Les 16 champs "Player 1" à "Player 16" sont une grille plate, monotone — regrouper visuellement par équipe (2 colonnes de 8, ou cartes d'équipe) donnerait plus de lisibilité
- Aucune animation lors de la génération des équipes/champions — un effet de reveal (fade/slide séquentiel, façon "draft" League of Legends) rendrait le résultat plus satisfaisant à regarder
- Pas d'images des champions dans la liste de résultat au-delà de la carte finale — voir si les assets sont déjà là (`static/champion/`) pour enrichir l'affichage
- `TODO.md` existant note déjà : "Add focus visibility on dark mode" (accessibilité clavier) — à reprendre

## Priorités suggérées

Si tu veux avancer étape par étape plutôt que tout d'un coup, voici l'ordre que je recommande :

1. README pro (rapide, gros impact visuel pour le portfolio)
2. UX/wow-factor (répond directement à ta demande initiale sur ce projet)
3. Nettoyage lint (rapide, remet `bun run lint` au vert)
4. CI + tests
5. Tailwind v4 (plus long, composants shadcn à revérifier)
6. Svelte 5 (le plus gros chantier, mais celui qui referme vraiment la sécurité)
