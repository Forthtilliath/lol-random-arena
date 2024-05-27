import Root from './input-with-label.svelte';

type Props = {
  legend: string;
};

export {
	Root,
	type Props,
	//
	Root as Input,
	type Props as InputProps,
	//
	Root as InputWithLabel,
	type Props as InputWithLabelProps
};
