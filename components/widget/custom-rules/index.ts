function minValue(node, rule) {
	const value = Number((node.value || '0').replaceAll(',', ''))
	return value >= rule
}
function maxValue(node, rule) {
	const value = Number((node.value || '0').replaceAll(',', ''))
	return value <= rule
}
export default { minValue, maxValue }
