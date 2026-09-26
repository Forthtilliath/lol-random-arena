import type { HTMLButtonAttributes, HTMLInputAttributes } from 'svelte/elements';
import Root from './input-number.svelte';
import { type VariantProps, tv } from 'tailwind-variants';
import type { ControlAttrs } from 'formsnap';

export const buttonVariants = tv({
	base: 'h-10 border border-gold-4 bg-grey-4 px-3 py-2 text-sm text-gold-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40 hover:border-gold-2 hover:bg-gold-5/50',
	variants: {
		variant: {
			minus: '',
			plus: ''
		},
		disabled: {
			true: 'pointer-events-none opacity-50',
			false: 'cursor-pointer'
		}
	}
});

export type Variant = VariantProps<typeof buttonVariants>['variant'];

type ButtonProps = Omit<HTMLButtonAttributes, 'disabled'> & {
	variant: Variant;
	disabled?: boolean;
};
type InputProps = Omit<HTMLInputAttributes, 'value'> &
	Partial<ControlAttrs> & {
		value?: number;
		min?: number;
		max?: number;
	};

export {
	Root,
	type ButtonProps,
	type InputProps,
	//
	Root as InputNumber,
	type ButtonProps as InputNumberButtonProps,
	type InputProps as InputNumberInputProps
};
