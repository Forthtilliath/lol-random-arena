import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { fail } from '@sveltejs/kit';
import { chunk, shuffle } from '$lib/helpers/array';
import { getRandomNumber } from '$lib/helpers/number';
import { CHAMPIONS, type Champion } from '$lib/data';

export const load: PageServerLoad = async () => {
	// const html = await fetch('https://www.leagueofgraphs.com/fr/champions/builds/master/arena').then(
	// 	(r) => r.text()
	// ); 

	return {
		// html,
		form: await superValidate(zod(formSchema)),
		teams: [] as Player[][]
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { data } = form;

		let players: Player[] = Object.entries(data)
			.filter(([k]) => k.startsWith('player_'))
			.map(([, v]) => ({ name: v.toString() }));

		if (data.random_team) players = shuffle(players);

		const teams: Player[][] = chunk(players, 2);

		const championsPicked = new Set<Champion['id']>();
		for (const team of teams) {
			const championIndex = getRandomNumber(0, CHAMPIONS.length - 1);
			const champion = CHAMPIONS[championIndex];
			championsPicked.add(champion.id);
			team[0].champion = champion.name;
		}

		const championsLeft = CHAMPIONS.filter((c) => !championsPicked.has(c.id));
		for (const team of teams) {
			const championIndex = getRandomNumber(0, championsLeft.length - 1);
			const champion = championsLeft[championIndex];
			team[1].champion = champion.name;
		}

		console.log(teams);

		return {
			form,
			teams
		};
	}
};
