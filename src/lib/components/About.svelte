<script lang="ts">
	import { onMount } from 'svelte';
	import { Leaf, TreePine, Shield } from 'lucide-svelte';

	let visible = $state(false);
	let sectionEl: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) visible = true;
			},
			{ threshold: 0.2 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section id="about" bind:this={sectionEl} class="bg-white py-32 dark:bg-gray-950">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid items-center gap-16 lg:grid-cols-2">
			<div class={visible ? 'animate-fade-up' : 'opacity-0'} style="animation-delay: 0ms;">
				<div class="overflow-hidden rounded-2xl shadow-xl">
					<img src="/about.png" alt="Обо мне" class="h-full w-full object-cover" />
				</div>
			</div>

			<div class={visible ? 'animate-fade-up' : 'opacity-0'} style="animation-delay: 150ms;">
				<div class="mb-4 flex items-center gap-3">
					<div class="h-px w-10 bg-emerald-600"></div>
					<span class="text-xs tracking-widest text-emerald-600 uppercase dark:text-emerald-400"
						>Обо мне</span
					>
				</div>

				<h2
					class="mb-6 text-4xl font-light leading-tight text-gray-900 md:text-5xl dark:text-white"
				>
					Не дизайнер.<br />Художник
					<span class="text-emerald-700 dark:text-emerald-400">сада.</span>
				</h2>

				<p class="mb-6 leading-relaxed text-gray-400">
					Меня зовут Александр. Каждый мой сад — это высказывание, а не проект по типовому решению.
					18 лет я создавал пространства, которые невозможно спутать с чьими-либо другими.
				</p>
				<p class="mb-10 leading-relaxed text-gray-400">
					От минималистичных двориков до масштабных парков — каждый проект получает авторскую
					подпись и внимание к каждой детали.
				</p>

				<div class="grid grid-cols-3 gap-4">
					<div class="overflow-hidden rounded-xl border border-gray-100 p-4 dark:border-white/10">
						<Leaf size={20} class="mb-2 text-emerald-600 dark:text-emerald-400" />
						<div class="text-xs font-medium text-gray-900 dark:text-white">Авторский подход</div>
					</div>
					<div class="overflow-hidden rounded-xl border border-gray-100 p-4 dark:border-white/10">
						<TreePine size={20} class="mb-2 text-emerald-600 dark:text-emerald-400" />
						<div class="text-xs font-medium text-gray-900 dark:text-white">Живые сады</div>
					</div>
					<div class="overflow-hidden rounded-xl border border-gray-100 p-4 dark:border-white/10">
						<Shield size={20} class="mb-2 text-emerald-600 dark:text-emerald-400" />
						<div class="text-xs font-medium text-gray-900 dark:text-white">Гарантия</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes fade-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-up {
		animation: fade-up 0.8s ease-out forwards;
	}
</style>
