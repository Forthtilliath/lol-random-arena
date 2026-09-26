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

<Form.Field {form} name={field} class="flex flex-row items-center justify-between">
	<Form.Control>
		{#snippet children({ props })}
			<div class="space-y-0.5">
				<Form.Label>Number of bans</Form.Label>
				<InputNumber {...props} bind:value={$proxy} min={1} max={MAX_AUTO_BANS} />
				<Form.Description>
					You can choose to auto ban the <span class="italic">n</span> most popular champions.
				</Form.Description>
			</div>
		{/snippet}
	</Form.Control>
</Form.Field>
