import { type Champion } from '$lib/data';
import { getChampions } from './getChampions';
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

export function getPath(rank: string, byWinrate: boolean = false) {
	return `https://www.leagueofgraphs.com/fr/champions/builds/${rank}/arena${byWinrate ? '/by-winrate' : ''}`;
}

export async function getChampionsRate(rank: string, byWinrate = false) {
	const html = await fetch(getPath(rank, byWinrate)).then(
		(r) => r.text()
  );

  return getChampions(html);
}
