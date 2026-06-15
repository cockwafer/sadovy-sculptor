<script lang="ts">
	import { Menu, X, Sun, Moon } from 'lucide-svelte';
	import { theme } from '$lib/theme.svelte';
	import { page } from '$app/state';

	let mobileOpen = $state(false);
	let scrolled = $state(false);

	const links = [
		{ label: 'О себе', href: '/#about' },
		{ label: 'Услуги', href: '/#services' },
		{ label: 'Работы', href: '/#portfolio' },
		{ label: 'Товары', href: '/products' },
		{ label: 'Контакты', href: '/#contact' }
	];

	function close() {
		mobileOpen = false;
	}

	function isActive(href: string): boolean {
		if (href === '/products') return page.url.pathname.startsWith('/products');
		return false;
	}
</script>

<svelte:window
	on:scroll={() => {
		scrolled = window.scrollY > 20;
	}}
/>

<nav
	class="fixed top-0 left-0 z-50 w-full border-b transition-all duration-300
		{scrolled
		? 'border-black/5 bg-white/80 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/80'
		: 'border-transparent bg-white/50 backdrop-blur-md dark:bg-gray-950/50'}"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		<a
			href="/"
			class="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
		>
			<img src="/logo.jpeg" alt="Логотип" class="h-12 w-12 rounded-xl object-cover" />
			Садовый скульптор
		</a>

		<div class="hidden items-center gap-1 md:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="rounded-lg px-4 py-2 text-[13px] font-medium transition-colors
						{isActive(link.href)
						? 'text-emerald-600 dark:text-emerald-400'
						: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}"
				>
					{link.label}
				</a>
			{/each}
			<div class="ml-3 flex items-center gap-2 border-l border-gray-200 pl-3 dark:border-white/10">
				<button
					onclick={theme.toggle}
					class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10"
					aria-label="Тема"
				>
					{#if theme.dark}
						<Sun size={16} />
					{:else}
						<Moon size={16} />
					{/if}
				</button>
				<a
					href="/#contact"
					class="rounded-lg bg-gray-900 px-5 py-2 text-[13px] font-medium text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
				>
					Заказать
				</a>
			</div>
		</div>

		<div class="flex items-center gap-1 md:hidden">
			<button
				onclick={theme.toggle}
				class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400"
				aria-label="Тема"
			>
				{#if theme.dark}
					<Sun size={16} />
				{:else}
					<Moon size={16} />
				{/if}
			</button>
			<button
				onclick={() => (mobileOpen = !mobileOpen)}
				class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-700 dark:text-gray-300"
				aria-label="Меню"
			>
				{#if mobileOpen}
					<X size={18} />
				{:else}
					<Menu size={18} />
				{/if}
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<div
			class="border-t border-gray-200 bg-white px-6 py-4 md:hidden dark:border-white/10 dark:bg-gray-950"
		>
			{#each links as link (link.href)}
				<a
					href={link.href}
					onclick={close}
					class="block rounded-lg px-4 py-3 text-sm font-medium transition-colors
						{isActive(link.href)
						? 'text-emerald-600 dark:text-emerald-400'
						: 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5'}"
				>
					{link.label}
				</a>
			{/each}
			<div class="mt-3 border-t border-gray-200 pt-3 dark:border-white/10">
				<a
					href="/#contact"
					onclick={close}
					class="block rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-medium text-white dark:bg-white dark:text-gray-900"
				>
					Заказать
				</a>
			</div>
		</div>
	{/if}
</nav>
