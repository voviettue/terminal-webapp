<template>
	<TwCard title="Royalty Rates" class="mb-5">
		<TwList :headers="rateHeader" :item="rates"></TwList>
	</TwCard>
</template>
<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { rateHeader } from './constants'

const props = defineProps<{ data: Record<string, any> }>()
const rates = ref({})

function getRates(data) {
	const {
		pub_share,
		writer_share,
		n_rights_share,
		master_rights_share,
		producer_rights_share,
		net_publisher_share,
		movie_producer_rights_share,
		number_of_songs,
		number_of_shared_songs,
	} = data
	rates.value = {
		publishing: pub_share,
		writer: writer_share,
		neigbouring: n_rights_share,
		master: master_rights_share,
		producer: producer_rights_share,
		net: net_publisher_share,
		movie: movie_producer_rights_share,
		song: number_of_songs,
		share: number_of_shared_songs,
	}
}
onMounted(() => {
	getRates(props.data)
})
</script>
