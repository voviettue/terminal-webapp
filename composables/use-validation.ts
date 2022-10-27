import { Ref } from 'vue'

interface Validation {
	rules: any[]
	messages: Record<string, any>
}

export const useValidation = (
	validations: Record<string, any>[],
	required: boolean
) => {
	const validation: Ref<Validation> = ref({ rules: [], messages: {} })
	const booleanRules = ['accepted', 'email', 'number', 'required', 'url']
	watchEffect(() => {
		validation.value.rules = []
		validation.value.messages = {}

		for (const v of validations) {
			let value = v.value
			if (v.rule === 'matches') {
				value = RegExp(value.replace(/^\//, '').replace(/\/$/, ''))
			}

			if (booleanRules.includes(v.rule)) {
				validation.value.rules.unshift([v.rule])
			} else {
				validation.value.rules.push([v.rule, value])
			}

			if (v.errorMessage) {
				validation.value.messages[v.rule] = v.errorMessage
			}
		}
		if (required) {
			validation.value.rules.unshift(['required'])
		}
	})
	return { validation }
}
