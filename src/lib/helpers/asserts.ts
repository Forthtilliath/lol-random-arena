export function isDefined<T>(value: T | null | undefined, message?: string): asserts value is NonNullable<T> {
	if (value === undefined || value === null) {
		throw new Error(message ?? 'Value must be defined');
	}
}
