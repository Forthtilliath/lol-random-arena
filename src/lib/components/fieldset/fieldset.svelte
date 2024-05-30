<script lang="ts">
	export let legend: string;
	export let hideable: boolean = false;
	export let visible: boolean = true;

	function toggle() {
		visible = !visible;
	}
</script>

<fieldset>
	<legend>
		{#if hideable}
			<button on:click={toggle}>{legend}</button>
		{:else}
			{legend}
		{/if}
	</legend>

	{#if visible}
		<slot />
	{/if}
</fieldset>

<style lang="scss">
	fieldset {
		--color: #0071F0;
		border: 2px solid var(--color);
		border-radius: 5px;
		margin-bottom: 20px;
		padding: 10px 20px;

		legend {
			background-color: var(--color);
			color: white;
			padding: 5px 10px;
			border-radius: 5px;
			font-weight: bold;
		}
	}
</style>
