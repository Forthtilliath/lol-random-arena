<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	interface Props {
		/** Numéro d'étape affiché dans le losange doré. */
		step?: number;
		title: string;
		description?: string;
		/** Actions affichées à droite du titre (ex. sauvegarder / charger). */
		actions?: Snippet;
		class?: string;
		children: Snippet;
	}

	let { step, title, description, actions, class: className, children }: Props = $props();
</script>

<section class={cn('hex-panel p-4 sm:p-6', className)}>
	<header class="mb-4 flex flex-wrap items-center justify-between gap-3">
		<div class="flex items-center gap-3">
			{#if step !== undefined}
				<span
					aria-hidden="true"
					class="grid size-8 shrink-0 rotate-45 place-items-center border border-gold-3 bg-hextech"
				>
					<span class="-rotate-45 font-display text-sm font-bold text-gold-2">{step}</span>
				</span>
			{/if}
			<div>
				<h2 class="text-lg font-semibold tracking-wider text-gold-1 uppercase">{title}</h2>
				{#if description}
					<p class="text-sm text-grey-1">{description}</p>
				{/if}
			</div>
		</div>
		{#if actions}
			<div class="flex gap-2">{@render actions()}</div>
		{/if}
	</header>

	{@render children()}
</section>
