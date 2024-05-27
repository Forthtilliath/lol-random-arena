<script lang="ts">
	import type { InputEvents, InputProps } from "./index.js";
	import Button from './button.svelte';
	import Input from './input.svelte';

	type $$Props = InputProps;
	type $$Events = InputEvents;

	export let value: number = 1;
	export let min: number = 1;
	export let max: number = 16;

	function onKeyDown(e: $$Events['keydown']) {
		if (!/[0-9]/.test(e.key)) e.preventDefault();
		if (e.key === 'ArrowUp') value = Math.min(max, value + 1);
		if (e.key === 'ArrowDown') value = Math.max(min, value - 1);
	}

	function onInput(e: $$Events['input']) {
		value = Math.max(min, Math.min(max, Number(e.currentTarget.value)));
	}
</script>

<div>
	<!-- <label for="quantity-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
		Choose quantity:
	</label> -->
	<div class="relative flex items-center max-w-[8rem]">
		<Button
			variant="minus"
			on:click={() => (value = Math.max(min, value - 1))}
			disabled={value === min}
		/>
		<Input bind:value on:keydown={onKeyDown} on:input={onInput} />
		<Button
			variant="plus"
			on:click={() => (value = Math.min(max, value + 1))}
			disabled={value === max}
		/>
	</div>
</div>
