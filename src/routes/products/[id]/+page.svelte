<script lang="ts">
	import { ArrowLeft, ShoppingBag, Check } from 'lucide-svelte';

	let { data } = $props();

	function formatPrice(price: number) {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
	}
</script>

<svelte:head>
	<title>{data.product.name} — Садовый скульптор</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 pt-28 pb-20 dark:bg-gray-950">
	<div class="mx-auto max-w-6xl px-6">
		<a
			href="/products"
			class="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
		>
			<ArrowLeft size={16} />
			Назад к каталогу
		</a>

		<div class="grid gap-12 lg:grid-cols-2">
			<div class="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-white/5">
				<img
					src={data.product.image}
					alt={data.product.name}
					class="aspect-[4/3] w-full object-cover"
				/>
			</div>

			<div>
				<div
					class="mb-3 text-[10px] font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400"
				>
					{data.product.category}
				</div>
				<h1 class="mb-4 text-3xl font-light text-gray-900 dark:text-white">
					{data.product.name}
				</h1>
				<p class="mb-6 leading-relaxed text-gray-400">
					{data.product.description}
				</p>

				<div class="mb-8 flex items-center gap-4">
					<span class="text-2xl font-semibold text-gray-900 dark:text-white">
						{formatPrice(data.product.price)}
					</span>
					{#if data.product.inStock}
						<span
							class="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
						>
							<Check size={12} />
							В наличии
						</span>
					{:else}
						<span
							class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-white/10 dark:text-gray-400"
						>
							Под заказ
						</span>
					{/if}
				</div>

				<button
					class="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 text-sm font-medium text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
				>
					<ShoppingBag size={16} />
					Заказать
				</button>
			</div>
		</div>

		{#if data.related.length > 0}
			<div class="mt-20">
				<h2 class="mb-6 text-xl font-light text-gray-900 dark:text-white">Похожие товары</h2>
				<div class="grid gap-4 sm:grid-cols-3">
					{#each data.related as item (item.id)}
						<a
							href="/products/{item.id}"
							class="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-white/5"
						>
							<div class="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-white/5">
								<img
									src={item.image}
									alt={item.name}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							<div class="p-4">
								<h3 class="text-sm font-medium text-gray-900 dark:text-white">{item.name}</h3>
								<span class="text-xs text-gray-400">{formatPrice(item.price)}</span>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
