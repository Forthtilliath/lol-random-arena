import { describe, expect, it, vi } from 'vitest';
import { ARENA_STATS_URL, fetchArenaStats, parseArenaStats, rankChampions } from './arena-stats';

// Mimics op.gg's RSC payload: JSON objects with escaped quotes, champions listed more than once.
const HTML = `
<script>self.__next_f.push([1,"[{\\"key\\":\\"aatrox\\",\\"name\\":\\"Aatrox\\",\\"id\\":266,\\"is_rip\\":false,\\"win_rate\\":0.45,\\"pick_rate\\":0.08,\\"tier\\":4},{\\"key\\":\\"ahri\\",\\"name\\":\\"Ahri\\",\\"id\\":103,\\"win_rate\\":0.55,\\"pick_rate\\":0.11,\\"tier\\":2}]"])</script>
<script>self.__next_f.push([1,"[{\\"key\\":\\"aatrox\\",\\"name\\":\\"Aatrox\\",\\"id\\":266,\\"win_rate\\":0.99,\\"pick_rate\\":0.99}]"])</script>
<script>self.__next_f.push([1,"{\\"key\\":\\"menu\\",\\"name\\":\\"Stats\\",\\"label\\":\\"not a champion\\"}"])</script>
`;

describe('parseArenaStats', () => {
	it('extracts id, name, pick rate and win rate of each champion', () => {
		expect(parseArenaStats(HTML)).toEqual([
			{ id: 266, name: 'Aatrox', popularity: 0.08, winrate: 0.45 },
			{ id: 103, name: 'Ahri', popularity: 0.11, winrate: 0.55 }
		]);
	});

	it('keeps only the first occurrence of a champion', () => {
		const aatrox = parseArenaStats(HTML).filter((c) => c.id === 266);
		expect(aatrox).toEqual([{ id: 266, name: 'Aatrox', popularity: 0.08, winrate: 0.45 }]);
	});

	it('returns an empty array when the page has no stats', () => {
		expect(parseArenaStats('<p>Just a moment...</p>')).toEqual([]);
	});
});

describe('fetchArenaStats', () => {
	it('fetches the op.gg Arena page and parses it', async () => {
		const fetchFn = vi.fn(async () => new Response(HTML));

		expect(await fetchArenaStats(fetchFn)).toHaveLength(2);
		expect(fetchFn).toHaveBeenCalledWith(ARENA_STATS_URL, expect.anything());
	});

	it('throws when op.gg answers with an error status', async () => {
		const fetchFn = vi.fn(async () => new Response('blocked', { status: 403 }));

		await expect(fetchArenaStats(fetchFn)).rejects.toThrow('HTTP 403');
	});

	it('throws when the page contains no stats', async () => {
		const fetchFn = vi.fn(async () => new Response('<p>Just a moment...</p>'));

		await expect(fetchArenaStats(fetchFn)).rejects.toThrow('No Arena stats');
	});
});

describe('rankChampions', () => {
	const champions = [
		{ id: 1, name: 'A', popularity: 0.1, winrate: 0.6 },
		{ id: 2, name: 'B', popularity: 0.3, winrate: 0.4 },
		{ id: 3, name: 'C', popularity: 0.2, winrate: 0.55 }
	];

	it('sorts from the most to the least popular', () => {
		expect(rankChampions(champions, 'popularity').map((c) => c.name)).toEqual(['B', 'C', 'A']);
	});

	it('sorts from the highest to the lowest win rate', () => {
		expect(rankChampions(champions, 'winrate').map((c) => c.name)).toEqual(['A', 'C', 'B']);
	});

	it('mixes both rankings with the same weight', () => {
		// Positions (popularity + win rate): A = 2 + 0, B = 0 + 2, C = 1 + 1 -> tie, order kept
		expect(rankChampions(champions, 'mixed').map((c) => c.name)).toEqual(['A', 'B', 'C']);
	});

	it('does not mutate the given array', () => {
		const copy = [...champions];
		rankChampions(champions, 'popularity');
		expect(champions).toEqual(copy);
	});
});
