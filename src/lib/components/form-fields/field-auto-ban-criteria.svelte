<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { type FormPathLeaves, type SuperForm } from 'sveltekit-superforms';
	import { criterias, type Criteria } from '../../../routes/schema';

	export let form: SuperForm<T>;
	export let field: FormPathLeaves<T>;
	// export let selected: SelectOption<Criteria> | undefined;
	export let value: Criteria;

	$: selected = value
		? {
				label: criterias[value],
				value: value
			}
		: undefined;
</script>

<Form.Field {form} name={field}>
	<Form.Control let:attrs>
		<Form.Label>Criteria to auto ban</Form.Label>
		<Select.Root
			preventScroll={false}
			{selected}
			onSelectedChange={(v) => {
				v && (value = v.value);
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
		<input hidden bind:value name={attrs.name} />
	</Form.Control>
	<Form.Description>You can choose the criteria to auto ban.</Form.Description>
	<Form.FieldErrors />
</Form.Field>
