<template>
	<div>
		<FormKit
			v-model="values"
			type="form"
			method="POST"
			submit-label="Update"
			:incomplete-message="false"
			autocomplete="off"
			@submit="reset()"
		>
			<div v-if="!isValidToken" class="alert-error">
				Invalid token to reset password
			</div>
			<div v-if="isValidToken" class="">
				<FormKit
					v-if="isValidToken"
					type="text"
					name="email"
					label="Email"
					validation="required"
					disabled
				/>
				<FormKit
					type="password"
					name="password"
					label="Password"
					validation="required"
					autocomplete="off"
				/>
			</div>
		</FormKit>

		<div v-if="error" class="alert-error">{{ error }}</div>
		<div v-if="isSuccess" class="alert-success">
			Password successfully reset.
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	token: string
}>()

const { jwtPayload } = useUtils()

const values = ref({
	email: '',
	password: '',
})
const isValidToken = ref(true)
const isSuccess = ref(false)
const error = ref(null)

try {
	values.value.email = jwtPayload(props.token)?.email
} catch (err) {
	isValidToken.value = false
}

async function reset() {
	const directus = useDirectus()
	isSuccess.value = false
	error.value = null

	try {
		await directus.auth.password.reset(props.token, values.value.password)
		isSuccess.value = true
	} catch (err) {
		error.value = err?.errors?.[0]?.message
	}
}
</script>
