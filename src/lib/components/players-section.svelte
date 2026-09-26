<script lang="ts">
	import { untrack } from 'svelte';
	import type { SuperForm } from 'sveltekit-superforms/client';
	import SectionPanel from './section-panel.svelte';
	import SegmentedControl from './segmented-control.svelte';
	import SwitchRow from './switch-row.svelte';
	import { FieldPlayerName } from './form-fields';
	import DialogSave from './dialogs/dialog-save.svelte';
	import DialogLoad from './dialogs/dialog-load.svelte';
	import { FORM_PLAYER_KEYS, TEAM_SETUP_KEYS, TEAM_SETUPS } from '$lib/data';
	import { chunk } from '$lib/helpers/array';
	import { cn } from '$lib/utils';
	import type { FormSchemaType } from '../../routes/schema';

	interface Props {
		form: SuperForm<FormSchemaType>;
	}

	let { form }: Props = $props();

	const formData = untrack(() => form.form);

	const setupOptions = TEAM_SETUP_KEYS.map((key) => ({
		value: key,
		label: TEAM_SETUPS[key].label,
		hint: TEAM_SETUPS[key].hint
	}));

	const activeSetup = $derived(TEAM_SETUPS[$formData.setup]);
	const groups = $derived(
		chunk([...FORM_PLAYER_KEYS.slice(0, activeSetup.playerCount)], activeSetup.teamSize)
	);
</script>

<SectionPanel step={1} title="Joueurs" description="Le format et les pseudos du lobby.">
	{#snippet actions()}
		<DialogLoad {formData} />
		<DialogSave />
	{/snippet}

	<div class="space-y-4">
		<SegmentedControl
			name="setup"
			label="Format de la partie"
			options={setupOptions}
			bind:value={$formData.setup}
		/>

		<SwitchRow
			{form}
			field="random_team"
			label="Équipes aléatoires"
			description="Désactivé : le joueur 1 fait équipe avec le 2, le 3 avec le 4, etc."
		/>

		<div
			class={cn(
				'grid grid-cols-2 gap-2 sm:gap-3',
				activeSetup.teamSize === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'
			)}
		>
			{#each groups as group, i (group[0])}
				<fieldset class="space-y-2 border border-gold-5 bg-blue-6/60 p-2 sm:p-3">
					<legend class="sr-only">{activeSetup.groupLabel} {i + 1}</legend>
					<p
						aria-hidden="true"
						class="font-display text-xs font-semibold tracking-[0.2em] text-gold-3 uppercase"
					>
						{activeSetup.groupLabel}
						{i + 1}
					</p>
					{#each group as field (field)}
						<FieldPlayerName {form} {field} label={`Joueur ${field.replace('player_', '')}`} />
					{/each}
				</fieldset>
			{/each}
		</div>
	</div>
</SectionPanel>
