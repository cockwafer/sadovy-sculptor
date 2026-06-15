function createTheme() {
	let dark = $state(false);

	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem('theme');
		dark =
			saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
		apply(dark);
	}

	function apply(isDark: boolean) {
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}

	return {
		get dark() {
			return dark;
		},
		toggle() {
			dark = !dark;
			apply(dark);
		}
	};
}

export const theme = createTheme();
