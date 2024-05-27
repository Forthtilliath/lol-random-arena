import Root from './input-number.svelte';
import { type VariantProps, tv } from 'tailwind-variants';

export const buttonVariants = tv({
	base: 'bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300  p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:outline-none',
	variants: {
		variant: {
			minus: 'rounded-s-lg',
			plus: 'rounded-e-lg'
		},
		disabled: {
			true: 'pointer-events-none opacity-50',
			false: 'cursor-pointer'
		}
	}
});

export type Variant = VariantProps<typeof buttonVariants>['variant'];

type Props = {
	variant: Variant;
	disabled?: boolean;
};

export type ButtonEventHandler<T extends Event = Event> = T & {
	currentTarget: EventTarget & HTMLButtonElement;
};
type Events = {
	click: ButtonEventHandler<MouseEvent>;
};

export {
	Root,
	type Props,
	type Events,
	//
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents
};
