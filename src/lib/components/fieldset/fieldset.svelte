<script lang="ts">
	interface Props {
		legend: string;
		hideable?: boolean;
		visible?: boolean;
		children?: import('svelte').Snippet;
	}

	let { legend, hideable = false, visible = $bindable(true), children }: Props = $props();

	function toggle() {
		visible = !visible;
	}
</script>

<fieldset>
	<legend>
		{#if hideable}
			<button onclick={toggle} aria-label="Collapse">{legend}</button>
		{:else}
			{legend}
		{/if}
	</legend>

	{#if visible}
		{@render children?.()}
	{/if}
</fieldset>

<style lang="scss">
	$color: #0071f0;
	$background:
		linear-gradient(#020817, #020817) padding-box,
		linear-gradient(to right, #38bdf8, #bae6fd, #38bdf8) border-box;

	fieldset {
		// border: 2px solid $color;
		// border-image: linear-gradient(#38bdf8, #bae6fd, #38bdf8) 1;
		background: $background;
		border: 2px solid transparent;
		border-radius: 5px;
		margin-bottom: 20px;
		padding: 10px 20px;

		legend {
			// background-color: $color;
			background: $background;
			border: 2px solid transparent;
			color: white;
			border-radius: 5px;
			font-weight: bold;

			&:has(:global(button)) {
				button {
					padding: 5px 10px;
				}
			}
			&:not(:has(button)) {
				padding: 5px 10px;
			}
		}
	}
</style>
