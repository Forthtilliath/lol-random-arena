<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { toast } from 'svelte-sonner';
	import CheckIcon from '@lucide/svelte/icons/check';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';

	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';

	import type { FormSchemaType } from '../../../routes/schema';
	import { loadSave, readSaves } from '$lib/helpers/saves';
	import { cn } from '$lib/utils';

	interface Props {
		formData: Writable<FormSchemaType>;
	}

	let { formData }: Props = $props();
	let saveNames: string[] = $state([]);
	let selectedSave = $state('');
	let open = $state(false);
	let openSelect = $state(false);

	// Re-read the saves each time the dialog opens, to list the ones made earlier in the session.
	function onOpenChange(isOpen: boolean) {
		if (isOpen) saveNames = Object.keys(readSaves());
	}

	function onSubmit() {
		if (!selectedSave) return;

		const save = loadSave(selectedSave);
		if (!save) {
			toast.error(`The save "${selectedSave}" is corrupted and can't be loaded.`);
			return;
		}

		$formData = save;
		selectedSave = '';
		open = false;
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Trigger class={cn(buttonVariants(), 'flex gap-2')}>
		Load <DownloadIcon />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Load players settings</Dialog.Title>
			<Dialog.Description>Select a save file to load.</Dialog.Description>
		</Dialog.Header>

		<form
			method="post"
			onsubmit={(e) => {
				e.preventDefault();
				onSubmit();
			}}
			class="mx-auto space-y-4 w-72"
		>
			<Popover.Root bind:open={openSelect}>
				<Popover.Trigger
					role="combobox"
					class={cn(buttonVariants({ variant: 'outline' }), 'w-[200px] justify-between', {
						'text-muted-foreground': !selectedSave
					})}
				>
					{selectedSave || 'Select a save'}
					<ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
				</Popover.Trigger>
				<Popover.Content class="w-[200px] p-0 -translate-y-3">
					<Command.Root>
						<Command.Input placeholder="Search save..." />
						<Command.Empty>No save found.</Command.Empty>
						<Command.List>
							{#each saveNames as name (name)}
								<Command.Item
									value={name}
									onSelect={() => {
										selectedSave = name;
										openSelect = false;
									}}
								>
									<CheckIcon
										class={cn('mr-2 size-4', name === selectedSave ? 'opacity-100' : 'opacity-0')}
									/>
									{name}
								</Command.Item>
							{/each}
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>

			<Dialog.Footer>
				<Button type="submit" disabled={!selectedSave}>Load</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
