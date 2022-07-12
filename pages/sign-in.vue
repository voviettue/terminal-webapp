<template>
	<div
		class="min-h-full flex items-center justify-center py-12 sm:px-6 lg:px-8"
	>
		<div class="max-w-md w-full space-y-8">
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				STORE FRONT
			</h2>
			<div class="mt-8 space-y-6">
				<FormKit
					v-model="values"
					type="form"
					method="POST"
					submit-label="Sign in"
					:actions="false"
					@submit="submit()"
				>
					<input type="hidden" name="remember" value="true" />
					<div class="rounded-md shadow-sm -space-y-px">
						<div>
							<FormKit
								type="text"
								name="email"
								label="Your email"
								validation="required"
							></FormKit>
						</div>
						<div>
							<FormKit
								type="password"
								name="password"
								label="Password"
								validation="required"
							></FormKit>
						</div>
					</div>
					<div>
						<FormKit
							type="submit"
							label="Sign in"
							input-class="w-full"
						></FormKit>
					</div>
					<div class="flex justify-center">
						<div class="text-sm">
							<a
								class="font-medium text-indigo-600 hover:text-indigo-500"
								href="#"
							>
								Forgot your password?
							</a>
						</div>
					</div>
				</FormKit>
			</div>
			<div v-if="error" class="alert-error">{{ error }}</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	layout: 'auth',
	title: 'Sign in page',
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
