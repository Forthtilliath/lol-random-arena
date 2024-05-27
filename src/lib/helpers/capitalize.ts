export function capitalize(str: string = '', lowerRest = false): string {
	const firstChar = str.slice(0, 1);
	const rest = lowerRest ? str.slice(1).toLowerCase() : str.slice(1);
	return firstChar.toUpperCase() + rest;
}
