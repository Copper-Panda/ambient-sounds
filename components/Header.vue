<template>
  <header class="px-4 py-4 flex justify-between items-center bg-[#1A202C] relative">
    <NuxtLink to="/">
      <img src="/logo.svg" alt="Ambientsounds.org Logo" class="h-10 w-auto" />
    </NuxtLink>

    <!-- Desktop Navigation -->
    <nav class="hidden md:block">
      <ul class="flex space-x-16 mr-10">
        <li>
          <NuxtLink to="/" class="text-[#E0E5EB] hover:text-[#50A4C2] text-lg font-medium transition duration-200">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/player" class="text-[#E0E5EB] hover:text-[#50A4C2] text-lg font-medium transition duration-200">Player</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" class="text-[#E0E5EB] hover:text-[#50A4C2] text-lg font-200">About</NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Mobile Hamburger Button -->
    <button
      @click="toggleMenu"
      class="md:hidden text-[#E0E5EB] focus:outline-none focus:ring-2 focus:ring-[#50A4C2]"
      aria-label="Toggle navigation"
    >
      <!-- Hamburger Icon (e.g., SVG or Font Awesome) -->
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <!-- Mobile Menu (Off-canvas or Dropdown) -->
    <!-- You'd toggle `hidden` and `translate-x-full` / `opacity-0` here with JS based on `isMenuOpen` -->
    <nav
      :class="[
        'md:hidden absolute top-full left-0 w-full bg-[#1A202C] transition-all duration-300 ease-in-out z-10',
        isMenuOpen ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-2'
      ]"
    >
      <ul class="flex flex-col items-center py-4 space-y-4">
        <li>
          <NuxtLink to="/" @click="closeMenu" class="text-[#E0E5EB] hover:text-[#50A4C2] text-lg font-medium transition duration-200 py-2 px-4 block w-full text-center">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/player" @click="closeMenu" class="text-[#E0E5EB] hover:text-[#50A4C2] text-lg font-medium transition duration-200 py-2 px-4 block w-full text-center">Player</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" @click="closeMenu" class="text-[#E0E5EB] hover:text-[#50A4C2] text-lg font-medium transition duration-200 py-2 px-4 block w-full text-center">About</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>