<script lang="ts">
	import { uniqueId } from '$lib/helpers/uniqueId';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';

	export let label: string;
	export let value: string | undefined = undefined;
	export let name: string | undefined = undefined;

	let id: string;
	$: id = uniqueId('input-with-label-');
</script>

<div class="flex w-full max-w-sm flex-col gap-1.5">
	<Label for={id}>{label}</Label>
	<Input type="text" {id} {name} bind:value placeholder={label} />
	<!-- <p class="text-sm text-muted-foreground">Enter your email address.</p> -->
</div>
