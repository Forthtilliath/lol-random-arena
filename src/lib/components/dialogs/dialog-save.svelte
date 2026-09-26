<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	import UploadIcon from '@lucide/svelte/icons/upload';
	import Input from '../ui/input/input.svelte';
	import { cn } from '$lib/utils';
	import { getCtx } from '$lib/contexts/form-context';
	import { readSaves, writeSave } from '$lib/helpers/saves';
	import type { FormSchemaType } from '../../../routes/schema';

	const { getFormData } = getCtx();

	let open = $state(false);
	let value = $state('');
	let saveNames: string[] = $state([]);
	let name = $derived(value.trim());
	let savenameExists = $derived(saveNames.includes(name));

	// Re-read the saves each time the dialog opens, to see the ones made earlier in the session.
	function onOpenChange(isOpen: boolean) {
		if (isOpen) saveNames = Object.keys(readSaves());
	}

	function onSubmit() {
		if (!name) return;
		writeSave(name, getFormData() as FormSchemaType);
		value = '';
		open = false;
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
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
				<Button type="submit" disabled={!name}>Save</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
