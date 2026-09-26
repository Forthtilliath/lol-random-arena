<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { fly } from 'svelte/transition';

	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Fieldset } from '$lib/components/fieldset';
	import {
		FieldTeamSetup,
		FieldRandomTeam,
		FieldPlayerName,
		FieldAutoBan,
		FieldAutoBanCount,
		FieldAutoBanCriteria,
		FieldAutoBanRank
	} from '$lib/components/form-fields';

	import { capitalize } from '$lib/helpers/capitalize';
	import { encodeTeams } from '$lib/helpers/share';
	import LinkIcon from '@lucide/svelte/icons/link';

	import { formSchema } from './schema';
	import type { PageData } from './$types.js';
	import { FORM_PLAYER_KEYS, TEAM_SETUPS } from '$lib/data';
	import { chunk } from '$lib/helpers/array';

	import DialogSave from '$lib/components/dialogs/dialog-save.svelte';
	import { setCtx } from '$lib/contexts/form-context';
	import { TEAM_NAMES } from '$lib/constants';
	import DialogLoad from '$lib/components/dialogs/dialog-load.svelte';
	import CardChampion from '$lib/components/card-champion.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const form = superForm(data.form, {
		validators: zod4Client(formSchema),
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
	let teams: PlayerWithChampion[][] = $state(data.teams);
	let playersSettingsVisible = $state(data.teams.length === 0);

	const activeSetup = $derived(TEAM_SETUPS[$formData.setup]);
	const playerGroups = $derived(
		chunk(FORM_PLAYER_KEYS.slice(0, activeSetup.playerCount), activeSetup.teamSize)
	);
	// Always lay both the player groups and the results out on 2 rows (4 columns for 8
	// duos/teams, 3 columns for 6 trios/teams).
	const groupColumns = $derived(Math.ceil(playerGroups.length / 2));
	const teamColumns = $derived(Math.ceil(teams.length / 2));

	async function copyShareLink() {
		const encoded = await encodeTeams(teams);
		const url = `${window.location.origin}${window.location.pathname}?share=${encoded}`;
		await navigator.clipboard.writeText(url);
		toast.success('Share link copied to clipboard!');
	}

	// $: browser && localStorage.setItem('formData', JSON.stringify($formData));
</script>

<div class="container">
	<h1
		class="text-5xl font-bold text-center mt-4 mb-8 bg-gradient-to-r from-sky-400 via-sky-200 to-sky-400 bg-clip-text text-transparent"
	>
		Welcome to LOL Nuclear Random Arena !
	</h1>
	<p class="text-muted-foreground text-center max-w-2xl mx-auto mb-8 text-sm text-pretty">
		Arena pits several duos or trios against each other in random skirmishes — augments and gold
		carry you between rounds until only one team is left standing. Use this tool to randomize your
		lobby's teams, bans and starting champions.
	</p>

	<Fieldset legend="Players settings" hideable visible={playersSettingsVisible}>
		<div class="flex gap-4 justify-end -translate-y-4">
			<DialogSave />
			<DialogLoad {formData} />
		</div>

		<form method="post" use:enhance class="mx-auto space-y-4">
			<div class="flex gap-4 flex-wrap items-start">
				<FieldTeamSetup {form} field="setup" />
				<FieldRandomTeam {form} field="random_team" />
			</div>

			<div
				class="grid gap-4"
				style="grid-template-columns: repeat({groupColumns}, minmax(0, 1fr));"
			>
				{#each playerGroups as group, i (group.join('-'))}
					<div class="rounded-lg border border-sky-900/60 bg-foreground/5 p-3 space-y-3">
						<p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
							{activeSetup.groupLabel}
							{i + 1}
						</p>
						{#each group as field (field)}
							<FieldPlayerName {form} {field} label={capitalize(field.replace('_', ' '))} />
						{/each}
					</div>
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
		<div class="flex justify-end mb-4">
			<Button variant="outline" onclick={copyShareLink} class="gap-2">
				Copy share link <LinkIcon class="size-4" />
			</Button>
		</div>
		<div class="grid gap-8" style="grid-template-columns: repeat({teamColumns}, minmax(0, 1fr));">
			{#each teams as team, i (i)}
				<div in:fly={{ y: 24, duration: 400, delay: i * 90 }}>
					<Card.Root class="odd:bg-foreground/5 even:bg-foreground/10">
						<Card.Header>
							<Card.Title class="text-4xl text-center">{TEAM_NAMES[i]}</Card.Title>
						</Card.Header>
						<Card.Content class="text-center flex gap-2">
							{#each team as player (player.name)}
								<CardChampion {player} />
							{/each}
						</Card.Content>
					</Card.Root>
				</div>
			{/each}
		</div>
	{/if}
</div>
