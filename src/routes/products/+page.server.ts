import type { PageServerLoad } from './$types';
import products from '$lib/data/products.json';

export const load: PageServerLoad = async ({ url }) => {
	const category = url.searchParams.get('category');
	const search = url.searchParams.get('search');

	let filtered = [...products];

	if (category) {
		filtered = filtered.filter((p) => p.category === category);
	}

	if (search) {
		const q = search.toLowerCase();
		filtered = filtered.filter(
			(p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
		);
	}

	const categories = [...new Set(products.map((p) => p.category))];

	return {
		products: filtered,
		categories,
		selectedCategory: category,
		searchQuery: search
	};
};
