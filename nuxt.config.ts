import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@formkit/nuxt', '@nuxtjs/proxy', 'nuxt-icons'],
	proxy: {
		'/api': {
			target: 'http://localhost:8055',
			changeOrigin: true,
			pathRewrite: {
				'^/api': '/'
			}
		}
	},
})
