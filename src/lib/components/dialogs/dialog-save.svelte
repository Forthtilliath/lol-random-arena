<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	import { Upload } from 'lucide-svelte';
	import { LS_KEY } from '$lib/constants';
	import Input from '../ui/input/input.svelte';
	import { writable } from 'svelte/store';
	import { cn } from '$lib/utils';
	import { getCtx } from '$lib/contexts/form-context';

	const { getFormData } = getCtx();

	let previousSaves: Record<string, unknown> = {};
	onMount(() => {
		if (localStorage.getItem(LS_KEY)) {
			previousSaves = JSON.parse(localStorage.getItem(LS_KEY)!);
		}
	});

	function onSubmit() {
		const formData = getFormData();
		const newSave = { ...previousSaves, [$value]: formData };
		localStorage.setItem(LS_KEY, JSON.stringify(newSave));
		$value = '';
		$open = false;
	}

	function checkIfSavenameExists(name: string) {
		return Object.keys(previousSaves).includes(name);
	}

	let open = writable(false);
	let value = writable('');

	let savenameExists = false;
	$: savenameExists = checkIfSavenameExists($value);

	function onOpenChange(v: boolean) {
		$open = v;
	}
</script>

<Dialog.Root open={$open} {onOpenChange} preventScroll={false}>
	<Dialog.Trigger class={cn(buttonVariants(), 'flex gap-2')}>
		Save <Upload />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Save players settings</Dialog.Title>
			<Dialog.Description>Choose a name for you save.</Dialog.Description>
		</Dialog.Header>

		<form method="post" on:submit|preventDefault={onSubmit} class="mx-auto space-y-4 w-72">
			<div>
				<Input
					type="text"
					placeholder="Save name"
					bind:value={$value}
					class={cn('w-full', {
						'border-red-500': savenameExists,
						'border-green-500': !savenameExists && $value
					})}
				/>
				{#if savenameExists}
					<p class="text-red-500 text-sm">Save name already exists</p>
				{/if}
			</div>

			<Dialog.Footer>
				<Button type="submit">Save</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
