<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { toast } from 'svelte-sonner';
	import FolderOpenIcon from '@lucide/svelte/icons/folder-open';

	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Command from '$lib/components/ui/command';

	import type { FormSchemaType } from '../../../routes/schema';
	import { loadSave, readSaves } from '$lib/helpers/saves';
	import { cn } from '$lib/utils';

	interface Props {
		formData: Writable<FormSchemaType>;
	}

	let { formData }: Props = $props();
	let saveNames: string[] = $state([]);
	let open = $state(false);

	// Re-read the saves each time the dialog opens, to list the ones made earlier in the session.
	function onOpenChange(isOpen: boolean) {
		if (isOpen) saveNames = Object.keys(readSaves());
	}

	function load(name: string) {
		const save = loadSave(name);
		if (!save) {
			toast.error(`La sauvegarde « ${name} » est corrompue et ne peut pas être chargée.`);
			return;
		}

		$formData = save;
		open = false;
		toast.success(`Configuration « ${name} » chargée.`);
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
	<!-- type="button" : le déclencheur est placé dans le formulaire du tirage, il ne doit pas le soumettre. -->
	<Dialog.Trigger type="button" class={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
		<FolderOpenIcon /> Charger
	</Dialog.Trigger>
	<Dialog.Content class="rounded-none border-gold-4 bg-blue-7 sm:max-w-md">
		<Dialog.Header>
			<Dialog.Title class="font-display tracking-wide text-gold-1 uppercase">
				Charger une configuration
			</Dialog.Title>
			<Dialog.Description>Choisis une sauvegarde pour remplir le formulaire.</Dialog.Description>
		</Dialog.Header>

		{#if saveNames.length === 0}
			<p class="border border-dashed border-grey-3 p-6 text-center text-sm text-grey-1">
				Aucune sauvegarde pour l'instant. Utilise « Sauvegarder » pour garder tes pseudos.
			</p>
		{:else}
			<Command.Root class="rounded-none border border-grey-3 bg-hextech">
				<Command.Input placeholder="Rechercher une sauvegarde…" />
				<Command.List>
					<Command.Empty>Aucune sauvegarde ne correspond.</Command.Empty>
					{#each saveNames as name (name)}
						<Command.Item value={name} onSelect={() => load(name)} class="cursor-pointer">
							{name}
						</Command.Item>
					{/each}
				</Command.List>
			</Command.Root>
		{/if}
	</Dialog.Content>
</Dialog.Root>
