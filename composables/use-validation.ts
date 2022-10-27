import { Ref } from 'vue'

interface Validation {
	rules: string
	messages: Record<string, any>
}

export const useValidation = (
	validations: Record<string, any>[],
	required: boolean
) => {
	const validation: Ref<Validation> = ref({ rules: '', messages: {} })
	const booleanRules = ['accepted', 'email', 'number', 'required', 'url']
	watchEffect(() => {
		validation.value.rules = ''
		validation.value.messages = {}
		let rules = []
		for (const v of validations) {
			let value = v.value
			if (v.rule === 'matches') {
				value = RegExp(value.replace(/^\//, '').replace(/\/$/, ''))
			}

			if (booleanRules.includes(v.rule)) {
				rules.unshift([v.rule])
			} else {
				rules.push([v.rule, value])
			}
			if (v.errorMessage) {
				validation.value.messages[v.rule] = v.errorMessage
			}
		}
		if (required) {
			if (rules.join('').includes('required'))
				rules = rules.filter(
					(v) => JSON.stringify(v) !== JSON.stringify(['required'])
				)
			rules.unshift(['required'])
		}
		validation.value.rules = rules
			.map((rule: string[]) => rule.join(':'))
			.join('|')
	})
	return { validation }
}
