/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		// TypeScript itself catches undefined references (including Svelte's `generics` type params);
		// the base rule produces false positives on those.
		'no-undef': 'off'
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			},
			rules: {
				// `$$Props`/`$$Events`/`$$Slots` are Svelte 4 ambient type aliases used only by the
				// compiler for type inference; they're never referenced as values, so the rule
				// flags them as unused even though removing them changes the component's public API.
				'@typescript-eslint/no-unused-vars': [
					'error',
					{ varsIgnorePattern: '^\\$\\$(Props|Events|Slots)$' }
				]
			}
		}
	]
};
