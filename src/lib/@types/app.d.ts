import type { Champion } from '$lib/data';

declare global {
	type Player = {
		name: string;
		champion?: Champion['name'];
	};
}

export {};
