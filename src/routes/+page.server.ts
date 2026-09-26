import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { fail } from '@sveltejs/kit';
import { chunk, shuffle } from '$lib/helpers/array';
import { CHAMPIONS, TEAM_SETUPS } from '$lib/data';
import {
	assignChampionsToTeams,
	getChampionsRate,
	getPlayers,
	sortByMixed
} from '$lib/helpers/actions';
import { decodeTeams } from '$lib/helpers/share';
import type { ChampionWithRates } from '$lib/helpers/getChampions';

export const load: PageServerLoad = async ({ url }) => {
	const shared = url.searchParams.get('share');
	const teams: PlayerWithChampion[][] = shared ? ((await decodeTeams(shared)) ?? []) : [];

	return {
		form: await superValidate(zod4(formSchema)),
		teams
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { data } = form;
		const setup = TEAM_SETUPS[data.setup];

		// Generate teams (only the players relevant to the selected setup, in declaration order)
		let players: Player[] = getPlayers(data).slice(0, setup.playerCount);
		if (data.random_team) players = shuffle(players);
		const teams: Partial<PlayerWithChampion>[][] = chunk(players, setup.teamSize);

		// Fetch champions to ban
		let championsLeft = CHAMPIONS;
		if (data.auto_ban) {
			let champions: ChampionWithRates[] = await getChampionsRate(
				data.auto_ban_rank,
				data.auto_ban_criteria === 'winrate'
			);

			if (data.auto_ban_criteria === 'mixed') {
				champions = champions.toSorted(sortByMixed);
			}

			const championsBanned = champions.slice(0, data.auto_ban_count);

			championsLeft = CHAMPIONS.filter(
				(c) => !championsBanned.map((c) => c.name.replace('\\', '')).includes(c.slug)
			);
		}

		// Pick a random champion for each player, position by position
		assignChampionsToTeams(teams, championsLeft, setup.teamSize);

		return {
			form,
			teams: teams as PlayerWithChampion[][]
		};
	}
};
