<template>
	<div
		class="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
	>
		<div class="mx-auto max-w-max">
			<main class="sm:flex">
				<div class="">
					<div class="text-center">
						<h1
							class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-red-500"
						>
							Error
						</h1>
						<p class="mt-1 text-base text-gray-500">
							{{ error.statusMessage }}
						</p>

						<button
							class="mt-5 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							@click="backToHome"
						>
							Go back home
						</button>
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<script lang="ts" setup>
const error = useError()

function backToHome() {
	const { usePageStore } = useStore()
	const pageStore = usePageStore()
	const page = pageStore.homepage
	navigateTo(page ? page.endpoint : '/homepage')
}
</script>
