<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowDown } from 'lucide-svelte';

	let scrollY = $state(0);
	let heroHeight = $state(0);
	let sliderPos = $state(50);
	let isDragging = $state(false);
	let sliderEl: HTMLElement | undefined = $state();

	const contentOpacity = $derived(Math.max(1 - scrollY / (heroHeight * 0.5), 0));
	const contentTranslate = $derived(scrollY * 0.25);

	function handleMove(e: MouseEvent | TouchEvent) {
		if (!isDragging || !sliderEl) return;
		const rect = sliderEl.getBoundingClientRect();
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const x = ((clientX - rect.left) / rect.width) * 100;
		sliderPos = Math.max(5, Math.min(95, x));
	}

	function startDrag() {
		isDragging = true;
	}

	function stopDrag() {
		isDragging = false;
	}

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('mousemove', handleMove);
		window.addEventListener('mouseup', stopDrag);
		window.addEventListener('touchmove', handleMove);
		window.addEventListener('touchend', stopDrag);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('mousemove', handleMove);
			window.removeEventListener('mouseup', stopDrag);
			window.removeEventListener('touchmove', handleMove);
			window.removeEventListener('touchend', stopDrag);
		};
	});
</script>

<section
	bind:clientHeight={heroHeight}
	id="hero"
	class="relative flex min-h-screen items-center overflow-hidden bg-gray-50 dark:bg-gray-950"
>
	<div
		class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
		style="background-image: url('/hero-preview.png');"
	></div>

	<div class="relative mx-auto max-w-6xl px-6 pt-32 pb-20">
		<div style="opacity: {contentOpacity}; transform: translateY({contentTranslate}px);">
			<div class="mb-8 flex items-center gap-3">
				<div class="h-px w-10 bg-emerald-600"></div>
				<span
					class="text-xs tracking-widest text-emerald-700 uppercase drop-shadow-sm dark:text-emerald-400"
				>
					18 лет опыта
				</span>
			</div>

			<h1
				class="mb-6 text-5xl font-light leading-tight tracking-tight text-gray-900 drop-shadow-sm md:text-7xl dark:text-white"
			>
				Создаю сады,<br />которые
				<span class="font-medium text-emerald-700 dark:text-emerald-400">живут</span>
			</h1>

			<p
				class="mb-10 max-w-md text-lg leading-relaxed text-gray-500 drop-shadow-sm dark:text-gray-400"
			>
				Ландшафтный дизайнер. Превращаю участки в пространства, где хочется находиться. Каждый сад —
				авторский, без шаблонов.
			</p>

			<div class="flex items-center gap-6">
				<a
					href="#contact"
					class="group flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
				>
					Обсудить проект
					<ArrowDown size={14} class="transition-transform group-hover:translate-y-0.5" />
				</a>
				<a
					href="#portfolio"
					class="text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
				>
					Смотреть работы →
				</a>
			</div>
		</div>

		<div class="mt-24">
			<div
				bind:this={sliderEl}
				class="relative aspect-[21/9] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl shadow-2xl dark:shadow-2xl/30"
				onmousedown={startDrag}
				ontouchstart={startDrag}
				role="presentation"
			>
				<img
					src="/garden.jpg"
					alt="После"
					class="absolute inset-0 h-full w-full object-cover"
					draggable="false"
				/>

				<div class="absolute inset-0 overflow-hidden" style="width: {sliderPos}%;">
					<img
						src="/bad-garden.jpg"
						alt="До"
						class="absolute inset-0 h-full w-full object-cover"
						style="width: {sliderEl ? sliderEl.offsetWidth + 'px' : '100%'}; max-width: none;"
						draggable="false"
					/>
				</div>

				<div class="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style="left: {sliderPos}%;">
					<div
						class="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl"
					>
						<svg
							class="h-5 w-5 text-gray-600"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M8 18L2 12l6-6" />
							<path d="M16 6l6 6-6 6" />
						</svg>
					</div>
				</div>

				<div
					class="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm"
				>
					До
				</div>
				<div
					class="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm"
				>
					После
				</div>
			</div>
		</div>

		<div class="mt-16 grid grid-cols-3 gap-8 border-t border-gray-200 pt-8 dark:border-white/10">
			<div>
				<div class="text-3xl font-light text-gray-900 dark:text-white">
					500<span class="text-emerald-600 dark:text-emerald-400">+</span>
				</div>
				<div class="mt-1 text-xs text-gray-400">Проектов</div>
			</div>
			<div>
				<div class="text-3xl font-light text-gray-900 dark:text-white">18</div>
				<div class="mt-1 text-xs text-gray-400">Лет опыта</div>
			</div>
			<div>
				<div class="text-3xl font-light text-gray-900 dark:text-white">100%</div>
				<div class="mt-1 text-xs text-gray-400">Довольных</div>
			</div>
		</div>
	</div>
</section>
