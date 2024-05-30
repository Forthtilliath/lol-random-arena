<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Tooltip from '$lib/components/ui/tooltip';

	import { Upload } from 'lucide-svelte';
	import { LS_KEY } from '$lib/constants';
	import Input from '../ui/input/input.svelte';
	import { writable } from 'svelte/store';
	import { cn } from '$lib/utils';
	import { getCtx } from '$lib/contexts/form-context';

	const { getFormData } = getCtx();

	let previousSettings: Record<string, unknown> = {};
	onMount(() => {
		if (localStorage.getItem(LS_KEY)) {
			previousSettings = JSON.parse(localStorage.getItem(LS_KEY)!);
		}
	});

	function onSubmit() {
		const formData = getFormData();
		const newSave = { ...previousSettings, [$value]: formData };
		localStorage.setItem(LS_KEY, JSON.stringify(newSave));
		$value = '';
		$open = false;
	}

	function checkIfSavenameExists(name: string) {
		return Object.keys(previousSettings).includes(name);
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
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Dialog.Trigger class={buttonVariants()}>
				<Upload />
			</Dialog.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Save</p>
		</Tooltip.Content>
	</Tooltip.Root>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Load players settings save</Dialog.Title>
			<Dialog.Description>Choose a name for you save.</Dialog.Description>
		</Dialog.Header>

		<form method="post" on:submit|preventDefault={onSubmit} class="mx-auto space-y-4 w-72">
			<Input
				type="text"
				placeholder="Save name"
				bind:value={$value}
				class={cn('w-full', {
					'border-red-500': savenameExists,
					'border-green-500': !savenameExists && $value
				})}
			/>

			<Dialog.Footer>
				<Button type="submit">Save</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
