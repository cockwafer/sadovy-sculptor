<script lang="ts">
	import { onMount } from 'svelte';
	import { Phone, Mail, MapPin, Check, Send } from 'lucide-svelte';

	let name = $state('');
	let phone = $state('');
	let message = $state('');
	let submitted = $state(false);

	function handleSubmit(e: Event) {
		e.preventDefault();
		submitted = true;
		setTimeout(() => {
			submitted = false;
			name = '';
			phone = '';
			message = '';
		}, 3000);
	}

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

<section id="contact" bind:this={sectionEl} class="bg-gray-50 py-32 dark:bg-gray-900">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid gap-16 lg:grid-cols-2">
			<div class={visible ? 'animate-fade-up' : 'opacity-0'} style="animation-delay: 0ms;">
				<div class="mb-4 flex items-center gap-3">
					<div class="h-px w-10 bg-emerald-600"></div>
					<span class="text-xs tracking-widest text-emerald-600 uppercase dark:text-emerald-400"
						>Контакты</span
					>
				</div>

				<h2 class="mb-6 text-4xl font-light text-gray-900 md:text-5xl dark:text-white">
					Начнём <span class="text-emerald-700 dark:text-emerald-400">проект?</span>
				</h2>

				<p class="mb-10 leading-relaxed text-gray-400">
					Расскажите о вашем участке. Бесплатная консультация — обсудим идеи и варианты.
				</p>

				<div class="space-y-5">
					<div class="flex items-center gap-4">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10"
						>
							<Phone size={16} class="text-emerald-600 dark:text-emerald-400" />
						</div>
						<div>
							<div class="text-xs text-gray-400">Телефон</div>
							<div class="text-sm text-gray-900 dark:text-white">+7 (999) 123-45-67</div>
						</div>
					</div>
					<div class="flex items-center gap-4">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10"
						>
							<Mail size={16} class="text-emerald-600 dark:text-emerald-400" />
						</div>
						<div>
							<div class="text-xs text-gray-400">Email</div>
							<div class="text-sm text-gray-900 dark:text-white">hello@sadovy-sculptor.ru</div>
						</div>
					</div>
					<div class="flex items-center gap-4">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10"
						>
							<MapPin size={16} class="text-emerald-600 dark:text-emerald-400" />
						</div>
						<div>
							<div class="text-xs text-gray-400">Локация</div>
							<div class="text-sm text-gray-900 dark:text-white">Москва и Московская область</div>
						</div>
					</div>
				</div>
			</div>

			<div class={visible ? 'animate-fade-up' : 'opacity-0'} style="animation-delay: 150ms;">
				{#if submitted}
					<div
						class="flex flex-col items-center justify-center overflow-hidden rounded-xl bg-white p-16 text-center dark:bg-white/5"
					>
						<div
							class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10"
						>
							<Check size={24} class="text-emerald-600 dark:text-emerald-400" />
						</div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white">Заявка отправлена</h3>
						<p class="mt-1 text-sm text-gray-400">Перезвоню в течение дня</p>
					</div>
				{:else}
					<form
						onsubmit={handleSubmit}
						class="space-y-5 overflow-hidden rounded-xl bg-white p-8 dark:bg-white/5"
					>
						<div>
							<label for="name" class="mb-1.5 block text-xs text-gray-400">Имя</label>
							<input
								id="name"
								type="text"
								bind:value={name}
								required
								class="w-full border-b border-gray-200 bg-transparent py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:border-emerald-600 focus:outline-none dark:border-white/10 dark:text-white dark:placeholder:text-white/30"
								placeholder="Как вас зовут?"
							/>
						</div>
						<div>
							<label for="phone" class="mb-1.5 block text-xs text-gray-400">Телефон</label>
							<input
								id="phone"
								type="tel"
								bind:value={phone}
								required
								class="w-full border-b border-gray-200 bg-transparent py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:border-emerald-600 focus:outline-none dark:border-white/10 dark:text-white dark:placeholder:text-white/30"
								placeholder="+7 (___) ___-__-__"
							/>
						</div>
						<div>
							<label for="message" class="mb-1.5 block text-xs text-gray-400">Сообщение</label>
							<textarea
								id="message"
								bind:value={message}
								rows="3"
								class="w-full resize-none border-b border-gray-200 bg-transparent py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:border-emerald-600 focus:outline-none dark:border-white/10 dark:text-white dark:placeholder:text-white/30"
								placeholder="Расскажите о вашем участке..."
							></textarea>
						</div>
						<button
							type="submit"
							class="group mt-2 flex items-center gap-2 bg-gray-900 px-6 py-3 text-sm text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
						>
							Отправить
							<Send size={14} class="transition-transform group-hover:translate-x-0.5" />
						</button>
					</form>
				{/if}
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
