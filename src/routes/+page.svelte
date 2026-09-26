<script lang="ts">
	import { tick, untrack } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import DicesIcon from '@lucide/svelte/icons/dices';

	import { Button } from '$lib/components/ui/button';
	import AppHeader from '$lib/components/app-header.svelte';
	import PlayersSection from '$lib/components/players-section.svelte';
	import BansSection from '$lib/components/bans-section.svelte';
	import ResultsSection from '$lib/components/results-section.svelte';
	import { setCtx } from '$lib/contexts/form-context';
	import { encodeTeams } from '$lib/helpers/share';

	import { formSchema } from './schema';
	import type { PageData } from './$types.js';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// The form store and the initial teams are only seeded from the first `data`: superForm then
	// owns the form state, and later results come from `onResult`, not from a new `data`.
	const form = superForm(
		untrack(() => data.form),
		{
			validators: zod4Client(formSchema),
			invalidateAll: false,
			resetForm: false,
			onUpdated: ({ form: f }) => {
				if (f.message) toast.error(f.message);
				else if (!f.valid) toast.error('Corrige les champs signalés avant de lancer le tirage.');
			},
			onResult: async ({ result }) => {
				if (result.type !== 'success') return;
				teams = result.data?.teams ?? [];
				await tick();
				document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
			}
		}
	);

	const { form: formData, enhance, submitting } = form;
	setCtx(() => $formData);

	let teams: PlayerWithChampion[][] = $state(untrack(() => data.teams));

	async function copyShareLink() {
		const url = `${location.origin}${location.pathname}?share=${await encodeTeams(teams)}`;
		try {
			await navigator.clipboard.writeText(url);
			toast.success('Lien du tirage copié !');
		} catch {
			toast.error("Impossible d'accéder au presse-papiers.");
		}
	}
</script>

<AppHeader />

<div class="container space-y-8 pb-6">
	{#if teams.length > 0}
		<ResultsSection
			{teams}
			submitting={$submitting}
			onReroll={() => form.submit()}
			onShare={copyShareLink}
		/>
	{/if}

	<form method="post" use:enhance class="space-y-6">
		<PlayersSection {form} />
		<BansSection {form} />

		<!-- Bouton collé en bas d'écran sur mobile pour lancer le tirage sans remonter. -->
		<div
			class="sticky bottom-0 z-10 -mx-4 bg-linear-to-t from-hextech via-hextech/95 to-transparent px-4 pt-8 pb-4 sm:static sm:mx-0 sm:bg-none sm:p-0"
		>
			<Button type="submit" variant="hextech" size="xl" class="w-full" disabled={$submitting}>
				<DicesIcon />
				{$submitting ? 'Tirage en cours…' : 'Lancer le tirage'}
			</Button>
		</div>
	</form>
</div>
