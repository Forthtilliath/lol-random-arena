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
		label: string;
		description: string;
	}

	let { form, field, label, description }: Props = $props();

	const { value } = untrack(() => formFieldProxy(form, field)) satisfies FormFieldProxy<boolean>;
</script>

<!-- Ligne « libellé + interrupteur » : toute la ligne est cliquable via le label. -->
<Form.Field {form} name={field}>
	<Form.Control>
		{#snippet children({ props })}
			<div
				class="flex items-center justify-between gap-4 border border-grey-3/70 bg-hextech/50 px-4 py-3"
			>
				<div class="space-y-0.5">
					<Form.Label class="text-sm font-semibold text-gold-1">{label}</Form.Label>
					<Form.Description class="text-xs text-grey-1">{description}</Form.Description>
				</div>
				<Switch {...props} bind:checked={$value} />
			</div>
		{/snippet}
	</Form.Control>
</Form.Field>
