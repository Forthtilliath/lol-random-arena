import { describe, expect, it } from 'vitest';
import { chunk, shuffle } from './array';

describe('chunk', () => {
	it('splits an array into groups of the given size', () => {
		expect(chunk([1, 2, 3, 4], 2)).toEqual([
			[1, 2],
			[3, 4]
		]);
	});

	it('keeps the remainder in a smaller last group', () => {
		expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
	});

	it('returns an empty array for an empty input', () => {
		expect(chunk([], 2)).toEqual([]);
	});
});

describe('shuffle', () => {
	it('keeps the same elements, only reordered', () => {
		const input = [1, 2, 3, 4, 5, 6, 7, 8];
		const result = shuffle([...input]);

		expect(result).toHaveLength(input.length);
		expect([...result].sort()).toEqual([...input].sort());
	});

	it('mutates and returns the same array reference', () => {
		const input = [1, 2, 3];
		const result = shuffle(input);

		expect(result).toBe(input);
	});
});
