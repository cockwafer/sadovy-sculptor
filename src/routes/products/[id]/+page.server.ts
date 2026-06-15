import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import products from '$lib/data/products.json';

export const load: PageServerLoad = async ({ params }) => {
	const product = products.find((p) => p.id === Number(params.id));

	if (!product) {
		error(404, 'Товар не найден');
	}

	const related = products
		.filter((p) => p.category === product.category && p.id !== product.id)
		.slice(0, 3);

	return {
		product,
		related
	};
};
