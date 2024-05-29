<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '$lib/components/ui/form';
	import { InputNumber } from '$lib/components/input-number';
	import { fieldProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms';
	import { CHAMPIONS } from '$lib/data';
	import { MIN_NON_BANNED_CHAMPIONS } from '$lib/options.const';

	export let form: SuperForm<T>;
	export let field: FormPathLeaves<T>;

	const proxy = fieldProxy(form, field);

	let valueNumber: number;
	$: valueNumber = Number($proxy);
</script>

<Form.Field {form} name={field} class="flex flex-row items-center justify-between">
	<Form.Control let:attrs>
		<div class="space-y-0.5">
			<Form.Label>Number of bans</Form.Label>
			<InputNumber
				{...attrs}
				bind:value={valueNumber}
				min={1}
				max={CHAMPIONS.length - MIN_NON_BANNED_CHAMPIONS}
			/>
			<Form.Description>
				If enabled, you can choose to auto ban the <span class="italic">n</span> most popular champions.
			</Form.Description>
		</div>
	</Form.Control>
</Form.Field>
