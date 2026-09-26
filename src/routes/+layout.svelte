<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import * as Tooltip from '$lib/components/ui/tooltip';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	// TODO Add loader
</script>

<svelte:head>
	<title>LoL Random Arena</title>
	<meta
		name="description"
		content="Random Team & Champion Generator for League of Legends Arena Matches"
	/>
</svelte:head>

<Toaster />
<Tooltip.Provider>
	<section class="min-h-[100dvh] flex flex-col justify-between">
		<main>
			{@render children?.()}
		</main>
		<Footer />
	</section>
</Tooltip.Provider>
