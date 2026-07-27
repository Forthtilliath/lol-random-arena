import { describe, expect, it } from 'vitest';
import {
	getPath,
	getPlayers,
	getRandomChampion,
	sortByMixed,
	sortByPopularity,
	sortByWinrate
} from './actions';

describe('getPlayers', () => {
	it('extracts only the player_* fields as { name } objects', () => {
		const data = {
			random_team: true,
			player_1: 'Alice',
			player_2: 'Bob',
			auto_ban: false
		};

		expect(getPlayers(data)).toEqual([{ name: 'Alice' }, { name: 'Bob' }]);
	});

	it('returns an empty array when there are no player fields', () => {
		expect(getPlayers({ random_team: true })).toEqual([]);
	});
});

describe('getRandomChampion', () => {
	it('returns a champion that belongs to the given list', () => {
		const champions = [
			{ id: 1, slug: 'Ahri', name: 'Ahri' },
			{ id: 2, slug: 'Zed', name: 'Zed' },
			{ id: 3, slug: 'Lux', name: 'Lux' }
		] as const;

		for (let i = 0; i < 20; i++) {
			expect(champions).toContainEqual(getRandomChampion(champions));
		}
	});
});

describe('getPath', () => {
	it('builds the popularity url by default', () => {
		expect(getPath('platinum')).toBe(
			'https://www.leagueofgraphs.com/fr/champions/builds/platinum/arena'
		);
	});

	it('builds the winrate url when byWinrate is true', () => {
		expect(getPath('platinum', true)).toBe(
			'https://www.leagueofgraphs.com/fr/champions/builds/platinum/arena/by-winrate'
		);
	});
});

describe('sort helpers', () => {
	const champions = [
		{ name: 'A', popularity: 10, winrate: 60 },
		{ name: 'B', popularity: 30, winrate: 40 },
		{ name: 'C', popularity: 20, winrate: 50 }
	];

	it('sortByPopularity sorts from the most to the least popular', () => {
		expect([...champions].sort(sortByPopularity).map((c) => c.name)).toEqual(['B', 'C', 'A']);
	});

	it('sortByWinrate sorts from the highest to the lowest winrate', () => {
		expect([...champions].sort(sortByWinrate).map((c) => c.name)).toEqual(['A', 'C', 'B']);
	});

	it('sortByMixed sorts by combined popularity + winrate', () => {
		// A: 70, B: 70, C: 70 -> stable order kept as-is when tied
		expect([...champions].sort(sortByMixed).map((c) => c.name)).toEqual(['A', 'B', 'C']);
	});
});
