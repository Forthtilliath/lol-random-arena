<script lang="ts">
	import type { PageData } from './$types.js';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { browser } from '$app/environment';

	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { onMount } from 'svelte';
	import { InputNumber } from '$lib/components/input-number';
	// import { Input } from '$lib/components/input-with-label';
	import { Fieldset } from '$lib/components/fieldset';
	import { type Champion, getChampions } from '$lib/helpers/getChampions';
	// import { Switch } from '$lib/components/switch-with-label';
	import { Switch } from '$lib/components/ui/switch';
	import { criterias, RANKS, formSchema, type FormSchemaKey } from './schema';
	import { Input } from '$lib/components/ui/input';
	import { capitalize } from '$lib/helpers/capitalize';

	// export let data;

	let champions: Champion[] = [];

	/**
	 * Put player names (input with + to add one more)
	 * Save in local storage
	 * Ban most X popular champions
	 * Choose rank
	 * Number of choice par player
	 * Export settings ?
	 */

	// onMount(async () => {
	// 	champions = await getChampions(data.html);
	// });
	// $: console.log(champions);

	export let data: PageData;

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	function generatePlayerKey(n: number): FormSchemaKey {
		return `player_${n + 1}` as FormSchemaKey;
	}

	const { form: formData, enhance, submitting } = form;

	$: selectedMost = $formData.auto_ban_most
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

	<Fieldset legend="Players">
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
									<InputNumber {...attrs} bind:value={$formData.auto_ban_count} min={1} max={170} />
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
									selected={selectedMost}
									onSelectedChange={(v) => {
										v && ($formData.auto_ban_most = v.value);
									}}
								>
									<Select.Trigger {...attrs}>
										<Select.Value placeholder="Select a criteria" />
									</Select.Trigger>
									<Select.Content>
										<Select.Item value="populars" label="Most populars" />
										<Select.Item value="victories" label="Most victories" />
										<Select.Item value="mixed" label="Mixed populars and victories" />
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

{#if browser}
	<SuperDebug data={$formData} />
{/if}
