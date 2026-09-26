<script lang="ts">
	import type { Snippet } from 'svelte';
	import Footer from '$lib/components/footer.svelte';
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import * as Tooltip from '$lib/components/ui/tooltip';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>LoL Random Arena : équipes et champions aléatoires</title>
	<meta
		name="description"
		content="Générateur d'équipes et de champions aléatoires pour le mode Arena de League of Legends, avec bannissement automatique d'après les statistiques op.gg."
	/>
	<meta name="theme-color" content="#010a13" />
</svelte:head>

<Toaster
	theme="dark"
	position="top-center"
	toastOptions={{
		class: '!rounded-none !border-gold-4 !bg-blue-7 !text-gold-1 !font-sans'
	}}
/>
<Tooltip.Provider>
	<div class="flex min-h-dvh flex-col">
		<main class="flex-1">
			{@render children?.()}
		</main>
		<Footer />
	</div>
</Tooltip.Provider>
