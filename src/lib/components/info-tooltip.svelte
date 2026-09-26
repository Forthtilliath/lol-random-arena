<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import InfoIcon from '@lucide/svelte/icons/info';

	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

<Tooltip.Root>
	<Tooltip.Trigger
		type="button"
		aria-label="More info"
		class="text-muted-foreground hover:text-foreground inline-flex"
	>
		<InfoIcon class="size-3.5" />
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p class="max-w-64 text-pretty">{text}</p>
	</Tooltip.Content>
</Tooltip.Root>
