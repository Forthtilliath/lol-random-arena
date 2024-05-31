<script lang="ts">
  import { Skeleton } from "$lib/components/ui/skeleton";
	import type { Champion } from '$lib/data';
	import { onMount } from 'svelte';

	export let player: PlayerWithChampion;

	function getPathImage(champion: Champion) {
		const image =
			champion?.image ??
			champion.name
				.replace(/[éê]/g, 'e')
				.replace(/[î]/g, 'i')
				.replace(/[ '\.]/g, '');

		return `/champion/${image}.png`;
	}

	let src = getPathImage(player.champion);

	let loaded = false;
	onMount(() => {
		const img = new Image();
		img.src = src;
		img.addEventListener('load', () => {
			loaded = true;
		});
	});
</script>

<div class="relative w-full flex-1 mx-auto rounded-lg overflow-hidden">
	{#if loaded}
		<img
			src={getPathImage(player.champion)}
			alt={player.champion.name}
			class="mx-auto w-full aspect-square"
		/>
		<div class="absolute w-full h-full top-0 bg-black/80"></div>
		<div class="absolute w-full h-full top-0 grid place-items-center">
			<p class="text-base font-medium break-all">{player.name}</p>
			<p class="text-base font-semibold break-all">{player.champion.name}</p>
		</div>
	{:else}
    <Skeleton class="mx-auto w-full aspect-square" />
	{/if}
</div>
