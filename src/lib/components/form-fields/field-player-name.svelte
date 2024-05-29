<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formFieldProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms';

	export let form: SuperForm<T>;
	export let field: FormPathLeaves<T>;
	export let label: string;

  const { value } = formFieldProxy(form, field);
</script>

<Form.Field {form} name={field}>
	<Form.Control let:attrs>
		<Form.Label>{label}</Form.Label>
		<Input {...attrs} bind:value={$value} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
