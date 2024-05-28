export type Champion = {
	name: string;
	popularity: number;
	victory: number;
};

/**
 * Retrieves a list of champions from the provided HTML string.
 *
 * @param {string} html - The HTML string containing the champions data.
 * @return {Promise<Champion[]>} A promise that resolves to an array of Champion objects.
 */
export async function getChampions(html: string): Promise<Champion[]> {
	const feedDocument = new DOMParser().parseFromString(html, 'text/html');
	const champions$ = Array.from<HTMLTableRowElement>(
		feedDocument.querySelectorAll('.data_table tr')
	).filter((tr) => tr.className !== 'hide-for-dark');

	const champions: Champion[] = [];
	for (const el$ of champions$) {
		const name$ = el$.querySelector<HTMLTableCellElement>('td:nth-child(2)');
		const popularity$ = el$.querySelector<HTMLTableCellElement>('td:nth-child(3)');
		const victory$ = el$.querySelector<HTMLTableCellElement>('td:nth-child(4)');

		if (!name$ || !popularity$ || !victory$) continue;
		const popularity = /(\S+)\sdata-value=\s*(['"])(.*?|)\2/.exec(popularity$.innerHTML);
		if (!popularity) continue;
		const victory = /(\S+)\sdata-value=\s*(['"])(.*?|)\2/.exec(victory$.innerHTML);
		if (!victory) continue;

		champions.push({
			name: name$.innerText.trim(),
			popularity: Number(popularity[3]),
			// popularity: Number(Number(popularity[3]).toFixed(4)),
			victory: Number(victory[3])
		});
	}

	/**
	 * Put player names
	 * Ban most X popular champions
	 * Choose rank
	 * Number of choice par player
	 */

	return champions;
}
