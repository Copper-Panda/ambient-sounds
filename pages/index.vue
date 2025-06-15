<script setup>
	import {ref, onMounted, computed} from 'vue'
	import {useSoundStore} from '~/stores/global'
	import VolumeControl from '~/components/VolumeControl.vue'
	import SoundCard from '~/components/SoundCard.vue'

	const soundStore = useSoundStore()

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
			<SoundCard
				v-for="sound in soundStore.sounds"
				:key="sound.name"
				:sound="sound"
				@togglePlay="soundStore.togglePlay"
				class="mx-2"
			/>
		</div>
		<div class="flex justify-center mb-15">
			<VolumeControl
				v-model:masterVolume="soundStore.masterVolume"
				@update:masterVolume="soundStore.setVolume"
			/>
		</div>
	</div>
</template>
