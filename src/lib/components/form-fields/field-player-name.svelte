<script lang="ts" generics="T extends Record<string, unknown>">
	import { untrack } from 'svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { fieldProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms/client';

	interface Props {
		form: SuperForm<T>;
		field: FormPathLeaves<T>;
		label: string;
	}

	let { form, field, label }: Props = $props();

	const value = untrack(() => fieldProxy(form, field));
</script>

<Form.Field {form} name={field} class="gap-1">
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label class="sr-only">{label}</Form.Label>
			<Input
				{...props}
				bind:value={$value}
				placeholder={label}
				autocomplete="off"
				class="h-9 rounded-none border-grey-3 px-2 bg-hextech/70 text-gold-1 placeholder:text-grey-2 focus-visible:border-gold-2 focus-visible:ring-blue-2/30 md:text-sm"
			/>
		{/snippet}
	</Form.Control>
	<Form.FieldErrors class="text-xs" />
</Form.Field>
