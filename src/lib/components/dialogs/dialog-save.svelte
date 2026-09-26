<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	import UploadIcon from '@lucide/svelte/icons/upload';
	import { LS_KEY } from '$lib/constants';
	import Input from '../ui/input/input.svelte';
	import { cn } from '$lib/utils';
	import { getCtx } from '$lib/contexts/form-context';

	const { getFormData } = getCtx();

	let previousSaves: Record<string, unknown> = {};
	onMount(() => {
		if (localStorage.getItem(LS_KEY)) {
			previousSaves = JSON.parse(localStorage.getItem(LS_KEY)!);
		}
	});

	let open = $state(false);
	let value = $state('');
	let savenameExists = $derived(Object.keys(previousSaves).includes(value));

	function onSubmit() {
		const formData = getFormData();
		const newSave = { ...previousSaves, [value]: formData };
		localStorage.setItem(LS_KEY, JSON.stringify(newSave));
		value = '';
		open = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={cn(buttonVariants(), 'flex gap-2')}>
		Save <UploadIcon />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Save players settings</Dialog.Title>
			<Dialog.Description>Choose a name for you save.</Dialog.Description>
		</Dialog.Header>

		<form
			method="post"
			onsubmit={(e) => {
				e.preventDefault();
				onSubmit();
			}}
			class="mx-auto space-y-4 w-72"
		>
			<div>
				<Input
					type="text"
					placeholder="Save name"
					bind:value
					class={cn('w-full', {
						'border-red-500': savenameExists,
						'border-green-500': !savenameExists && value
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
