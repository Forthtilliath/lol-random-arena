<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '$lib/components/ui/form';
	import { InputNumber } from '$lib/components/input-number';
	import { fieldProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms/client';
	import { CHAMPIONS } from '$lib/data';
	import { MIN_NON_BANNED_CHAMPIONS } from '$lib/constants';

	interface Props {
		form: SuperForm<T>;
		field: FormPathLeaves<T>;
	}

	let { form, field }: Props = $props();

	const proxy = fieldProxy(form, field);

	let valueNumber: number = $derived(Number($proxy));
</script>

<Form.Field {form} name={field} class="flex flex-row items-center justify-between">
	<Form.Control>
		{#snippet children({ props })}
			<div class="space-y-0.5">
				<Form.Label>Number of bans</Form.Label>
				<InputNumber
					{...props}
					bind:value={valueNumber}
					min={1}
					max={CHAMPIONS.length - MIN_NON_BANNED_CHAMPIONS}
				/>
				<Form.Description>
					You can choose to auto ban the <span class="italic">n</span> most popular champions.
				</Form.Description>
			</div>
		{/snippet}
	</Form.Control>
</Form.Field>
