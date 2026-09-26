<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import InfoTooltip from '$lib/components/info-tooltip.svelte';
	import { type FormPathLeaves, type SuperForm } from 'sveltekit-superforms/client';
	import { criterias, type Criteria } from '../../../routes/schema';

	interface Props {
		form: SuperForm<T>;
		field: FormPathLeaves<T>;
		value: Criteria;
	}

	let { form, field, value = $bindable() }: Props = $props();
</script>

<Form.Field {form} name={field}>
	<Form.Control>
		{#snippet children({ props })}
			<div class="flex items-center gap-1.5">
				<Form.Label>Criteria to auto ban</Form.Label>
				<InfoTooltip
					text="Ranks champions using LeagueOfGraphs' Arena stats for the selected rank: by pick rate (popularity), by win rate, or a mix of both. The most popular or highest-winrate champions are the ones banned first."
				/>
			</div>
			<Select.Root
				type="single"
				name={props.name}
				bind:value={() => value, (v) => v && (value = v as Criteria)}
			>
				<Select.Trigger {...props}>
					{value ? criterias[value] : 'Select a criteria'}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="popularity" label="By popularity" />
					<Select.Item value="winrate" label="By winrate" />
					<Select.Item value="mixed" label="Mixed popularity and winrate" />
				</Select.Content>
			</Select.Root>
		{/snippet}
	</Form.Control>
	<Form.Description>You can choose the criteria to auto ban.</Form.Description>
	<Form.FieldErrors />
</Form.Field>
