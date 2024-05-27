const uniqueIds = new Map<string, number>();
export function uniqueId(prefix = ''): string {
	const count = (uniqueIds.get(prefix) ?? 0) + 1;
	uniqueIds.set(prefix, count);
	return `${prefix}${count}`;
}
