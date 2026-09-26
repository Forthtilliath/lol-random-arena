import { describe, expect, it } from 'vitest';
import { LS_KEY } from '$lib/constants';
import { formSchema } from '../../routes/schema';
import { loadSave, readSaves, writeSave } from './saves';

function createStorage(initial?: string) {
	const values = new Map<string, string>();
	if (initial !== undefined) values.set(LS_KEY, initial);
	return {
		getItem: (key: string) => values.get(key) ?? null,
		setItem: (key: string, value: string) => void values.set(key, value)
	};
}

const defaults = formSchema.parse({});

describe('readSaves', () => {
	it('returns an empty object when nothing is saved', () => {
		expect(readSaves(createStorage())).toEqual({});
	});

	it('returns an empty object when the stored value is invalid JSON', () => {
		expect(readSaves(createStorage('{not json'))).toEqual({});
	});
});

describe('writeSave', () => {
	it('keeps the previous saves of the same session', () => {
		const storage = createStorage();

		writeSave('first', defaults, storage);
		writeSave('second', { ...defaults, player_1: 'Alice' }, storage);

		expect(Object.keys(readSaves(storage))).toEqual(['first', 'second']);
	});

	it('replaces a save with the same name', () => {
		const storage = createStorage();

		writeSave('lobby', defaults, storage);
		writeSave('lobby', { ...defaults, player_1: 'Alice' }, storage);

		expect(loadSave('lobby', storage)?.player_1).toBe('Alice');
	});
});

describe('loadSave', () => {
	it('returns null for an unknown save', () => {
		expect(loadSave('missing', createStorage())).toBeNull();
	});

	it('fills fields missing from saves made by older versions', () => {
		const oldSave = { random_team: false, player_1: 'Alice', auto_ban_rank: 'gold' };
		const storage = createStorage(JSON.stringify({ old: oldSave }));

		const loaded = loadSave('old', storage);

		expect(loaded?.setup).toBe('duo');
		expect(loaded?.player_1).toBe('Alice');
		expect(loaded?.random_team).toBe(false);
		expect(loaded).not.toHaveProperty('auto_ban_rank');
	});

	it('returns null when the save cannot be made valid', () => {
		const storage = createStorage(JSON.stringify({ broken: { player_1: '' } }));

		expect(loadSave('broken', storage)).toBeNull();
	});
});
