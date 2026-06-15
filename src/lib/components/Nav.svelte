<script lang="ts">
	import { Menu, X, Sun, Moon } from 'lucide-svelte';
	import { theme } from '$lib/theme.svelte';

	let mobileOpen = $state(false);
	let scrolled = $state(false);
	let activeIdx = $state(-1);
	let mouseX = $state(0);

	const links = [
		{ label: 'О себе', href: '#about' },
		{ label: 'Услуги', href: '#services' },
		{ label: 'Работы', href: '#portfolio' },
		{ label: 'Контакты', href: '#contact' }
	];

	function close() {
		mobileOpen = false;
	}

	function handleMouseMove(e: MouseEvent, idx: number) {
		activeIdx = idx;
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		mouseX = e.clientX - rect.left;
	}

	function handleMouseLeave() {
		activeIdx = -1;
	}

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			scrolled = window.scrollY > 20;
		});
	}
</script>

<svelte:window
	on:scroll={() => {
		scrolled = window.scrollY > 20;
	}}
/>

<nav
	class="fixed top-0 left-0 z-50 w-full transition-all duration-500 {scrolled ? 'py-3' : 'py-5'}"
>
	<div class="mx-auto max-w-6xl px-4">
		<div
			class="relative flex items-center justify-between rounded-[22px] px-5 py-3 transition-all duration-500
				{scrolled
				? 'bg-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-2xl dark:bg-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]'
				: 'bg-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl dark:bg-white/5 dark:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]'}"
		>
			<div
				class="absolute inset-0 rounded-[22px] border border-white/40 dark:border-white/10"
			></div>

			<a
				href="#hero"
				class="relative flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
			>
				<img src="/logo.jpeg" alt="Логотип" class="h-11 w-11 rounded-xl object-cover shadow-lg" />
				Садовый скульптор
			</a>

			<div class="relative hidden items-center gap-1 md:flex">
				{#each links as link, idx (link.href)}
					<a
						href={link.href}
						onmouseenter={(e) => handleMouseMove(e, idx)}
						onmouseleave={handleMouseLeave}
						class="relative z-10 rounded-xl px-3.5 py-2 text-[13px] font-medium text-gray-600 transition-all duration-200 dark:text-gray-300"
						style="
							transform: scale({activeIdx === idx ? 1.15 : 1});
							{activeIdx === idx ? 'color: var(--tw-text-opacity, 1) ? #111 : #fff;' : ''}
						"
					>
						{#if activeIdx === idx}
							<div
								class="absolute inset-0 rounded-xl bg-black/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:bg-white/[0.1] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
								style="transition: all 0.2s ease;"
							></div>
						{/if}
						<span class="relative">{link.label}</span>
					</a>
				{/each}
				<div class="ml-2 flex items-center gap-1.5">
					<button
						onclick={theme.toggle}
						class="relative z-10 flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-all duration-200 hover:scale-110 dark:text-gray-400"
						aria-label="Тема"
					>
						{#if theme.dark}
							<Sun size={15} />
						{:else}
							<Moon size={15} />
						{/if}
					</button>
					<a
						href="#contact"
						class="relative z-10 rounded-xl bg-gray-900/90 px-4 py-2 text-[13px] font-medium text-white shadow-lg shadow-gray-900/10 transition-all duration-200 hover:scale-105 hover:bg-gray-800 dark:bg-white/90 dark:text-gray-900 dark:shadow-white/10 dark:hover:bg-white"
					>
						Заказать
					</a>
				</div>
			</div>

			<div class="relative flex items-center gap-1.5 md:hidden">
				<button
					onclick={theme.toggle}
					class="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 dark:text-gray-400"
					aria-label="Тема"
				>
					{#if theme.dark}
						<Sun size={15} />
					{:else}
						<Moon size={15} />
					{/if}
				</button>
				<button
					onclick={() => (mobileOpen = !mobileOpen)}
					class="flex h-9 w-9 items-center justify-center rounded-xl text-gray-700 dark:text-gray-300"
					aria-label="Меню"
				>
					{#if mobileOpen}
						<X size={17} />
					{:else}
						<Menu size={17} />
					{/if}
				</button>
			</div>
		</div>
	</div>

	{#if mobileOpen}
		<div class="mx-4 mt-2 md:hidden">
			<div
				class="relative overflow-hidden rounded-[22px] border border-white/40 bg-white/60 p-3 shadow-[0_16px_48px_rgba(0,0,0,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/10 dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
			>
				{#each links as link (link.href)}
					<a
						href={link.href}
						onclick={close}
						class="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all hover:bg-black/5 active:scale-95 dark:text-gray-300 dark:hover:bg-white/10"
					>
						{link.label}
					</a>
				{/each}
				<div class="mt-1 border-t border-black/5 px-1 pt-2 dark:border-white/10">
					<a
						href="#contact"
						onclick={close}
						class="block rounded-xl bg-gray-900/90 px-4 py-3 text-center text-sm font-medium text-white active:scale-95 dark:bg-white/90 dark:text-gray-900"
					>
						Заказать
					</a>
				</div>
			</div>
		</div>
	{/if}
</nav>
