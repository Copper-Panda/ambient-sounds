<template>
	<div class="min-h-screen flex flex-col bg-[#1A1E26]">
		<Header />

		<main class="flex-1 p-6">
			<NuxtPage />
		</main>

		<Footer />
	</div>
</template>

<script setup>
	import Header from '~/components/Header.vue'
	import Footer from '~/components/Footer.vue'
</script>
