import type { Criteria } from '../../routes/schema';

export type ChampionWithRates = {
	/** Riot champion key, the same as `Champion['id']` in `$lib/data`. */
	id: number;
	name: string;
	/** Pick rate, between 0 and 1. */
	popularity: number;
	/** Win rate, between 0 and 1. */
	winrate: number;
};

export const ARENA_STATS_URL = 'https://www.op.gg/lol/modes/arena';

// op.gg is a Next.js app: its Arena tier list ships inside the page's RSC payload as escaped JSON
// objects such as {"key":"aatrox","name":"Aatrox",...,"id":266,...,"win_rate":0.45,"pick_rate":0.08}.
const CHAMPION_OBJECT = /\{"key":"[a-z0-9]+","name":"[^"]*"[^{}]*\}/g;

type StatsEntry = { id: number; name: string; win_rate: number; pick_rate: number };

function isStatsEntry(value: unknown): value is StatsEntry {
	if (typeof value !== 'object' || value === null) return false;
	const entry = value as Record<string, unknown>;
	return (
		typeof entry.id === 'number' &&
		typeof entry.name === 'string' &&
		typeof entry.win_rate === 'number' &&
		typeof entry.pick_rate === 'number'
	);
}

/**
 * Extracts every champion's Arena pick rate and win rate from an op.gg Arena page. Each champion
 * is listed several times in the page, only its first occurrence is kept.
 */
export function parseArenaStats(html: string): ChampionWithRates[] {
	const unescaped = html.replace(/\\"/g, '"');
	const byId = new Map<number, ChampionWithRates>();

	for (const [raw] of unescaped.matchAll(CHAMPION_OBJECT)) {
		let parsed: unknown;
		try {
			parsed = JSON.parse(raw);
		} catch {
			continue;
		}
		if (!isStatsEntry(parsed) || byId.has(parsed.id)) continue;

		byId.set(parsed.id, {
			id: parsed.id,
			name: parsed.name,
			popularity: parsed.pick_rate,
			winrate: parsed.win_rate
		});
	}

	return [...byId.values()];
}

/** Fetches the current Arena stats from op.gg. Throws if the page can't be read. */
export async function fetchArenaStats(fetchFn: typeof fetch = fetch): Promise<ChampionWithRates[]> {
	const response = await fetchFn(ARENA_STATS_URL, {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36',
			'Accept-Language': 'en'
		}
	});
	if (!response.ok) throw new Error(`op.gg responded with HTTP ${response.status}`);

	const stats = parseArenaStats(await response.text());
	if (stats.length === 0) throw new Error('No Arena stats found in the op.gg page');
	return stats;
}

function positions(champions: ChampionWithRates[]): Map<number, number> {
	return new Map(champions.map((champion, index) => [champion.id, index]));
}

/** Sorts champions from the first one to ban to the last one, according to `criteria`. */
export function rankChampions(
	champions: ChampionWithRates[],
	criteria: Criteria
): ChampionWithRates[] {
	if (criteria === 'popularity') return champions.toSorted((a, b) => b.popularity - a.popularity);
	if (criteria === 'winrate') return champions.toSorted((a, b) => b.winrate - a.winrate);

	// Pick and win rates live on very different scales (~0.1 vs ~0.5): summing them would let the
	// win rate dominate. Summing each champion's position in both rankings weighs them equally.
	const byPopularity = positions(rankChampions(champions, 'popularity'));
	const byWinrate = positions(rankChampions(champions, 'winrate'));
	const score = (c: ChampionWithRates) => byPopularity.get(c.id)! + byWinrate.get(c.id)!;

	return champions.toSorted((a, b) => score(a) - score(b));
}
