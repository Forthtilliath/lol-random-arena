// Synchronise la liste des champions et leurs portraits avec Data Dragon (CDN officiel de Riot).
// Usage : node scripts/sync-champions.mjs
// - écrit src/lib/champions.ts (id Riot, identifiant Data Dragon, nom français)
// - télécharge les portraits manquants dans static/champion/<identifiant>.png
// - supprime les portraits des champions qui n'existent plus
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = join(root, 'static', 'champion');
const outputFile = join(root, 'src', 'lib', 'champions.ts');
const CDN = 'https://ddragon.leagueoflegends.com';

async function getJson(url) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`${url} -> HTTP ${response.status}`);
	return response.json();
}

const [version] = await getJson(`${CDN}/api/versions.json`);
const { data } = await getJson(`${CDN}/cdn/${version}/data/fr_FR/champion.json`);

const champions = Object.values(data)
	.map((c) => ({ id: Number(c.key), slug: c.id, name: c.name }))
	.sort((a, b) => a.id - b.id);

const lines = champions.map(
	(c) => `\t{ id: ${c.id}, slug: ${JSON.stringify(c.slug)}, name: ${JSON.stringify(c.name)} },`
);
writeFileSync(
	outputFile,
	`// Généré par scripts/sync-champions.mjs depuis Data Dragon ${version} : ne pas modifier à la main.

export type Champion = {
	/** Clé numérique Riot (stable, utilisée par op.gg et les liens de partage). */
	id: number;
	/** Identifiant Data Dragon, aussi nom du portrait dans static/champion. */
	slug: string;
	/** Nom affiché, en français. */
	name: string;
};

export const CHAMPIONS_VERSION = '${version}';

export const CHAMPIONS: ReadonlyArray<Champion> = Object.freeze([
${lines.join('\n')}
]);
`
);

mkdirSync(imagesDir, { recursive: true });
const wanted = new Set(champions.map((c) => `${c.slug}.png`));
let downloaded = 0;
for (const c of champions) {
	const file = join(imagesDir, `${c.slug}.png`);
	if (existsSync(file)) continue;
	const response = await fetch(`${CDN}/cdn/${version}/img/champion/${c.slug}.png`);
	if (!response.ok) throw new Error(`portrait ${c.slug} -> HTTP ${response.status}`);
	writeFileSync(file, Buffer.from(await response.arrayBuffer()));
	downloaded++;
}
const removed = readdirSync(imagesDir).filter((f) => f.endsWith('.png') && !wanted.has(f));
for (const f of removed) rmSync(join(imagesDir, f));

console.log(
	`Data Dragon ${version} : ${champions.length} champions, ${downloaded} portrait(s) téléchargé(s), ${removed.length} supprimé(s).`
);
