<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { uniqueId } from '$lib/helpers/uniqueId';

	export let label: string;
	export let checked: boolean | undefined = undefined;
	export let name: string | undefined = undefined;

	let id: string;
	$: id = uniqueId('input-with-label-');
</script>

<div class="flex items-center space-x-2">
	<Switch {id} {checked} {name} />
	<Label for={id}>{label}</Label>
</div>
