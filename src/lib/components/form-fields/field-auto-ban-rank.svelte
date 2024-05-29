<script lang="ts" generics="T extends Record<string, unknown>">
	import { capitalize } from '$lib/helpers/capitalize';

	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { type FormPathLeaves, type SuperForm } from 'sveltekit-superforms';
	import { RANKS, type Rank } from '../../../routes/schema';

	export let form: SuperForm<T>;
	export let field: FormPathLeaves<T>;
	export let value: Rank;

	$: selected = value ? { label: `${capitalize(value)}+`, value: value } : undefined;
</script>

<Form.Field {form} name={field}>
	<Form.Control let:attrs>
		<Form.Label>Rank</Form.Label>
		<Select.Root
			preventScroll={false}
			{selected}
			onSelectedChange={(v) => {
				v && (value = v.value);
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
		<input hidden bind:value name={attrs.name} />
	</Form.Control>
	<Form.Description>You can choose from which rank the rate should be.</Form.Description>
	<Form.FieldErrors />
</Form.Field>
