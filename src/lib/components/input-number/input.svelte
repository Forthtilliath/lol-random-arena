<script lang="ts">
	export let value: number;
</script>

<input
	bind:value
	type="text"
	id="quantity-input"
	data-input-counter
	aria-describedby="helper-text-explanation"
	class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
	placeholder="999"
	required
/>
