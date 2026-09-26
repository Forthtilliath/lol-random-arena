<script lang="ts">
	import type { InputProps } from './index.js';

	let { value = $bindable(undefined), ...restProps }: InputProps = $props();
</script>

<input
	bind:value
	type="text"
	data-input-counter
	aria-describedby="helper-text-explanation"
	class="bg-background border-y border-input h-10 text-center text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 block w-full py-2.5"
	placeholder="999"
	{...restProps}
	required
/>
