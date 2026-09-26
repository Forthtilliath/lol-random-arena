<script lang="ts" generics="T extends Record<string, unknown>">
	import { untrack } from 'svelte';
	import * as Form from '$lib/components/ui/form';
	import { Switch } from '$lib/components/ui/switch';
	import {
		formFieldProxy,
		type FormFieldProxy,
		type FormPathLeaves,
		type SuperForm
	} from 'sveltekit-superforms/client';

	interface Props {
		form: SuperForm<T>;
		field: FormPathLeaves<T>;
	}

	let { form, field }: Props = $props();

	const { value } = untrack(() => formFieldProxy(form, field)) satisfies FormFieldProxy<boolean>;
</script>

<Form.Field
	{form}
	name={field}
	class="flex flex-row items-center justify-between rounded-lg border p-4"
>
	<Form.Control>
		{#snippet children({ props })}
			<div class="space-y-0.5">
				<div class="flex items-center gap-2">
					<Switch {...props} bind:checked={$value} aria-label="Randomly assign players in teams" />
					<Form.Label>Randomly assign players in teams</Form.Label>
				</div>
				<Form.Description>
					If disabled, player 1 will be with player 2, player 3 with player 4, etc.
				</Form.Description>
				<Form.FieldErrors />
			</div>
		{/snippet}
	</Form.Control>
</Form.Field>
