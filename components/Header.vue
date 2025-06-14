<script setup lang="ts">
import {useSoundStore} from '~/stores/global'
const soundStore = useSoundStore()
</script>

<template>
	<header class="px-10 py-4 flex justify-between items-center">
		<img src="/logo.svg" alt="Logo" class="h-10 w-auto" />
		<CountDown @timer-finished="soundStore.handleTimerFinished"/>
	</header>
</template>

