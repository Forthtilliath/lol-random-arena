<script>
	import '../app.css';
  import { Toaster } from 'svelte-sonner'

	// TODO Add loader
</script>

<svelte:head>
	<title>LoL Random Arena</title>
	<meta name="description" content="Random Team & Champion Generator for League of Legends Arena Matches">
</svelte:head>

<Toaster />
<slot />
<footer class="mt-4"></footer>
