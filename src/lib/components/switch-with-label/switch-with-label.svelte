<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { uniqueId } from '$lib/helpers/uniqueId';

	interface Props {
		label: string;
		checked?: boolean | undefined;
		name?: string | undefined;
	}

	let { label, checked = undefined, name = undefined }: Props = $props();

	let id: string = $derived(uniqueId('input-with-label-'));
</script>

<div class="flex items-center space-x-2">
	<Switch {id} {checked} {name} />
	<Label for={id}>{label}</Label>
</div>
