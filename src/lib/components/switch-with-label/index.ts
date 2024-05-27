import Root from './switch-with-label.svelte';

type Props = {
	legend: string;
};

export {
	Root,
	type Props,
	//
	Root as Switch,
	type Props as SwitchProps,
	//
	Root as SwitchWithLabel,
	type Props as SwitchWithLabelProps
};
