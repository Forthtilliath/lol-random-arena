<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	import SaveIcon from '@lucide/svelte/icons/save';
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
		toast.success(`Configuration « ${name} » sauvegardée.`);
		value = '';
		open = false;
	}
</script>

<Dialog.Root bind:open {onOpenChange}>
	<!-- type="button" : le déclencheur est placé dans le formulaire du tirage, il ne doit pas le soumettre. -->
	<Dialog.Trigger type="button" class={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
		<SaveIcon /> Sauvegarder
	</Dialog.Trigger>
	<Dialog.Content class="rounded-none border-gold-4 bg-blue-7 sm:max-w-md">
		<Dialog.Header>
			<Dialog.Title class="font-display tracking-wide text-gold-1 uppercase">
				Sauvegarder la configuration
			</Dialog.Title>
			<Dialog.Description>
				Pseudos, format et bannissements, pour les retrouver à la prochaine partie.
			</Dialog.Description>
		</Dialog.Header>

		<form
			method="post"
			onsubmit={(e) => {
				e.preventDefault();
				onSubmit();
			}}
			class="space-y-4"
		>
			<div class="space-y-1.5">
				<Input
					type="text"
					placeholder="Nom de la sauvegarde (ex. Soirée du vendredi)"
					aria-label="Nom de la sauvegarde"
					bind:value
					class="h-10 rounded-none border-grey-3 bg-hextech focus-visible:border-gold-2"
				/>
				{#if savenameExists}
					<p class="text-xs text-gold-3">Ce nom existe déjà : la sauvegarde sera remplacée.</p>
				{/if}
			</div>

			<Dialog.Footer>
				<Button type="submit" variant="hextech" size="lg" disabled={!name}>
					{savenameExists ? 'Remplacer' : 'Sauvegarder'}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
