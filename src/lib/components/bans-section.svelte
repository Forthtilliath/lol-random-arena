<script lang="ts">
	import { untrack } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { SuperForm } from 'sveltekit-superforms/client';
	import SectionPanel from './section-panel.svelte';
	import SegmentedControl from './segmented-control.svelte';
	import SwitchRow from './switch-row.svelte';
	import { FieldAutoBanCount } from './form-fields';
	import { CRITERIAS, criterias, type Criteria, type FormSchemaType } from '../../routes/schema';

	interface Props {
		form: SuperForm<FormSchemaType>;
	}

	let { form }: Props = $props();

	const formData = untrack(() => form.form);

	const hints: Record<Criteria, string> = {
		popularity: 'Les plus joués',
		winrate: 'Meilleur taux de victoire',
		mixed: 'Les deux à parts égales'
	};
	const criteriaOptions = CRITERIAS.map((value) => ({
		value,
		label: criterias[value],
		hint: hints[value]
	}));
</script>

<SectionPanel
	step={2}
	title="Bannissements"
	description="Retire du tirage les champions les plus forts du moment."
>
	<div class="space-y-4">
		<SwitchRow
			{form}
			field="auto_ban"
			label="Bannissement automatique"
			description="D'après les statistiques Arena actuelles d'op.gg."
		/>

		{#if $formData.auto_ban}
			<div transition:slide={{ duration: 200 }} class="space-y-4">
				<FieldAutoBanCount {form} field="auto_ban_count" />
				<div class="space-y-2">
					<p class="text-sm font-semibold text-gold-1">Critère de classement</p>
					<SegmentedControl
						name="auto_ban_criteria"
						label="Critère de classement des bannissements"
						options={criteriaOptions}
						bind:value={$formData.auto_ban_criteria}
					/>
				</div>
			</div>
		{/if}
	</div>
</SectionPanel>
