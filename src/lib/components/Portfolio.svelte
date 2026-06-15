<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight } from 'lucide-svelte';

	const projects = [
		{
			title: 'Волшебная туя',
			category: 'Видео',
			year: '2024',
			color: 'from-emerald-100 to-green-200 dark:from-emerald-900/50 dark:to-green-900/50',
			video: '/work1.mp4'
		},
		{
			title: 'Создание ниваки',
			category: 'Видео',
			year: '2024',
			color: 'from-emerald-100 to-green-200 dark:from-emerald-900/50 dark:to-green-900/50',
			video: '/work2.mp4'
		},
		{
			title: 'Проект 1',
			category: 'Ландшафт',
			year: '2024',
			color: 'from-emerald-100 to-green-200 dark:from-emerald-900/50 dark:to-green-900/50'
		},
		{
			title: 'Проект 2',
			category: 'Посадки',
			year: '2024',
			color: 'from-pink-100 to-rose-200 dark:from-pink-900/50 dark:to-rose-900/50'
		},
		{
			title: 'Проект 3',
			category: 'Дизайн',
			year: '2023',
			color: 'from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
		},
		{
			title: 'Проект 4',
			category: 'Комплекс',
			year: '2023',
			color: 'from-lime-100 to-emerald-200 dark:from-lime-900/50 dark:to-emerald-900/50'
		},
		{
			title: 'Проект 5',
			category: 'Уход',
			year: '2022',
			color: 'from-cyan-50 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30'
		}
	];

	let visible = $state(false);
	let sectionEl: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) visible = true;
			},
			{ threshold: 0.1 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section id="portfolio" bind:this={sectionEl} class="bg-white py-32 dark:bg-gray-950">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mb-16">
			<div class="mb-4 flex items-center gap-3">
				<div class="h-px w-10 bg-emerald-600"></div>
				<span class="text-xs tracking-widest text-emerald-600 uppercase dark:text-emerald-400"
					>Портфолио</span
				>
			</div>
			<h2 class="text-4xl font-light text-gray-900 md:text-5xl dark:text-white">
				Избранные работы
			</h2>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each projects as project, i (project.title)}
				<div
					class="group cursor-pointer overflow-hidden rounded-xl {visible
						? 'animate-fade-up'
						: 'opacity-0'}"
					style="animation-delay: {i * 80}ms;"
				>
					<div
						class="aspect-[4/5] bg-gradient-to-br {project.color} p-6 transition-all duration-500 group-hover:shadow-lg"
					>
						{#if project.video}
							<video
								src={project.video}
								class="absolute inset-0 h-full w-full object-cover"
								autoplay
								muted
								loop
								playsinline
							></video>
							<div class="absolute inset-0 bg-black/20"></div>
						{/if}
						<div class="relative flex h-full flex-col justify-between">
							<div class="flex items-start justify-between">
								<span class="text-xs text-gray-500 dark:text-gray-300">{project.category}</span>
								<span class="text-xs text-gray-400 dark:text-gray-400">{project.year}</span>
							</div>
							<div>
								<h3 class="text-2xl font-light text-gray-900 dark:text-white">{project.title}</h3>
								<div
									class="mt-3 flex items-center gap-1 text-xs text-gray-400 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
								>
									Подробнее
									<ArrowRight size={12} class="transition-transform group-hover:translate-x-1" />
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	@keyframes fade-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-up {
		animation: fade-up 0.6s ease-out forwards;
	}
</style>
