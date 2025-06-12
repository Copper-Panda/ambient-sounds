<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <Header />
    
    <main class="flex-1 p-6">
        <UApp>
<NuxtPage />
        </UApp>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>
