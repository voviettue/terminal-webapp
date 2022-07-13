<template>
	<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<img class="mx-auto h-12 w-auto" src="/img/logo.png" alt="Workflow" />
			<h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Front Office
			</h1>
		</div>

		<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
				<h2 class="text-xl mb-6 font-medium text-gray-600">
					Sign in to your account
				</h2>
				<FormKit
					v-model="values"
					type="form"
					method="POST"
					submit-label="Sign in"
					:incomplete-message="false"
					:actions="false"
					@submit="submit()"
				>
					<div class="space-y-6">
						<FormKit
							type="text"
							name="email"
							label="Your email"
							validation="required"
						/>

						<FormKit
							type="password"
							name="password"
							label="Password"
							validation="required"
						/>

						<FormKit type="submit" label="Sign in" input-class="w-full" />

						<div>
							<NuxtLink
								to="/reset-password"
								class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
							>
								Forgot your password?
							</NuxtLink>
						</div>

						<div v-if="error" class="alert-error">{{ error }}</div>
					</div>
				</FormKit>
			</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	layout: 'auth',
	title: 'Sign in',
})

const values = ref({
	email: '',
	password: '',
})

const error = ref(null)

async function submit() {
	const directus = useDirectus()
	try {
		error.value = null
		await directus.auth.login({
			email: values.value?.email,
			password: values.value?.password,
		})
		navigateTo('dashboard')
	} catch (err) {
		error.value = err?.errors?.[0]?.message
	}
}
</script>
