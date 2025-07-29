<script setup>
	import {ref, onMounted, computed} from 'vue'
	import {useSoundStore} from '~/stores/global'
	import VolumeControl from '~/components/VolumeControl.vue'
	import SoundCard from '~/components/SoundCard.vue'

	const soundStore = useSoundStore()

	const rainAudioRef = ref(null)
	const chweAudioRef = ref(null)
	const mewAudioRef = ref(null)
	const thunderAudioRef = ref(null)
	const whiteAudioRef = ref(null)

	onMounted(() => {
		soundStore.setDom('rain', rainAudioRef.value)
		soundStore.setDom('thunder', chweAudioRef.value)
		soundStore.setDom('stream', mewAudioRef.value)
		soundStore.setDom('waves', thunderAudioRef.value)
		soundStore.setDom('night', whiteAudioRef.value)
		soundStore.setVolume(soundStore.masterVolume)
	})

	const playingSound = computed(() =>
		soundStore.sounds.find((s) => s.isPlaying),
	)
	const backgroundUrl = computed(() =>
		playingSound.value ? `/backgrounds/${playingSound.value.name}.gif` : '',
	)

	onMounted(() => {
		const resumeAudioContext = () => {
			console.log('User interacted, attempting to resume AudioContext.')

			document.removeEventListener('click', resumeAudioContext)
			document.removeEventListener('touchstart', resumeAudioContext)
		}

		document.addEventListener('click', resumeAudioContext, {once: true})
		document.addEventListener('touchstart', resumeAudioContext, {once: true})
	})
</script>

<template>
	<div
		v-if="backgroundUrl"
		class="fixed inset-0 z-0 pointer-events-none"
		:style="{
			backgroundImage: `url('${backgroundUrl}')`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			opacity: 0.25,
			transition: 'opacity 0.5s',
		}"
	></div>
	<div class="flex flex-col justify-between flex-1">
		<div class="flex flex-row justify-center">

			<audio
				ref="rainAudioRef"
				:src="soundStore.sounds[0].src"
				preload="none"
				loop
			/>
			<audio
				ref="chweAudioRef"
				:src="soundStore.sounds[1].src"
				preload="none"
				loop
			/>
			<audio
				ref="mewAudioRef"
				:src="soundStore.sounds[2].src"
				preload="none"
				loop
			/>
			<audio
				ref="thunderAudioRef"
				:src="soundStore.sounds[3].src"
				preload="none"
				loop
			/>
			<audio
				ref="whiteAudioRef"
				:src="soundStore.sounds[4].src"
				preload="none"
				loop
			/>
			<SoundCard
				v-for="sound in soundStore.sounds"
				:key="sound.name"
				:sound="sound"
				@togglePlay="soundStore.togglePlay"
				class="mx-2"
			/>
		</div>
		<div class="flex flex-col justify-center items-center mb-12">
			<CountDown @timer-finished="soundStore.handleTimerFinished"
			class="mb-8"/>
			<VolumeControl
				v-model:masterVolume="soundStore.masterVolume"
				@update:masterVolume="soundStore.setVolume"
				
			/>
			
		</div>
	</div>
</template>
