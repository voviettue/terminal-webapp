export default function jsEscape(str) {
	if (!str) return str

	return String(str).replace(/(<([^>]+)>)/gi, '')
}
