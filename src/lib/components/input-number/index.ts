import type { HTMLInputAttributes } from 'svelte/elements';
import Root from './input-number.svelte';
import { type VariantProps, tv } from 'tailwind-variants';
import type { ControlSlotProps } from 'formsnap';

export const buttonVariants = tv({
	base: 'h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-foreground/10',
	// base: 'bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:outline-none',
	variants: {
		variant: {
			minus: 'rounded-s-md',
			plus: 'rounded-e-md'
		},
		disabled: {
			true: 'pointer-events-none opacity-50',
			false: 'cursor-pointer'
		}
	}
});

export type Variant = VariantProps<typeof buttonVariants>['variant'];

type ButtonProps = {
	variant: Variant;
	disabled?: boolean;
};
type InputProps = Omit<HTMLInputAttributes, 'value'> &
	Partial<ControlSlotProps['attrs']> & {
		value?: number;
		min?: number;
		max?: number;
	};

export type ButtonEventHandler<T extends Event = Event> = T & {
	currentTarget: EventTarget & HTMLButtonElement;
};
export type ButtonEvents = {
	click: ButtonEventHandler<MouseEvent>;
};

export type FormInputEvent<T extends Event = Event> = T & {
	currentTarget: EventTarget & HTMLInputElement;
};
export type InputEvents = {
	keydown: FormInputEvent<KeyboardEvent>;
	input: FormInputEvent<InputEvent>;
	wheel: FormInputEvent<WheelEvent>;
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
