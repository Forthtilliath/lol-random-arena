import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { CHAMPIONS } from '$lib/data';
import { decodeTeams, encodeTeams } from './share';

function gzipBase64Url(value: unknown): string {
	return gzipSync(Buffer.from(JSON.stringify(value)))
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
}

describe('encodeTeams / decodeTeams', () => {
	it('round-trips a team composition', async () => {
		const teams: PlayerWithChampion[][] = [
			[
				{ name: 'Alice', champion: CHAMPIONS[0] },
				{ name: 'Bob', champion: CHAMPIONS[1] }
			],
			[
				{ name: 'Carol', champion: CHAMPIONS[2] },
				{ name: 'Dave', champion: CHAMPIONS[3] }
			]
		];

		const encoded = await encodeTeams(teams);
		expect(await decodeTeams(encoded)).toEqual(teams);
	});

	it('round-trips names with special/unicode characters', async () => {
		const teams: PlayerWithChampion[][] = [
			[
				{ name: 'Zoé é ü 名前', champion: CHAMPIONS[0] },
				{ name: 'a&b=c?d', champion: CHAMPIONS[1] }
			]
		];

		expect(await decodeTeams(await encodeTeams(teams))).toEqual(teams);
	});

	it('produces a URL-safe string (no +, / or = characters)', async () => {
		const teams: PlayerWithChampion[][] = [[{ name: 'Alice', champion: CHAMPIONS[0] }]];

		expect(await encodeTeams(teams)).not.toMatch(/[+/=]/);
	});

	it('produces a shorter string than the equivalent uncompressed JSON objects', async () => {
		const teams: PlayerWithChampion[][] = Array.from({ length: 8 }, (_, i) => [
			{ name: `Player ${i * 2 + 1}`, champion: CHAMPIONS[i] },
			{ name: `Player ${i * 2 + 2}`, champion: CHAMPIONS[i + 1] }
		]);
		const verbose = JSON.stringify(
			teams.map((team) => team.map((p) => ({ name: p.name, championId: p.champion.id })))
		);

		const encoded = await encodeTeams(teams);
		expect(encoded.length).toBeLessThan(verbose.length);
	});

	it('returns null for a malformed string', async () => {
		expect(await decodeTeams('not-valid-base64!!')).toBeNull();
	});

	it('drops players whose champion id no longer exists', async () => {
		const unknownId = Math.max(...CHAMPIONS.map((c) => c.id)) + 1;
		const compact = [
			[
				['Alice', CHAMPIONS[0].id],
				['Ghost', unknownId]
			]
		];

		expect(await decodeTeams(gzipBase64Url(compact))).toEqual([
			[{ name: 'Alice', champion: CHAMPIONS[0] }]
		]);
	});
});
