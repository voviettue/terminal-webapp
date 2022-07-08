import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@formkit/nuxt', '@nuxtjs/proxy', 'nuxt-icons'],
	runtimeConfig: {
		public: {
			url: 'http://localhost:3000',
			api: {
				baseUrl: 'http://localhost:8055',
			}
		}
	}
})
