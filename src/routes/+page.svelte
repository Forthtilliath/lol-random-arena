<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import * as Card from '$lib/components/ui/card';
	import { InputNumber } from '$lib/components/input-number';
	import { Fieldset } from '$lib/components/fieldset';
	import { Switch } from '$lib/components/ui/switch';
	import { Input } from '$lib/components/ui/input';

	import { capitalize } from '$lib/helpers/capitalize';
	import { CHAMPIONS } from '$lib/data.js';
	import { MIN_NON_BANNED_CHAMPIONS } from '$lib/options.const.js';

	import {
		criterias,
		RANKS,
		formSchema,
		type FormSchemaKey,
		type Criteria,
		type Rank
	} from './schema';
	import type { PageData } from './$types.js';

	/**
	 * Save in local storage
	 * Export settings ?
	 */

	export let data: PageData;

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		invalidateAll: false,
		resetForm: false,
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

	function generatePlayerKey(n: number): FormSchemaKey {
		return `player_${n + 1}` as FormSchemaKey;
	}

	const { form: formData, enhance, submitting } = form;
	let teams: Player[][] = [];

	let selectedCriteria: SelectOption<Criteria> | undefined;
	let selectedRank: SelectOption<Rank> | undefined;
	let playersSettingsVisible = true;

	$: selectedCriteria = $formData.auto_ban_most
		? {
				label: criterias[$formData.auto_ban_most],
				value: $formData.auto_ban_most
			}
		: undefined;

	$: selectedRank = $formData.rank
		? {
				label: `${capitalize($formData.rank)}+`,
				value: $formData.rank
			}
		: undefined;
</script>

<div class="container">
	<h1 class="text-5xl font-bold text-center mt-4 mb-8">Welcome to LOL Nuclear Random Arena !</h1>

	<Fieldset legend="Players settings" hideable visible={playersSettingsVisible}>
		<form method="post" use:enhance class="mx-auto space-y-4">
			<!-- Random Team -->
			<Form.Field
				{form}
				name="random_team"
				class="flex flex-row items-center justify-between rounded-lg border p-4"
			>
				<Form.Control let:attrs>
					<div class="space-y-0.5">
						<div class="flex items-center gap-2">
							<Switch includeInput {...attrs} bind:checked={$formData.random_team} />
							<Form.Label>Randomly assign players in teams</Form.Label>
						</div>
						<Form.Description>
							If disabled, player 1 will be with player 2, player 3 with player 4, etc.
						</Form.Description>
					</div>
				</Form.Control>
			</Form.Field>

			<!-- Players -->
			<div class="grid grid-cols-2 gap-4">
				{#each Array(16) as _, n}
					{@const key = generatePlayerKey(n)}

					<Form.Field {form} name={key}>
						<Form.Control let:attrs>
							<Form.Label>Player {n + 1}</Form.Label>
							<Input {...attrs} bind:value={$formData[key]} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/each}
			</div>

			<!-- Auto Ban -->
			<Fieldset legend="Auto Ban">
				<div class="space-y-4">
					<Form.Field
						{form}
						name="auto_ban"
						class="flex flex-row items-center justify-between rounded-lg border p-4"
					>
						<Form.Control let:attrs>
							<div class="space-y-0.5">
								<div class="flex items-center gap-2">
									<Switch includeInput {...attrs} bind:checked={$formData.auto_ban} />
									<Form.Label>Auto ban champions</Form.Label>
								</div>
								<Form.Description>
									If enabled, you can choose to auto ban the <span class="italic">n</span> most popular
									champions.
								</Form.Description>
							</div>
						</Form.Control>
					</Form.Field>

					{#if $formData.auto_ban}
						<!-- Number of bans -->
						<Form.Field
							{form}
							name="auto_ban_count"
							class="flex flex-row items-center justify-between"
						>
							<Form.Control let:attrs>
								<div class="space-y-0.5">
									<Form.Label>Number of bans</Form.Label>
									<InputNumber
										{...attrs}
										bind:value={$formData.auto_ban_count}
										min={1}
										max={CHAMPIONS.length - MIN_NON_BANNED_CHAMPIONS}
									/>
									<Form.Description>
										If enabled, you can choose to auto ban the <span class="italic">n</span> most popular
										champions.
									</Form.Description>
								</div>
							</Form.Control>
						</Form.Field>

						<!-- Criteria -->
						<Form.Field {form} name="auto_ban_most">
							<Form.Control let:attrs>
								<Form.Label>Criteria to auto ban</Form.Label>
								<Select.Root
									selected={selectedCriteria}
									onSelectedChange={(v) => {
										v && ($formData.auto_ban_most = v.value);
									}}
								>
									<Select.Trigger {...attrs}>
										<Select.Value placeholder="Select a criteria" />
									</Select.Trigger>
									<Select.Content>
										<Select.Item value="popularity" label="By popularity" />
										<Select.Item value="winrate" label="By winrate" />
										<Select.Item value="mixed" label="Mixed popularity and winrate" />
									</Select.Content>
								</Select.Root>
								<input hidden bind:value={$formData.auto_ban_most} name={attrs.name} />
							</Form.Control>
							<Form.Description>You can choose the criteria to auto ban.</Form.Description>
							<Form.FieldErrors />
						</Form.Field>

						<!-- Rank -->
						<Form.Field {form} name="rank">
							<Form.Control let:attrs>
								<Form.Label>Rank</Form.Label>
								<Select.Root
									selected={selectedRank}
									onSelectedChange={(v) => {
										v && ($formData.rank = v.value);
									}}
								>
									<Select.Trigger {...attrs}>
										<Select.Value placeholder="Select a rank" />
									</Select.Trigger>
									<Select.Content>
										{#each RANKS as rank}
											<Select.Item value={rank} label={`${capitalize(rank)}+`} />
										{/each}
									</Select.Content>
								</Select.Root>
								<input hidden bind:value={$formData.rank} name={attrs.name} />
							</Form.Control>
							<Form.Description>
								You can choose from which rank the rate should be.
							</Form.Description>
							<Form.FieldErrors />
						</Form.Field>
					{/if}
				</div>
			</Fieldset>

			{#if $submitting}
				<Form.Button disabled={$submitting}>Submitting...</Form.Button>
			{:else if $formData.random_team}
				<Form.Button>Generate teams & Choose champions Randomly</Form.Button>
			{:else}
				<Form.Button>Choose champions Randomly</Form.Button>
			{/if}
		</form>
	</Fieldset>
</div>

<div class="container">
	{#if teams.length > 0}
		<div class="grid grid-cols-4 gap-8">
			{#each teams as team, i}
				<Card.Root class="bg-foreground/5">
					<Card.Header>
						<Card.Title class="text-3xl">Team {i + 1}</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-2">
						{#each team as player}
							<p><span class="font-bold">{player.name}:</span> {player.champion}</p>
						{/each}
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
