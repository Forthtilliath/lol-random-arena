<script lang="ts">
	import type { InputProps } from './index.js';

	let { value = $bindable(undefined), ...restProps }: InputProps = $props();
</script>

<input
	bind:value
	type="text"
	inputmode="numeric"
	data-input-counter
	class="block h-10 w-full border-y border-gold-4 bg-hextech py-2.5 text-center text-sm font-semibold text-gold-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
	{...restProps}
	required
/>
