const defaultRules = {
	// No console statements in production
	'no-console': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
	// No debugger statements in production
	'no-debugger': process.env.NODE_ENV !== 'development' ? 'error' : 'off',

	'@typescript-eslint/no-explicit-any': 'off',
	'vue/multi-word-component-names': 'off',
}

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:vue/essential',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'@nuxtjs/eslint-config-typescript',
		'eslint-config-prettier',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint', 'eslint-plugin-prettier'],
	rules: defaultRules,
}
