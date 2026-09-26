<script lang="ts">
	interface Props {
		player: PlayerWithChampion;
	}

	let { player }: Props = $props();
</script>

<!-- Le fond gris sert d'emplacement pendant le chargement du portrait, sans JS. -->
<figure class="group relative aspect-square overflow-hidden border border-gold-4 bg-grey-4">
	<img
		src={`/champion/${player.champion.slug}.png`}
		alt={player.champion.name}
		loading="lazy"
		class="size-full object-cover transition-transform duration-500 group-hover:scale-110"
	/>
	<figcaption
		class="absolute inset-x-0 bottom-0 bg-linear-to-t from-hextech via-hextech/85 to-transparent px-1.5 pt-8 pb-1.5 text-center"
	>
		<p class="truncate text-xs text-grey-1">{player.name}</p>
		<p class="truncate font-display text-xs font-semibold text-gold-1 sm:text-sm">
			{player.champion.name}
		</p>
	</figcaption>
</figure>
