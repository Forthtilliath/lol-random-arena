import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	// const html = await fetch('https://www.leagueofgraphs.com/fr/champions/builds/master/arena').then(
	// 	(r) => r.text()
	// );

	return {
		// html,
		form: await superValidate(zod(formSchema))
	};
};
