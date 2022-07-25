import { format } from 'date-fns'
export const useFilters = () => ({
	camelCase: (str: string): string => {
		if (!str) return ''
		const arr = str.split('_')
		const strconverted = arr
			.reduce((pre, cur) => {
				if (cur.length) pre += cur.charAt(0).toUpperCase() + cur.slice(1) + ' '
				return pre
			}, '')
			.replaceAll(/(_| )/g, ' ')
		return strconverted
	},
	percent: (num: number | null | undefined): string => {
		return `${(num || 0) * 100}%`
	},
	formatDate: function (date: string | Date, formatString: any[]) {
		return format(new Date(date), formatString[0])
	},
})
