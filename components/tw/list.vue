<template>
	<div class=".border-t border-gray-200">
		<dl class="sm:divide-y sm:divide-gray-200">
			<div
				v-for="header in normalizedHeaders"
				:key="header?.value"
				class="sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4"
			>
				<dt>
					<slot :name="`header-${header.value}`">
						{{ get(header, 'text') ?? '—' }}
					</slot>
				</dt>
				<dd class="mt-1 text-right sm:mt-0 sm:col-span-2 font-bold">
					<slot
						:name="`item-${header?.value}`"
						:item="item"
						:value="get(item, header?.value)"
					>
						<RenderDisplay
							v-if="header?.display"
							:name="header.display"
							:value="get(item, header.value)"
							:options="header?.displayOptions"
						/>
						<template v-else>
							{{ get(item, header.value) ?? '—' }}
						</template>
					</slot>
				</dd>
			</div>
		</dl>
	</div>
</template>

<script setup lang="ts">
import { TableHeader } from '~~/shared/types'

const props = defineProps<{
	headers: (string | Partial<TableHeader>)[]
	item?: Record<string, any>
}>()

const normalizedHeaders = computed<Partial<TableHeader>[]>(() => {
	return props.headers.map((header: any) =>
		header instanceof Object ? header : { value: header, text: header }
	)
})
const { get } = useLodash()
</script>
