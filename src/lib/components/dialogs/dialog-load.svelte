<script lang="ts" generics="T extends Record<string, unknown>">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { Check, Download, ChevronsUpDown } from 'lucide-svelte';

	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import * as Tooltip from '$lib/components/ui/tooltip';

	import { formSchema, type FormSchemaType } from '../../../routes/schema';
	import { LS_KEY } from '$lib/constants';
	import { cn } from '$lib/utils';

	export let formData: Writable<FormSchemaType>;
	let saves: Record<string, FormSchemaType> = {};

	onMount(() => {
		if (localStorage.getItem(LS_KEY)) {
			saves = JSON.parse(localStorage.getItem(LS_KEY)!);
		}
	});

	function onSubmit(e: SubmitEvent & { currentTarget: HTMLFormElement }) {
		const save = Object.entries(saves).find(([name]) => name === $selectedSave)?.[1];
		if (!save) {
			// TODO: Error message
			return;
		}
		if (!formSchema.safeParse(save).success) {
			// TODO: Error message
			return;
		}

		$formData = save;
		$selectedSave = '';
		$open = false;
	}

	const selectedSave = writable<string>('');
	let open = writable(false);
	let openSelect = writable(false);

	function onOpenChange(v: boolean) {
		$open = v;
	}
	function onOpenChangeSelect(v: boolean) {
		$openSelect = v;
	}
</script>

<Dialog.Root open={$open} {onOpenChange} preventScroll={false}>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Dialog.Trigger class={buttonVariants()}>
				<Download />
			</Dialog.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Load</p>
		</Tooltip.Content>
	</Tooltip.Root>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Load players settings</Dialog.Title>
			<Dialog.Description>Select a save file to load.</Dialog.Description>
		</Dialog.Header>

		<form method="post" on:submit|preventDefault={onSubmit} class="mx-auto space-y-4 w-72">
			<Popover.Root open={$openSelect} onOpenChange={onOpenChangeSelect}>
				<Popover.Trigger
					role="combobox"
					class={cn(buttonVariants({ variant: 'outline' }), 'w-[200px] justify-between', {
						'text-muted-foreground': !$selectedSave
					})}
				>
					{Object.keys(saves).find((savename) => savename === $selectedSave) || 'Select a save'}
					<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
				</Popover.Trigger>
				<Popover.Content class="w-[200px] p-0 -translate-y-3">
					<Command.Root>
						<Command.Input placeholder="Search save..." />
						<Command.Empty>No save found.</Command.Empty>
						<Command.List>
							{#each Object.keys(saves) as name}
								<Command.Item
									value={name}
									onSelect={() => {
										$selectedSave = name;
										$openSelect = false;
									}}
								>
									<Check
										class={cn('mr-2 size-4', name === $selectedSave ? 'opacity-100' : 'opacity-0')}
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
