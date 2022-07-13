<template>
	<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<img class="mx-auto h-12 w-auto" src="/img/logo.png" alt="Workflow" />
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Front Office
			</h2>
		</div>

		<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
				<h2 class="text-xl font-medium text-gray-600">Reset Password</h2>
				<template v-if="token">
					<AuthFormResetPassword :token="token" />
				</template>
				<template v-else>
					<AuthFormRequestPassword />
				</template>

				<div class="text-sm">
					<NuxtLink
						to="/sign-in"
						class="font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
					>
						<span>Back to sign in</span>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	layout: 'auth',
	title: 'Reset password',
})

const route = useRoute()
const token = route.query.token
</script>
