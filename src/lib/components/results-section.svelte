<script lang="ts">
	import DicesIcon from '@lucide/svelte/icons/dices';
	import LinkIcon from '@lucide/svelte/icons/link';
	import { Button } from '$lib/components/ui/button';
	import { TEAM_NAMES } from '$lib/constants';
	import { cn } from '$lib/utils';
	import TeamCard from './team-card.svelte';

	interface Props {
		teams: PlayerWithChampion[][];
		submitting: boolean;
		onReroll: () => void;
		onShare: () => void;
	}

	let { teams, submitting, onReroll, onShare }: Props = $props();

	const teamSize = $derived(teams[0]?.length ?? 2);
</script>

<section id="results" aria-labelledby="results-title" class="scroll-mt-4">
	<div class="mb-5 flex flex-wrap items-end justify-between gap-3">
		<div>
			<h2
				id="results-title"
				class="gold-text text-2xl font-bold tracking-wide uppercase sm:text-3xl"
			>
				Résultat du tirage
			</h2>
			<p class="text-sm text-grey-1">
				{teams.length} équipes · {teams.flat().length} champions, tous différents
			</p>
		</div>
		<div class="flex flex-wrap gap-2">
			<Button variant="outline" size="lg" onclick={onShare}>
				<LinkIcon /> Copier le lien
			</Button>
			<Button variant="hextech" size="lg" onclick={onReroll} disabled={submitting}>
				<DicesIcon /> Relancer
			</Button>
		</div>
	</div>

	<div
		class={cn(
			'grid gap-3 sm:gap-4',
			teamSize === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'
		)}
	>
		{#each teams as team, i (i)}
			<TeamCard name={TEAM_NAMES[i]} {team} index={i} />
		{/each}
	</div>
</section>
