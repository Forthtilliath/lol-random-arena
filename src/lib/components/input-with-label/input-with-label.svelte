<script lang="ts">
	import { uniqueId } from '$lib/helpers/uniqueId';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';

	interface Props {
		label: string;
		value?: string | undefined;
		name?: string | undefined;
	}

	let { label, value = $bindable(undefined), name = undefined }: Props = $props();

	let id: string = $derived(uniqueId('input-with-label-'));
</script>

<div class="flex w-full max-w-sm flex-col gap-1.5">
	<Label for={id}>{label}</Label>
	<Input type="text" {id} {name} bind:value placeholder={label} />
	<!-- <p class="text-sm text-muted-foreground">Enter your email address.</p> -->
</div>
