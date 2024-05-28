import type { Champion } from '$lib/data';

declare global {
	type Primitive = string | number | boolean;

	type Player = {
		name: string;
		champion?: Champion['name'];
	};
}

export {};
