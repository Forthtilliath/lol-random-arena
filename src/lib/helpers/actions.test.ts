import { describe, expect, it } from 'vitest';
import { assignChampionsToTeams, getPlayers, getRandomChampion } from './actions';

const champions = [
	{ id: 1, slug: 'Ahri', name: 'Ahri' },
	{ id: 2, slug: 'Zed', name: 'Zed' },
	{ id: 3, slug: 'Lux', name: 'Lux' },
	{ id: 4, slug: 'Garen', name: 'Garen' },
	{ id: 5, slug: 'Jinx', name: 'Jinx' },
	{ id: 6, slug: 'Yasuo', name: 'Yasuo' }
] as const;

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

describe('assignChampionsToTeams', () => {
	it('assigns a champion to every player of every team (duos)', () => {
		const teams: { champion?: (typeof champions)[number] }[][] = [
			[{}, {}],
			[{}, {}],
			[{}, {}]
		];

		assignChampionsToTeams(teams, champions);

		for (const team of teams) {
			for (const player of team) {
				expect(player.champion).toBeDefined();
				expect(champions).toContainEqual(player.champion);
			}
		}
	});

	it('assigns a champion to every player of every team (trios)', () => {
		const teams: { champion?: (typeof champions)[number] }[][] = [
			[{}, {}, {}],
			[{}, {}, {}]
		];

		assignChampionsToTeams(teams, champions);

		for (const team of teams) {
			expect(team).toHaveLength(3);
			for (const player of team) {
				expect(player.champion).toBeDefined();
			}
		}
	});

	it('never picks the same champion twice in the lobby', () => {
		// As many players as champions: any duplicate would leave a champion unused.
		for (let run = 0; run < 50; run++) {
			const teams: { champion?: (typeof champions)[number] }[][] = [
				[{}, {}],
				[{}, {}],
				[{}, {}]
			];

			assignChampionsToTeams(teams, champions);

			const ids = teams.flat().map((player) => player.champion?.id);
			expect(new Set(ids).size).toBe(champions.length);
		}
	});
});
