import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { fail } from '@sveltejs/kit';
import { chunk, shuffle } from '$lib/helpers/array';
import { CHAMPIONS, type Champion } from '$lib/data';
import { getChampionsRate, getPlayers, getRandomChampion } from '$lib/helpers/actions';

export const load: PageServerLoad = async () => {
	return {
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

		// Generate teams
		let players: Player[] = getPlayers(data);
		if (data.random_team) players = shuffle(players);
		const teams: Player[][] = chunk(players, 2);

		// Fetch champions to ban
		let championsLeft = CHAMPIONS;
		if (data.auto_ban) {
			const champions = await getChampionsRate(data.rank, data.auto_ban_most === 'winrate');
			console.log(champions)
		}

		// Pick random champion for each team
		const championsPicked = new Set<Champion['id']>();
		for (const team of teams) {
			const champion = getRandomChampion(championsLeft);
			championsPicked.add(champion.id);
			team[0].champion = champion.name;
		}

		championsLeft = CHAMPIONS.filter((c) => !championsPicked.has(c.id));
		for (const team of teams) {
			const champion = getRandomChampion(championsLeft);
			team[1].champion = champion.name;
		}

		return {
			form,
			teams
		};
	}
};
