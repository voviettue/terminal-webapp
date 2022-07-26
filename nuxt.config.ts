import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	ssr: false,
	modules: ['@nuxtjs/tailwindcss', '@formkit/nuxt', 'nuxt-icons'],
	buildModules: ['@pinia/nuxt'],
	components: {
		dirs: [
			"~/components",
			"~/components/display",
		],
	},
	runtimeConfig: {
		public: {
			url: 'http://localhost:3000',
			terminal: {
				adminUrl: 'https://stag.hipgnosis.catex.se/admin'
			},
			api: {
				baseUrl: 'http://localhost:8055',
			}
		}
	}
})
