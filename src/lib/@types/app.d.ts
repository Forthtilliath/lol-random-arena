import type { Champion } from '$lib/champions';

declare global {
	type Primitive = string | number | boolean;

	type SelectOption<T = string> = { label: string; value: T };

	type Player = {
		name: string;
	};
	type PlayerWithChampion = Player & {
		champion: Champion;
	};
}

export {};
