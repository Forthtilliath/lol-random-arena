<script lang="ts" generics="T extends Record<string, unknown>">
	import { capitalize } from '$lib/helpers/capitalize';

	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { type FormPathLeaves, type SuperForm } from 'sveltekit-superforms/client';
	import { RANKS, type Rank } from '../../../routes/schema';

	interface Props {
		form: SuperForm<T>;
		field: FormPathLeaves<T>;
		value: Rank;
	}

	let { form, field, value = $bindable() }: Props = $props();
</script>

<Form.Field {form} name={field}>
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>Rank</Form.Label>
			<Select.Root
				type="single"
				name={props.name}
				bind:value={() => value, (v) => v && (value = v as Rank)}
			>
				<Select.Trigger {...props}>
					{value ? `${capitalize(value)}+` : 'Select a rank'}
				</Select.Trigger>
				<Select.Content>
					{#each RANKS as rank (rank)}
						<Select.Item value={rank} label={`${capitalize(rank)}+`} />
					{/each}
				</Select.Content>
			</Select.Root>
		{/snippet}
	</Form.Control>
	<Form.Description>You can choose from which rank the rate should be.</Form.Description>
	<Form.FieldErrors />
</Form.Field>
