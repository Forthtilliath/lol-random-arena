<script lang="ts">
	import Logo from '$lib/assets/logo.svelte';
	import Logo2 from '$lib/assets/logo.jpg';
</script>

<footer class="container px-5 py-5 mx-auto flex items-center md:flex-row flex-col justify-center">
	<a
		class="flex title-font font-medium items-center md:justify-start justify-center text-slate-200"
		href="/"
	>
		
    <!-- <Logo class="w-12 h-12 sm:w-20 sm:h-20" /> -->
    <img src={Logo2} class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg" alt="Logo" />

		<span class="ml-3 text-xl">LOL Nuclear Random Arena</span>
	</a>
	<p
		class="text-sm text-slate-500 md:ml-4 md:pl-4 md:border-l-2 md:border-gray-200 md:py-2 md:mt-0 mt-4"
	>
		© 2024 LOL Nuclear Random Arena —
		<a
			href="https://github.com/Forthtilliath"
			class="text-gray-600 ml-1"
			rel="noopener noreferrer"
			target="_blank">@forth</a
		>
	</p>
</footer>
