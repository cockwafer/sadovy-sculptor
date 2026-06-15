<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Search, ShoppingBag } from 'lucide-svelte';

	let { data } = $props();

	let search = $state(data.searchQuery || '');
	let selectedCategory = $state(data.selectedCategory || '');

	function updateFilter() {
		const params = new URLSearchParams();
		if (selectedCategory) params.set('category', selectedCategory);
		if (search) params.set('search', search);
		goto(`/products?${params.toString()}`, { replaceState: true, keepFocus: true });
	}

	function formatPrice(price: number) {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
	}
</script>

<svelte:head>
	<title>Товары — Садовый скульптор</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 pt-24 pb-20 dark:bg-gray-950">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mb-12">
			<div class="mb-4 flex items-center gap-3">
				<div class="h-px w-10 bg-emerald-600"></div>
				<span class="text-xs tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
					Каталог
				</span>
			</div>
			<h1 class="text-4xl font-light text-gray-900 md:text-5xl dark:text-white">
				Товары и растения
			</h1>
		</div>

		<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="relative max-w-sm flex-1">
				<Search size={16} class="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
				<input
					type="text"
					bind:value={search}
					oninput={updateFilter}
					placeholder="Поиск..."
					class="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-600 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30"
				/>
			</div>

			<div class="flex flex-wrap gap-2">
				<button
					onclick={() => {
						selectedCategory = '';
						updateFilter();
					}}
					class="rounded-xl px-4 py-2 text-xs font-medium transition-all {selectedCategory === ''
						? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
						: 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-400 dark:hover:bg-white/20'}"
				>
					Все
				</button>
				{#each data.categories as cat (cat)}
					<button
						onclick={() => {
							selectedCategory = cat;
							updateFilter();
						}}
						class="rounded-xl px-4 py-2 text-xs font-medium transition-all {selectedCategory === cat
							? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
							: 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-400 dark:hover:bg-white/20'}"
					>
						{cat}
					</button>
				{/each}
			</div>
		</div>

		{#if data.products.length === 0}
			<div class="py-20 text-center">
				<ShoppingBag size={40} class="mx-auto mb-4 text-gray-300 dark:text-white/20" />
				<p class="text-gray-400">Ничего не найдено</p>
			</div>
		{:else}
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each data.products as product (product.id)}
					<a
						href="/products/{product.id}"
						class="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-white/5"
					>
						<div class="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-white/5">
							<img
								src={product.image}
								alt={product.name}
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							/>
						</div>
						<div class="p-5">
							<div
								class="mb-1 text-[10px] font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400"
							>
								{product.category}
							</div>
							<h3 class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
								{product.name}
							</h3>
							<p class="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-400">
								{product.description}
							</p>
							<div class="flex items-center justify-between">
								<span class="text-sm font-semibold text-gray-900 dark:text-white">
									{formatPrice(product.price)}
								</span>
								{#if product.inStock}
									<span class="text-[10px] font-medium text-emerald-600 dark:text-emerald-400"
										>В наличии</span
									>
								{:else}
									<span class="text-[10px] font-medium text-gray-400">Под заказ</span>
								{/if}
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
