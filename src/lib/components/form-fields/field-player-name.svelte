<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { fieldProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms/client';

	interface Props {
		form: SuperForm<T>;
		field: FormPathLeaves<T>;
		label: string;
	}

	let { form, field, label }: Props = $props();

	const value = fieldProxy(form, field);
</script>

<Form.Field {form} name={field}>
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>{label}</Form.Label>
			<Input {...props} bind:value={$value} />
		{/snippet}
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
