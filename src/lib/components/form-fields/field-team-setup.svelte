<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import InfoTooltip from '$lib/components/info-tooltip.svelte';
	import { fieldProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms/client';
	import type { Writable } from 'svelte/store';
	import { TEAM_SETUPS, type TeamSetupKey } from '$lib/data';

	interface Props {
		form: SuperForm<T>;
		field: FormPathLeaves<T>;
	}

	let { form, field }: Props = $props();

	const value = fieldProxy(form, field) as unknown as Writable<TeamSetupKey>;
</script>

<Form.Field {form} name={field}>
	<Form.Control>
		{#snippet children({ props })}
			<div class="flex items-center gap-1.5">
				<Form.Label>Team setup</Form.Label>
				<InfoTooltip
					text="Arena is played either as 8 duos (2v2 skirmishes) or 6 trios (3v3 skirmishes, the newer 'Arena Trios' rotation). Pick whichever your lobby is actually queuing into."
				/>
			</div>
			<Select.Root
				type="single"
				name={props.name}
				bind:value={() => $value, (v) => v && ($value = v as TeamSetupKey)}
			>
				<Select.Trigger {...props}>
					{TEAM_SETUPS[$value].label}
				</Select.Trigger>
				<Select.Content>
					{#each Object.entries(TEAM_SETUPS) as [key, teamSetup] (key)}
						<Select.Item value={key} label={teamSetup.label} />
					{/each}
				</Select.Content>
			</Select.Root>
		{/snippet}
	</Form.Control>
	<Form.Description>Choose how many teams and players per team.</Form.Description>
</Form.Field>
