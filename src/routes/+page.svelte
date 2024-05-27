<script lang="ts">
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
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
	import { RANKS, formSchema, type FormSchemaKey } from './schema';
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

	export let data;

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

	const { form: formData, enhance } = form;

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
			<!-- <Switch label="Randomly assign players in teams" /> -->

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
										<Select.Value placeholder="Select a verified email to display" />
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
								You can manage email address in your <a href="/examples/forms">email settings</a>.
							</Form.Description>
							<Form.FieldErrors />
						</Form.Field>

						<!-- Number of bans -->
						<Form.Field
							{form}
							name="auto_ban_count"
							class="flex flex-row items-center justify-between"
						>
							<Form.Control let:attrs>
								<div class="space-y-0.5">
									<Form.Label>Number of bans</Form.Label>
									<InputNumber {...attrs} bind:value={$formData.auto_ban_count} min={3} max={50} />
									<Form.Description>
										If enabled, you can choose to auto ban the <span class="italic">n</span> most popular
										champions.
									</Form.Description>
								</div>
							</Form.Control>
						</Form.Field>
					{/if}
				</div>
			</Fieldset>

			{#if browser}
				<SuperDebug data={$formData} />
			{/if}

			<Form.Button>Submit</Form.Button>
		</form>
	</Fieldset>
</div>
