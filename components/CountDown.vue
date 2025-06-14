<script setup>
	import {ref, watch, onUnmounted} from 'vue'

	const emit = defineEmits(['countdownFinished'])

	const isActive = ref(false)
	const timeLeft = ref(0)
	let timer = null

	function start(duration) {
		if (timer) clearInterval(timer)
		timeLeft.value = duration
		isActive.value = true
		timer = setInterval(() => {
			if (timeLeft.value > 0) {
				timeLeft.value--
			} else {
				stop()
				emit('countdownFinished')
			}
		}, 1000)
	}

	function pause() {
		isActive.value = false
		if (timer) clearInterval(timer)
		timer = null
	}

	function clear() {
		pause()
		timeLeft.value = 0
	}

	function stop() {
		pause()
	}

	onUnmounted(() => {
		if (timer) clearInterval(timer)
	})

	defineExpose({start, pause, clear, timeLeft, isActive})
</script>

<template>
	<UPopover>
		<UButton label='open' color='neutral' variant='subtle' />
		<template #content>
            <Placeholder class='size-48 m-4 inline-flex' />
        
        </template>
	</UPopover>
</template>
