import { JSDOM } from 'jsdom';

export type ChampionWithRates = {
	name: string;
	popularity: number;
	winrate: number;
};

/**
 * Retrieves a list of champions from the provided HTML string.
 *
 * @param {string} html - The HTML string containing the champions data.
 * @return {Promise<ChampionWithRates[]>} A promise that resolves to an array of Champion objects.
 */
export async function getChampions(html: string): Promise<ChampionWithRates[]> {
	const dom = new JSDOM(html);
	const document = dom.window.document;
	const champions$ = Array.from<HTMLTableRowElement>(
		document.querySelectorAll('.data_table tr')
	).filter((tr) => tr.className !== 'hide-for-dark');

	const champions: ChampionWithRates[] = [];
	for (const el$ of champions$) {
		const name$ = el$.querySelector<HTMLTableCellElement>('td:nth-child(2)');
		const popularity$ = el$.querySelector<HTMLTableCellElement>('td:nth-child(3)');
		const victory$ = el$.querySelector<HTMLTableCellElement>('td:nth-child(4)');

		if (!name$?.textContent || !popularity$ || !victory$) continue;
		const popularity = /(\S+)\sdata-value=\s*(['"])(.*?|)\2/.exec(popularity$.innerHTML);
		if (!popularity) continue;
		const victory = /(\S+)\sdata-value=\s*(['"])(.*?|)\2/.exec(victory$.innerHTML);
		if (!victory) continue;
		champions.push({
			name: name$.textContent.replace(/\s/g, ''),
			popularity: Number(popularity[3]),
			winrate: Number(victory[3])
		});
	}
	console.log(champions);

	/**
	 * Put player names
	 * Ban most X popular champions
	 * Choose rank
	 * Number of choice par player
	 */

	return champions;
}
