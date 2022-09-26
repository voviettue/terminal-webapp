/** @type {import('tailwindcss').Config} */
// const formKitTailwind = require('@formkit/themes/tailwindcss');
import formKitTailwind from '@formkit/themes/tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
	content: [
		'./components/**/*.{vue,js}',
		'./pages/**/*.vue',
		'./layouts/**/*.vue',
		'./app.vue',
		'./formkit.config.{js,mjs,ts}',
	],
	safelist: [
		{
			pattern: /./,
		},
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Lato', ...defaultTheme.fontFamily.sans],
			},
			borderRadius: {
				DEFAULT: '0.125rem',
			},
			colors: {
				keppel: {
					DEFAULT: '#6DC2B6',
					50: '#EEF8F7',
					100: '#E0F2F0',
					200: '#C3E6E1',
					300: '#A7DAD3',
					400: '#8ACEC4',
					500: '#6DC2B6',
					600: '#49AEA0',
					700: '#38877C',
					800: '#285F57',
					900: '#173733',
				},
				lavender: {
					DEFAULT: '#7457DF',
					50: '#F4F1FC',
					100: '#E5E0F9',
					200: '#C9BEF3',
					300: '#AD9CEC',
					400: '#9079E6',
					500: '#7457DF',
					600: '#4D29D5',
					700: '#3C20A6',
					800: '#2B1777',
					900: '#1A0E48',
				},
				denim: {
					DEFAULT: '#4D5CDE',
					50: '#E8EAFB',
					100: '#D7DAF8',
					200: '#B4BBF1',
					300: '#929BEB',
					400: '#6F7CE4',
					500: '#4D5CDE',
					600: '#2637CD',
					700: '#1D2A9E',
					800: '#141E6E',
					900: '#0C113F',
				},
				'dodger-blue': {
					DEFAULT: '#4D81D6',
					50: '#E2EBF8',
					100: '#D2DFF5',
					200: '#B0C7ED',
					300: '#8FB0E5',
					400: '#6E98DE',
					500: '#4D81D6',
					600: '#2C64BF',
					700: '#214C91',
					800: '#173464',
					900: '#0C1C36',
				},
			},
		},
		// boderRadius: {
		// 	'none': '0',
		// 	'sm': '0.125rem',
		// 	DEFAULT: '0.125rem',
		// 	'md': '0.25rem',
		// 	'lg': '0.5rem',
		// 	'full': '9999px',
		// },
	},
	plugins: [formKitTailwind],
}
