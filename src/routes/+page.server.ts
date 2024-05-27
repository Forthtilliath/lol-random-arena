import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types.js';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	// const html = await fetch('https://www.leagueofgraphs.com/fr/champions/builds/master/arena').then(
	// 	(r) => r.text()
	// );

	return {
		// html,
		form: await superValidate(zod(formSchema))
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
		console.log(form)
		return {
			form
		};
	}
};
