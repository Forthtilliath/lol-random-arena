<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Fieldset } from '$lib/components/fieldset';
	import {
		FieldRandomTeam,
		FieldPlayerName,
		FieldAutoBan,
		FieldAutoBanCount,
		FieldAutoBanCriteria,
		FieldAutoBanRank
	} from '$lib/components/form-fields';

	import { capitalize } from '$lib/helpers/capitalize';

	import { formSchema } from './schema';
	import type { PageData } from './$types.js';
	import { FORM_PLAYER_KEYS } from '$lib/data';

	import DialogSave from '$lib/components/dialogs/dialog-save.svelte';
	import { setCtx } from '$lib/contexts/form-context';
	import { TEAM_NAMES } from '$lib/constants';
	import { cn } from '$lib/utils';
	import DialogLoad from '$lib/components/dialogs/dialog-load.svelte';

	export let data: PageData;

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		invalidateAll: false,
		resetForm: false,
		// onChange: () => {
		// 	localStorage.setItem('formData', JSON.stringify($formData));
		// },
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.info('Submitted!');
			} else {
				toast.error('Please fix the errors in the form.');
			}
		},
		onResult: ({ result }) => {
			if (result.type === 'success') {
				teams = result?.data?.teams;
				playersSettingsVisible = false;
			}
		}
	});

	setCtx(() => $formData);

	const { form: formData, enhance, submitting } = form;
	let teams: Player[][] = [];
	let playersSettingsVisible = true;

	// $: browser && localStorage.setItem('formData', JSON.stringify($formData));
</script>

<div class="container">
	<h1 class="text-5xl font-bold text-center mt-4 mb-8 bg-gradient-to-r from-sky-400 via-sky-200 to-sky-400 bg-clip-text text-transparent">Welcome to LOL Nuclear Random Arena !</h1>

	<Fieldset legend="Players settings" hideable visible={playersSettingsVisible}>
		<div class="flex gap-4 justify-end -translate-y-4">
			<DialogSave />
			<DialogLoad {formData} />
		</div>

		<form method="post" use:enhance class="mx-auto space-y-4">
			<FieldRandomTeam {form} field="random_team" />

			<div class="grid grid-cols-players gap-4">
				{#each FORM_PLAYER_KEYS as field}
					<FieldPlayerName {form} {field} label={capitalize(field.replace('_', ' '))} />
				{/each}
			</div>

			<Fieldset legend="Auto Ban">
				<div class="space-y-4">
					<FieldAutoBan {form} field="auto_ban" />

					{#if $formData.auto_ban}
						<FieldAutoBanCount {form} field="auto_ban_count" />

						<FieldAutoBanCriteria
							{form}
							field="auto_ban_criteria"
							value={$formData.auto_ban_criteria}
						/>

						<FieldAutoBanRank {form} field="auto_ban_rank" value={$formData.auto_ban_rank} />
					{/if}
				</div>
			</Fieldset>

			{#if $submitting}
				<Form.Button disabled={$submitting}>Submitting...</Form.Button>
			{:else}
				<Form.Button>Choose champions Randomly</Form.Button>
			{/if}
		</form>
	</Fieldset>
</div>

<div class="container">
	{#if teams.length > 0}
		<div class="grid grid-cols-cards gap-8">
			{#each teams as team, i}
				<Card.Root class="odd:bg-foreground/5 even:bg-foreground/10">
					<Card.Header>
						<Card.Title class="text-4xl text-center">{TEAM_NAMES[i]}</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-2 text-center">
						{#each team as player, i}
							<p class="text-xl font-medium">{player.name}</p>
							<p
								class={cn('text-lg font-bold', {
									'text-green-500': i === 0,
									'text-red-500': i === 1
								})}
							>
								{player.champion}
							</p>
						{/each}
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
