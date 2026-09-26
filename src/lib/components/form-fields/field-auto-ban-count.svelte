<script lang="ts" generics="T extends Record<string, unknown>">
	import { untrack } from 'svelte';
	import * as Form from '$lib/components/ui/form';
	import { InputNumber } from '$lib/components/input-number';
	import { fieldProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms/client';
	import type { Writable } from 'svelte/store';
	import { MAX_AUTO_BANS } from '../../../routes/schema';

	interface Props {
		form: SuperForm<T>;
		field: FormPathLeaves<T>;
	}

	let { form, field }: Props = $props();

	const proxy = untrack(() => fieldProxy(form, field)) as unknown as Writable<number>;
</script>

<Form.Field {form} name={field}>
	<Form.Control>
		{#snippet children({ props })}
			<div class="flex flex-wrap items-center justify-between gap-3">
				<div class="space-y-0.5">
					<Form.Label class="text-sm font-semibold text-gold-1">Nombre de bannissements</Form.Label>
					<Form.Description class="text-xs text-grey-1">
						Les <span class="text-gold-2">{$proxy}</span> premiers champions du classement sont retirés
						du tirage.
					</Form.Description>
				</div>
				<InputNumber {...props} bind:value={$proxy} min={1} max={MAX_AUTO_BANS} />
			</div>
		{/snippet}
	</Form.Control>
	<Form.FieldErrors class="text-xs" />
</Form.Field>
