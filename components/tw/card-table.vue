<template lang="pug">
div(class='bg-white shadow overflow-hidden sm:rounded-lg')
	div(class='p-4 sm:px-6 lg:px-8')
		div(class='sm:flex sm:items-center')
			div(class='sm:flex-auto')
				h1.text-xl.font-semibold.text-gray-900 Users
				p.mt-2.text-sm.text-gray-700
					| A list of all the users in your account including their name, title, email and role.
			div(class='mt-4 sm:mt-0 sm:ml-16 sm:flex-none')
				button(type='button' class=' inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto') Add user
		.mt-8.flex.flex-col
			div(class='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8')
				div(class=' inline-block min-w-full py-2 align-middle md:px-6 lg:px-8')
					table.min-w-full.divide-y.divide-gray-300
						thead
							tr
								th(scope='col' class='pl-4 pr-3 text-left text-sm font-semibold text-gray-900 py-3.5 sm:pl-6 md:pl-0') Name
								th(scope='col' class='px-3 text-left text-sm font-semibold text-gray-900 py-3.5') Title
								th(scope='col' class='px-3 text-left text-sm font-semibold text-gray-900 py-3.5') Email
								th(scope='col' class='px-3 text-left text-sm font-semibold text-gray-900 py-3.5') Role
								th(scope='col' class='relative pl-3 pr-4 py-3.5 sm:pr-6 md:pr-0')
									span.sr-only Edit
						tbody.divide-y.divide-gray-200
							tr(v-for='person in people' :key='person.email')
								td(class='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0') {{ person.name }}
								td.whitespace-nowrap.py-4.px-3.text-sm.text-gray-500 {{ person.title }}
								td.whitespace-nowrap.py-4.px-3.text-sm.text-gray-500 {{ person.email }}
								td.whitespace-nowrap.py-4.px-3.text-sm.text-gray-500 {{ person.role }}
								td(class='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0')
									a(href='#' class='text-indigo-600 hover:text-indigo-900')
										| Edit
										span.sr-only , {{ person.name }}
</template>

<script setup>
const people = [
	{
		name: 'Lindsay Walton',
		title: 'Front-end Developer',
		email: 'lindsay.walton@example.com',
		role: 'Member',
	},
	// More people...
]
</script>
