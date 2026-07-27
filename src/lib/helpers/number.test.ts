import { describe, expect, it } from 'vitest';
import { getRandomNumber, getSecureRandomNumber } from './number';

describe('getSecureRandomNumber', () => {
	it('returns a number between 0 and 1', () => {
		for (let i = 0; i < 50; i++) {
			const value = getSecureRandomNumber();
			expect(value).toBeGreaterThanOrEqual(0);
			expect(value).toBeLessThan(1);
		}
	});
});

describe('getRandomNumber', () => {
	it('returns an integer within the given bounds (inclusive)', () => {
		for (let i = 0; i < 100; i++) {
			const value = getRandomNumber(1, 5);
			expect(Number.isInteger(value)).toBe(true);
			expect(value).toBeGreaterThanOrEqual(1);
			expect(value).toBeLessThanOrEqual(5);
		}
	});

	it('returns the single possible value when min equals max', () => {
		expect(getRandomNumber(3, 3)).toBe(3);
	});
});
