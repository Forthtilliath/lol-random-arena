import { describe, expect, it } from 'vitest';
import { isDefined } from './asserts';

describe('isDefined', () => {
	it('does not throw for a defined value', () => {
		expect(() => isDefined('hello')).not.toThrow();
		expect(() => isDefined(0)).not.toThrow();
	});

	it('throws for null', () => {
		expect(() => isDefined(null)).toThrow('Value must be defined');
	});

	it('throws for undefined', () => {
		expect(() => isDefined(undefined)).toThrow('Value must be defined');
	});

	it('throws with a custom message when provided', () => {
		expect(() => isDefined(null, 'custom message')).toThrow('custom message');
	});
});
