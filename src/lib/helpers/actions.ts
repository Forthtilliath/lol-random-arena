import { type Champion } from '$lib/data';
import { getChampions, type ChampionWithRates } from './getChampions';
import { getRandomNumber } from './number';

/**
 * Retrieves an array of player objects from the given data object.
 *
 * @template T - The type of the data object. It should be a Record with string keys and Primitive values.
 * @param {T} data - The data object containing players informations.
 * @return {{ name: string }[]} - An array of player objects with a 'name' property.
 */
export function getPlayers<T extends Record<string, Primitive>>(data: T): { name: string }[] {
	return Object.entries(data)
		.filter(([k]) => k.startsWith('player_'))
		.map(([, v]) => ({ name: v.toString() }));
}

/**
 * Returns a random champion from the given list of champions.
 *
 * @param {Readonly<Champion[]>} listChampions - The list of champions to choose from.
 * @return {Champion} The randomly selected champion.
 */
export function getRandomChampion(listChampions: Readonly<Champion[]>): Champion {
	const championIndex = getRandomNumber(0, listChampions.length - 1);
	return listChampions[championIndex];
}

/**
 * Assigns a random champion to every player of every team, one team position at a time
 * (all "position 0" players first, then all "position 1" players, etc.), so that a champion
 * used at an earlier position is never repeated at a later one. Mutates `teams` in place.
 *
 * @param teams - Teams to fill, grouped by position (`teams[i][position]`).
 * @param championsPool - Champions available for assignment (after bans, if any).
 * @param teamSize - Number of players per team (2 for duos, 3 for trios, etc.).
 */
export function assignChampionsToTeams<T extends { champion?: Champion }>(
	teams: T[][],
	championsPool: Readonly<Champion[]>,
	teamSize: number
): void {
	const pickedInEarlierPositions = new Set<Champion['id']>();

	for (let position = 0; position < teamSize; position++) {
		const pool = championsPool.filter((c) => !pickedInEarlierPositions.has(c.id));
		const pickedThisPosition = new Set<Champion['id']>();

		for (const team of teams) {
			const champion = getRandomChampion(pool);
			team[position].champion = champion;
			pickedThisPosition.add(champion.id);
		}

		pickedThisPosition.forEach((id) => pickedInEarlierPositions.add(id));
	}
}

export function getPath(rank: string, byWinrate: boolean = false) {
	return `https://www.leagueofgraphs.com/fr/champions/builds/${rank}/arena${byWinrate ? '/by-winrate' : ''}`;
}

export async function getChampionsRate(rank: string, byWinrate = false) {
	const html = await fetch(getPath(rank, byWinrate)).then((r) => r.text());

	return getChampions(html);
}

export function sortByPopularity(a: ChampionWithRates, b: ChampionWithRates) {
	return b.popularity - a.popularity;
}

export function sortByWinrate(a: ChampionWithRates, b: ChampionWithRates) {
	return b.winrate - a.winrate;
}

export function sortByMixed(a: ChampionWithRates, b: ChampionWithRates) {
	return b.popularity + b.winrate - (a.popularity + a.winrate);
}
