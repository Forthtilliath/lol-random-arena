<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	import { Check, Save, ChevronsUpDown, Upload } from 'lucide-svelte';
	import { LS_KEY } from '$lib/constants';
	import Input from '../ui/input/input.svelte';
	import { writable } from 'svelte/store';

	let saveNames: string[] = ['abc'];
	onMount(() => {
		if (localStorage.getItem(LS_KEY)) {
			saveNames = Object.keys(JSON.parse(localStorage.getItem(LS_KEY)!));
		}
	});

	function onSubmit(e: SubmitEvent & { currentTarget: HTMLFormElement }) {
		const data = Object.fromEntries(new FormData(e.currentTarget));
		console.log('form submitted', data);
	}

  function checkIfSavenameExists(name: string) {
    return saveNames.includes(name);
  }

  let savenameExists = false;
  let value = writable('');

  $: savenameExists = checkIfSavenameExists($value);
  $: console.log($value, savenameExists)

	// https://www.shadcn-svelte.com/docs/components/tooltip
</script>

<Dialog.Root preventScroll={false}>
	<Dialog.Trigger class={buttonVariants()}>
		<Upload />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Load players settings save</Dialog.Title>
			<Dialog.Description>Choose a name for you save.</Dialog.Description>
		</Dialog.Header>

		<form method="post" on:submit|preventDefault={onSubmit} class="mx-auto space-y-4 w-72">
			<Input type="text" placeholder="Save name" bind:value={$value} class="w-full" />

			<Dialog.Footer>
				<Button type="submit">Save</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
