/** @type {import('tailwindcss').Config} */
// const formKitTailwind = require('@formkit/themes/tailwindcss');
import formKitTailwind from '@formkit/themes/tailwindcss'

module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './pages/**/*.vue',
    './app.vue',
    './formkit.config.{js,mjs,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [formKitTailwind],
}
