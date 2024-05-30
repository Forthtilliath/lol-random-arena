<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '$lib/components/ui/form';
	import { Switch } from '$lib/components/ui/switch';
	import {
		formFieldProxy,
		type FormFieldProxy,
		type FormPathLeaves,
		type SuperForm
	} from 'sveltekit-superforms';

	export let form: SuperForm<T>;
	export let field: FormPathLeaves<T>;

	const { value } = formFieldProxy(form, field) satisfies FormFieldProxy<boolean>;
</script>

<Form.Field
	{form}
	name={field}
	class="flex flex-row items-center justify-between rounded-lg border p-4"
>
	<Form.Control let:attrs>
		<div class="space-y-0.5">
			<div class="flex items-center gap-2">
				<Switch includeInput {...attrs} bind:checked={$value} aria-label="Auto ban champions" />
				<Form.Label>Auto ban champions</Form.Label>
			</div>
			<Form.Description>
				If enabled, you can choose to auto ban the <span class="italic">n</span> most popular champions.
			</Form.Description>
		</div>
	</Form.Control>
</Form.Field>
