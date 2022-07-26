<template>
	<Html>
		<Head>
			<Link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css?family=Lato:400,700"
			/>
		</Head>

		<Body class="bg-zinc-50 text-sm text-zinc-800">
			<div class="min-h-screen">
				<NuxtLayout>
					<NuxtPage />
				</NuxtLayout>
			</div>
		</Body>
	</Html>
</template>

<style>
@import '~/assets/css/main.css';
</style>
