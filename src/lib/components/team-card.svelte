<script lang="ts">
	import { fly } from 'svelte/transition';
	import CardChampion from './card-champion.svelte';

	interface Props {
		name: string;
		team: PlayerWithChampion[];
		/** Position de l'équipe, pour décaler l'animation d'apparition. */
		index: number;
	}

	let { name, team, index }: Props = $props();
</script>

<article in:fly={{ y: 24, duration: 400, delay: index * 80 }} class="hex-panel p-3 [--cut:10px]">
	<h3
		class="mb-3 truncate text-center text-sm font-semibold tracking-[0.12em] text-gold-2 uppercase sm:tracking-[0.18em]"
	>
		<!-- Préfixe masqué sur mobile pour tenir sur une ligne, mais toujours lu par les lecteurs d'écran. -->
		<span class="max-sm:sr-only">Équipe</span>
		{name}
	</h3>
	<div class="grid gap-2" style="grid-template-columns: repeat({team.length}, minmax(0, 1fr));">
		<!-- Clé par position : deux joueurs peuvent porter le même pseudo. -->
		{#each team as player, i (i)}
			<CardChampion {player} />
		{/each}
	</div>
</article>
