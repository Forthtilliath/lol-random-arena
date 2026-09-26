import { message, superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { fail } from '@sveltejs/kit';
import { chunk, shuffle } from '$lib/helpers/array';
import { CHAMPIONS, TEAM_SETUPS } from '$lib/data';
import { assignChampionsToTeams, getPlayers } from '$lib/helpers/actions';
import { fetchArenaStats, rankChampions } from '$lib/helpers/arena-stats';
import { decodeTeams } from '$lib/helpers/share';

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

		// Ban the top champions of op.gg's Arena stats for the chosen criteria
		let championsLeft = CHAMPIONS;
		if (data.auto_ban) {
			let stats;
			try {
				stats = await fetchArenaStats();
			} catch (error) {
				console.error('Failed to fetch Arena stats', error);
				return message(
					form,
					'Impossible de récupérer les statistiques op.gg. Réessaie, ou lance le tirage sans bannissement.',
					{
						status: 502
					}
				);
			}

			const bannedIds = new Set(
				rankChampions(stats, data.auto_ban_criteria)
					.slice(0, data.auto_ban_count)
					.map((champion) => champion.id)
			);
			championsLeft = CHAMPIONS.filter((champion) => !bannedIds.has(champion.id));
		}

		// Pick a random champion for each player, position by position
		assignChampionsToTeams(teams, championsLeft);

		return {
			form,
			teams: teams as PlayerWithChampion[][]
		};
	}
};
