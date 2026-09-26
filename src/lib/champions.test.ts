import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CHAMPIONS } from './champions';

describe('CHAMPIONS', () => {
	it('has a unique Riot id for every champion', () => {
		expect(new Set(CHAMPIONS.map((c) => c.id)).size).toBe(CHAMPIONS.length);
	});

	it('has a portrait in static/champion for every champion', () => {
		const missing = CHAMPIONS.filter(
			(c) => !existsSync(join(process.cwd(), 'static', 'champion', `${c.slug}.png`))
		);
		expect(missing.map((c) => c.slug)).toEqual([]);
	});
});
