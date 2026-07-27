import { describe, expect, it } from 'vitest';
import { getChampions } from './getChampions';

const HTML = `
<table class="data_table">
	<tbody>
		<tr>
			<td>1</td>
			<td>Ahri</td>
			<td><span data-value="45.2">45.2%</span></td>
			<td><span data-value="52.1">52.1%</span></td>
		</tr>
		<tr class="hide-for-dark">
			<td>2</td>
			<td>Zed</td>
			<td><span data-value="30.0">30.0%</span></td>
			<td><span data-value="48.0">48.0%</span></td>
		</tr>
		<tr>
			<td>3</td>
			<td>Lux</td>
			<td><span data-value="12.7">12.7%</span></td>
			<td><span data-value="55.9">55.9%</span></td>
		</tr>
	</tbody>
</table>
`;

describe('getChampions', () => {
	it('parses champion name, popularity and winrate from the table', async () => {
		expect(await getChampions(HTML)).toEqual([
			{ name: 'Ahri', popularity: 45.2, winrate: 52.1 },
			{ name: 'Lux', popularity: 12.7, winrate: 55.9 }
		]);
	});

	it('skips rows marked with the hide-for-dark class', async () => {
		const champions = await getChampions(HTML);
		expect(champions.find((c) => c.name === 'Zed')).toBeUndefined();
	});

	it('returns an empty array when there is no data table', async () => {
		expect(await getChampions('<p>no table here</p>')).toEqual([]);
	});
});
