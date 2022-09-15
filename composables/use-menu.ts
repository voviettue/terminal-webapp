export const useMenu = () =>
	useState('menu-state', () => {
		return { open: false }
	})
