<script>
	import Footer from '$lib/components/footer.svelte';
	import '../app.css';
	import { Toaster } from 'svelte-sonner';

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
<section class="min-h-[100dvh] flex flex-col justify-between">
	<main>
		<slot />
	</main>
	<Footer />
</section>
