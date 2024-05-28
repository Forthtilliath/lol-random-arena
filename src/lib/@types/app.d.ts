import type { Champion } from '$lib/data';

declare global {
	type Primitive = string | number | boolean;

	type SelectOption<T = string> = { label: string; value: T };

	type Player = {
		name: string;
		champion?: Champion['name'];
	};
}

export {};
