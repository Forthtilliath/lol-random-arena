<script lang="ts">
	import Button from './button.svelte';
	import Input from './input.svelte';

	export let value: number;
	export let min: number = 1;
	export let max: number = 16;
</script>

<label for="quantity-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
	Choose quantity:
</label>
<div class="relative flex items-center max-w-[8rem]">
	<Button variant="minus" on:click={() => (value = Math.max(min, value - 1))} disabled={value === min} />
	<Input bind:value />
	<Button variant="plus" on:click={() => (value = Math.min(max, value + 1))} disabled={value === max} />
</div>
