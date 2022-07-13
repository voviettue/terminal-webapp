<template>
	<div>
		<FormKit
			v-model="values"
			type="form"
			method="POST"
			submit-label="Reset"
			:incomplete-message="false"
			@submit="request()"
		>
			<div class="space-y-6">
				<FormKit type="text" name="email" label="Email" validation="required" />
			</div>
		</FormKit>

		<div v-if="error" class="alert-error">{{ error }}</div>
		<div v-if="isSuccess" class="alert-success">
			If you have an account, we've sent you a secure link to reset your
			password
		</div>
	</div>
</template>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()

const values = ref({
	email: '',
})
const isSuccess = ref(false)
const error = ref(null)

async function request() {
	const directus = useDirectus()
	error.value = null
	isSuccess.value = false

	try {
		const url = `${config.public.url}${route.path}`
		await directus.auth.password.request(values.value?.email, url)
		isSuccess.value = true
	} catch (err) {
		error.value = err?.errors?.[0]?.message
	}
}
</script>
