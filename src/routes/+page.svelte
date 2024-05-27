<script lang="ts">
	import InputNumber from '$lib/components/input-number/input-number.svelte';
	import { type Champion, getChampions } from '$lib/methods/getChampions';
	import { onMount } from 'svelte';
	
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";

	export let data;

	let champions: Champion[] = [];

	/**
	 * Put player names (input with + to add one more)
	 * Save in local storage
	 * Ban most X popular champions
	 * Choose rank
	 * Number of choice par player
	 */

	onMount(async () => {
		champions = await getChampions(data.html);
	});

	$: console.log(champions);
</script>

<h1>Welcome to LOL Nuclear Random Arena !</h1>

<form class="max-w-xs mx-auto">
	<InputNumber value={1} />

	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="email-2">Email</Label>
		<Input type="email" id="email-2" placeholder="Email" />
		<p class="text-sm text-muted-foreground">Enter your email address.</p>
	</div>
</form>
