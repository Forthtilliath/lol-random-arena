<script lang="ts" generics="V extends string">
	import { cn } from '$lib/utils';

	type Option = { value: V; label: string; hint?: string };

	interface Props {
		/** Nom du champ envoyé avec le formulaire. */
		name: string;
		options: Option[];
		value: V;
		label: string;
		class?: string;
	}

	let { name, options, value = $bindable(), label, class: className }: Props = $props();
</script>

<!-- Groupe de boutons radio natifs : accessible au clavier et soumis tel quel avec le formulaire. -->
<div
	role="radiogroup"
	aria-label={label}
	class={cn('grid gap-2', className)}
	style="grid-template-columns: repeat({options.length}, minmax(0, 1fr));"
>
	{#each options as option (option.value)}
		<label class="cursor-pointer">
			<input type="radio" {name} value={option.value} bind:group={value} class="peer sr-only" />
			<span
				class="flex h-full flex-col items-center justify-center gap-0.5 border border-grey-3 bg-hextech/60 px-2 py-2.5 text-center text-grey-1 transition-colors peer-checked:border-gold-2 peer-checked:bg-gold-5/40 peer-checked:text-gold-1 peer-checked:shadow-[inset_0_0_14px_rgba(200,170,110,0.18)] peer-focus-visible:ring-2 peer-focus-visible:ring-ring hover:border-gold-4 hover:text-gold-1"
			>
				<span class="font-display text-sm font-semibold tracking-wider uppercase">
					{option.label}
				</span>
				{#if option.hint}
					<span class="text-xs opacity-80">{option.hint}</span>
				{/if}
			</span>
		</label>
	{/each}
</div>
