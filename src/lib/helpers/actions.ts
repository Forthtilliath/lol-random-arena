import { type Champion } from '$lib/data';
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
 * Assigns a random champion to every player of every team. As in a real Arena lobby, a champion
 * is never picked twice. Mutates `teams` in place.
 *
 * @param teams - Teams to fill (`teams[i][position]`).
 * @param championsPool - Champions available for assignment (after bans, if any). Must hold at
 * least as many champions as there are players.
 */
export function assignChampionsToTeams<T extends { champion?: Champion }>(
	teams: T[][],
	championsPool: Readonly<Champion[]>
): void {
	const pool = [...championsPool];

	for (const team of teams) {
		for (const player of team) {
			const champion = getRandomChampion(pool);
			player.champion = champion;
			pool.splice(pool.indexOf(champion), 1);
		}
	}
}
