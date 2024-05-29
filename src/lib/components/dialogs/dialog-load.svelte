<script lang="ts" generics="T extends Record<string, unknown>">
	import Label from '../ui/label/label.svelte';

	import { cn } from '$lib/utils';

	import { onMount } from 'svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';

	import { Check, Upload, ChevronsUpDown } from 'lucide-svelte';
	import { LS_KEY } from '$lib/constants';

	let saveNames: string[] = [];
	onMount(() => {
		if (localStorage.getItem(LS_KEY)) {
			saveNames = JSON.parse(localStorage.getItem(LS_KEY)!);
		}
	});

	function onSubmit(e: SubmitEvent & { currentTarget: HTMLFormElement }) {
		const data = Object.fromEntries(new FormData(e.currentTarget));
		console.log('form submitted', data);
	}

	// https://www.shadcn-svelte.com/docs/components/tooltip
</script>

<Dialog.Root preventScroll={false}>
	<Dialog.Trigger class={buttonVariants()}>
		<Upload />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Load players settings save</Dialog.Title>
			<Dialog.Description>Select a save file to load.</Dialog.Description>
		</Dialog.Header>

		<form method="post" on:submit|preventDefault={onSubmit} class="mx-auto space-y-4">
			<!-- <Form.Field name="language" class="flex flex-col"> -->
			<Popover.Root>
					<Label>Language</Label>
					<Popover.Trigger
						role="combobox"
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-[200px] justify-between'
							// !$formData.language && 'text-muted-foreground'
						)}
					>
						Select a save
						<!-- {languages.find((lang) => lang.value === $formData.language)?.label || 'Select a save'} -->
						<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
					</Popover.Trigger>
					<!-- <input hidden value={$formData.language} name={attrs.name} /> -->
				<Popover.Content class="w-[200px] p-0 -translate-y-3">
					<Command.Root>
						<Command.Input placeholder="Search save..." />
						<Command.Empty>No language found.</Command.Empty>
						<Command.List>
							<!-- {#each languages as language}
								<Command.Item
									{...form}
									value={language.label}
									onSelect={() => {
										$formData.language = language.value;
										validate('language');
									}}
								>
									<Check
										class={cn(
											'mr-2 size-4',
											language.value === $formData.language ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{language.label}
								</Command.Item>
							{/each} -->
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
			<!-- </Form.Field> -->

			<Dialog.Footer>
				<Button type="submit">Save</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
