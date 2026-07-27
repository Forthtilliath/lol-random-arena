import { describe, expect, it } from 'vitest';
import { uniqueId } from './uniqueId';

describe('uniqueId', () => {
	it('increments the counter for a given prefix', () => {
		expect(uniqueId('item-')).toBe('item-1');
		expect(uniqueId('item-')).toBe('item-2');
		expect(uniqueId('item-')).toBe('item-3');
	});

	it('tracks separate counters per prefix', () => {
		expect(uniqueId('team-')).toBe('team-1');
		expect(uniqueId('player-')).toBe('player-1');
		expect(uniqueId('team-')).toBe('team-2');
	});

	it('defaults to an empty prefix', () => {
		expect(uniqueId()).toBe('1');
		expect(uniqueId()).toBe('2');
	});
});
