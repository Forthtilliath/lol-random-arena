<script lang="ts">
	import type { InputProps } from './index.js';
	import Button from './button.svelte';
	import Input from './input.svelte';
	import { isDefined } from '$lib/helpers/asserts.js';

	let {
		value = $bindable(0),
		min = -Infinity,
		max = Infinity,
		...restProps
	}: InputProps = $props();

	function decrement() {
		isDefined(value, 'Value must be defined');
		isDefined(min, 'Min must be defined');

		value = Math.max(min, value - 1);
	}
	function increment() {
		isDefined(value, 'Value must be defined');
		isDefined(max, 'Max must be defined');

		value = Math.min(max, value + 1);
	}

	function onKeyDown(e: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		isDefined(value, 'Value must be defined');
		isDefined(min, 'Min must be defined');
		isDefined(max, 'Max must be defined');

		if (!/[0-9]/.test(e.key)) e.preventDefault();
		if (e.key === 'ArrowUp') value = Math.min(max, value + 1);
		if (e.key === 'ArrowDown') value = Math.max(min, value - 1);
	}

	function onInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		isDefined(min, 'Min must be defined');
		isDefined(max, 'Max must be defined');

		value = Math.max(min, Math.min(max, Number(e.currentTarget.value)));
	}

	function isDisabled(
		a: number | undefined,
		b: number | undefined,
		fn: (a: number, b: number) => boolean
	) {
		isDefined(a);
		isDefined(b);

		return fn(a, b);
	}
</script>

<div class="relative flex items-center max-w-[8rem]">
	<Button variant="minus" onclick={decrement} disabled={isDisabled(value, min, (a, b) => a <= b)} />
	<Input bind:value {min} {max} onkeydown={onKeyDown} oninput={onInput} {...restProps} />
	<Button variant="plus" onclick={increment} disabled={isDisabled(value, max, (a, b) => a >= b)} />
</div>
