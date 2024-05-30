import { getContext, setContext } from 'svelte';

type Context = {
	getFormData: () => Record<string, unknown>;
};

function getFormData() {
	const NAME = 'form';

	return {
		NAME
	};
}

export function getCtx(): Context {
	const { NAME } = getFormData();
	return getContext<Context>(NAME);
}

export function setCtx(formData: Context['getFormData']) {
	const { NAME } = getFormData();
	const form = getCtx();
	setContext(NAME, { getFormData: formData });
	return form;
}
