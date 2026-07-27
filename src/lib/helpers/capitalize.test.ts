import { describe, expect, it } from 'vitest';
import { capitalize } from './capitalize';

describe('capitalize', () => {
	it('uppercases the first character', () => {
		expect(capitalize('hello')).toBe('Hello');
	});

	it('leaves the rest of the string untouched by default', () => {
		expect(capitalize('hELLO')).toBe('HELLO');
	});

	it('lowercases the rest of the string when lowerRest is true', () => {
		expect(capitalize('hELLO', true)).toBe('Hello');
	});

	it('returns an empty string when no argument is given', () => {
		expect(capitalize()).toBe('');
	});
});
