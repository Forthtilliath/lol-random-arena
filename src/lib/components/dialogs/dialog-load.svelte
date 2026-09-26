<script lang="ts">
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import CheckIcon from '@lucide/svelte/icons/check';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';

	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';

	import { formSchema, type FormSchemaType } from '../../../routes/schema';
	import { LS_KEY } from '$lib/constants';
	import { cn } from '$lib/utils';

	interface Props {
		formData: Writable<FormSchemaType>;
	}

	let { formData }: Props = $props();
	let saves: Record<string, FormSchemaType> = $state({});
	let selectedSave = $state('');
	let open = $state(false);
	let openSelect = $state(false);

	onMount(() => {
		if (localStorage.getItem(LS_KEY)) {
			saves = JSON.parse(localStorage.getItem(LS_KEY)!);
		}
	});

	function onSubmit() {
		const save = Object.entries(saves).find(([name]) => name === selectedSave)?.[1];
		if (!save) {
			// TODO: Error message
			return;
		}
		if (!formSchema.safeParse(save).success) {
			// TODO: Error message
			return;
		}

		$formData = save;
		selectedSave = '';
		open = false;
	}
</script>

<Dialog.Root bind:open>
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
							{#each Object.keys(saves) as name (name)}
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
				<Button type="submit">Load</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
