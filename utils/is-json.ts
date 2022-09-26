export function isJson(data: string) {
	try {
		JSON.parse(data)
		return true
	} catch {
		return false
	}
}
