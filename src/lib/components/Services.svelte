<script lang="ts">
	import { onMount } from 'svelte';
	import { Trees, Flower2, Droplets, Sun, BrickWall, Wrench } from 'lucide-svelte';

	const services = [
		{
			icon: Trees,
			title: 'Ландшафтный дизайн',
			description: 'Авторский проект благоустройства с учётом особенностей участка.'
		},
		{
			icon: Flower2,
			title: 'Посадка растений',
			description: 'Подбор растений, которые приживутся и будут радовать годами.'
		},
		{
			icon: Droplets,
			title: 'Системы полива',
			description: 'Автоматизация полива — сад зеленеет без вашего участия.'
		},
		{
			icon: Sun,
			title: 'Освещение сада',
			description: 'Свет создаёт настроение. Дизайн и монтаж системы освещения.'
		},
		{
			icon: BrickWall,
			title: 'Мощение и дорожки',
			description: 'Дорожки и площадки из материалов, которым не страшна погода.'
		},
		{
			icon: Wrench,
			title: 'Уход за садом',
			description: 'Поддерживаю сад в идеальном состоянии круглый год.'
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

<section id="services" bind:this={sectionEl} class="bg-gray-50 py-32 dark:bg-gray-900">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mb-16">
			<div class="mb-4 flex items-center gap-3">
				<div class="h-px w-10 bg-emerald-600"></div>
				<span class="text-xs tracking-widest text-emerald-600 uppercase dark:text-emerald-400"
					>Услуги</span
				>
			</div>
			<h2 class="text-4xl font-light text-gray-900 md:text-5xl dark:text-white">
				Полный цикл работ
			</h2>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services as service, i (service.title)}
				<div
					class="group overflow-hidden rounded-xl border border-gray-100 bg-white p-8 transition-all duration-500 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:shadow-emerald-500/5 {visible
						? 'animate-fade-up'
						: 'opacity-0'}"
					style="animation-delay: {i * 80}ms;"
				>
					<div
						class="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-400"
					>
						<service.icon size={20} />
					</div>
					<h3 class="mb-2 text-lg font-medium text-gray-900 dark:text-white">{service.title}</h3>
					<p class="text-sm leading-relaxed text-gray-400">{service.description}</p>
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
