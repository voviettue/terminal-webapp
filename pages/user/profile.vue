<template>
	<div class="min-h-full flex flex-col justify-center py-6 sm:px-2 lg:px-2">
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<h1 class="text-center text-3xl font-extrabold text-gray-900">
				Profile Setting
			</h1>
			<p class="mt-2 text-base text-center">
				Manage the email address and password associated with your account.
			</p>
		</div>

		<div class="mx-4 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="py-8 px-8 shadow sm:rounded sm:px-10">
				<div class="flex justify-start items-center mb-5">
					<TwIcon
						name="account_circle"
						class="rounded-full border border-slate-500 border-solid p-1"
					></TwIcon>
					<span class="ml-2 font-bold text-xl">Avatar</span>
				</div>
				<div class="mb-10 flex justify-start items-center">
					<img
						v-if="avatarImg"
						:src="avatarImg"
						alt=""
						class="w-[120px] h-[120px] rounded-full object-cover"
					/>
					<TwIcon
						v-else
						name="account_circle"
						filled
						class="text-gray-400 text-[120px] rounded-full"
					/>
					<FormKit
						type="button"
						label="Change"
						outer-class="ml-4 !mb-0"
						@click="inputFile.click()"
					/>
					<FormKit
						type="button"
						label="Remove"
						outer-class="ml-4 !mb-0"
						input-class="!bg-transparent !text-slate-400 !border !border-solid !border-slate-400"
						@click="removeAvatar"
					/>
					<input
						ref="inputFile"
						type="file"
						accept="jpeg,jpg,png"
						class="hidden"
						@change="changeAvatar"
					/>
				</div>
				<div class="flex flex-start items-center mb-5">
					<TwIcon
						name="co_present"
						class="rounded-full border border-slate-500 border-solid p-1"
					></TwIcon>
					<span class="ml-2 font-bold text-xl">Profile</span>
				</div>
				<FormKit
					v-model="forms"
					type="form"
					method="POST"
					submit-label="UpdateProfile"
					:incomplete-message="false"
					:actions="false"
					@submit="submitProfile()"
				>
					<div class="space-y-6">
						<FormKit
							type="text"
							name="email"
							label="Email"
							outer-class="pointer-events-none"
							input-class="bg-slate-200 pointer-events-none rounded"
						/>
						<FormKit
							type="text"
							name="firstName"
							label="First Name"
							input-class="rounded"
						/>
						<FormKit
							type="text"
							name="lastName"
							label="Last Name"
							input-class="rounded"
						/>
						<FormKit
							type="text"
							name="title"
							label="Title"
							input-class="rounded"
						/>
						<FormKit
							type="text"
							name="location"
							label="Location"
							input-class="rounded"
						/>
						<FormKit
							type="submit"
							label="Update Profile"
							input-class="!w-1/2"
						/>
					</div>
				</FormKit>
				<p v-if="errors.profile" class="mt-3 text-red-500 uppercase">
					{{ errors.profile }}
				</p>
				<div class="flex flex-start items-center mt-10 mb-5">
					<TwIcon
						name="lock"
						class="rounded-full border border-slate-500 border-solid p-1"
					></TwIcon>
					<span class="ml-2 font-bold text-xl">Password</span>
				</div>
				<FormKit
					v-model="forms"
					type="form"
					method="POST"
					submit-label="Change Password"
					:incomplete-message="false"
					:actions="false"
					@submit="submitPassword()"
				>
					<div class="space-y-6">
						<FormKit
							type="password"
							name="password"
							label="Password"
							input-class="rounded"
						/>
						<FormKit
							type="submit"
							label="Update Password"
							input-class="!w-1/2"
							:outer-class="
								forms.password ? '' : 'pointer-events-none opacity-30'
							"
						/>
					</div>
				</FormKit>
				<p v-if="errors.password" class="mt-3 text-red-500 uppercase">
					{{ errors.password }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
const directus = useDirectus()
definePageMeta({
	title: 'Your Profile',
	middleware: ['auth'],
	layout: 'default',
})
const { useUserStore } = useStore()
const userStore = useUserStore()
const { user, avatarImg } = storeToRefs(userStore)
const inputFile = ref(null)
const forms = ref({
	firstName: user.value.first_name,
	lastName: user.value.last_name,
	title: user.value.title,
	location: user.value.location,
	email: user.value.email,
	password: '',
})
const errors = ref({})
const changeAvatar = async (event) => {
	try {
		const form = new FormData()
		form.append('file', event.target.files[0])
		const res = await directus.files.createOne(form)
		user.value.avatar = { id: res.id }
		await directus.users.me.update({ avatar: res.id })
	} catch (e) {
		errors.value = e
	}
}
const removeAvatar = async () => {
	try {
		user.value.avatar = null
		await directus.users.me.update({ avatar: null })
	} catch (e) {
		errors.value = e
	}
}

const submitProfile = async () => {
	const { firstName, lastName, title, location } = forms.value
	const fields = { first_name: firstName, last_name: lastName, title, location }
	errors.value.profile = ''
	try {
		await directus.users.me.update(fields)
	} catch (e) {
		errors.value.profile = e.message
	}
}
const submitPassword = async () => {
	const { password } = forms.value
	const fields = { password }
	errors.value.password = ''
	try {
		await directus.users.me.update(fields)
		forms.value.password = ''
	} catch (e) {
		errors.value.password = e.message
	}
}
</script>
