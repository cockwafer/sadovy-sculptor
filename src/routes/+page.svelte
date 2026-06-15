<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Services from '$lib/components/Services.svelte';
	import Portfolio from '$lib/components/Portfolio.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Садовый скульптор — Ландшафтный дизайн</title>
	<meta
		name="description"
		content="Ландшафтный дизайнер без шаблонов. 18 лет авторского подхода."
	/>
</svelte:head>

<Nav />
<Hero />
<About />
<Services />
<Portfolio />
<Contact />
<Footer />
