import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import products from '$lib/data/products.json';

export const GET: RequestHandler = async ({ params }) => {
	const product = products.find((p) => p.id === Number(params.id));

	if (!product) {
		error(404, 'Товар не найден');
	}

	return json(product);
};
