<script lang="ts">
	export let legend: string;
</script>

<fieldset>
	<legend>{legend}</legend>
	<slot />
</fieldset>

<style lang="scss">
	fieldset {
		--color: #007bff;
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
