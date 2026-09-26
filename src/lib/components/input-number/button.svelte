<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { buttonVariants, type ButtonProps } from './index.js';

	let { variant, disabled = false, ...restProps }: ButtonProps = $props();
</script>

{#if variant === 'minus'}
	<button
		type="button"
		id="decrement-button"
		data-input-counter-decrement="quantity-input"
		aria-label="Decrease value"
		class={cn(buttonVariants({ variant, disabled }))}
		{disabled}
		{...restProps}
	>
		<svg
			class="w-3 h-3 text-gray-900 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 18 2"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M1 1h16"
			/>
		</svg>
	</button>
{:else if variant === 'plus'}
	<button
		type="button"
		id="increment-button"
		data-input-counter-increment="quantity-input"
		aria-label="Increase value"
		class={cn(buttonVariants({ variant, disabled }))}
		{disabled}
		{...restProps}
	>
		<svg
			class="w-3 h-3 text-gray-900 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 18 18"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 1v16M1 9h16"
			/>
		</svg>
	</button>
{/if}
