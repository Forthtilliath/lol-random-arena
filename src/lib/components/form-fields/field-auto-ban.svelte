<script lang="ts" generics="T extends Record<string, unknown>">
	import * as Form from '$lib/components/ui/form';
	import { Switch } from '$lib/components/ui/switch';
	import InfoTooltip from '$lib/components/info-tooltip.svelte';
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

	const { value } = formFieldProxy(form, field) satisfies FormFieldProxy<boolean>;
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
					<Switch {...props} bind:checked={$value} aria-label="Auto ban champions" />
					<Form.Label>Auto ban champions</Form.Label>
					<InfoTooltip
						text="In a real Arena match, each player bans one champion during champion select. This simulates that by removing the strongest picks from the pool before assigning champions, so your lobby isn't full of the same few champions every game."
					/>
				</div>
				<Form.Description>
					If enabled, you can choose to auto ban the <span class="italic">n</span> most popular champions.
				</Form.Description>
			</div>
		{/snippet}
	</Form.Control>
</Form.Field>
