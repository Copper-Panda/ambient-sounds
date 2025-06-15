<script setup>
	import {ref, onMounted} from 'vue'
	import {useSoundStore} from '~/stores/global'
	import VolumeControl from '~/components/VolumeControl.vue'

	const soundStore = useSoundStore()

	const rainAudioRef = ref(null)
	const chweAudioRef = ref(null)
	const mewAudioRef = ref(null)
	const thunderAudioRef = ref(null)
	const whiteAudioRef = ref(null)

	onMounted(() => {
		soundStore.setDom('rain', rainAudioRef.value)
		soundStore.setDom('chwe', chweAudioRef.value)
		soundStore.setDom('mew', mewAudioRef.value)
		soundStore.setDom('thunder', thunderAudioRef.value)
		soundStore.setDom('WhiteNoise', whiteAudioRef.value)
		soundStore.setVolume(soundStore.masterVolume)
	})

	const playingSound = computed(() =>
		soundStore.sounds.find((s) => s.isPlaying),
	)
	const backgroundUrl = computed(() =>
		playingSound.value ? `/backgrounds/${playingSound.value.name}.gif` : '',
	)
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
      transition: 'opacity 0.5s'
    }"
  ></div>
	<div class="flex flex-col justify-between flex-1">
		<div class="flex flex-row justify-center">
			<audio
				ref="rainAudioRef"
				:src="soundStore.sounds[0].src"
				preload="auto"
				loop
			/>
			<audio
				ref="chweAudioRef"
				:src="soundStore.sounds[1].src"
				preload="auto"
				loop
			/>
			<audio
				ref="mewAudioRef"
				:src="soundStore.sounds[2].src"
				preload="auto"
				loop
			/>
			<audio
				ref="thunderAudioRef"
				:src="soundStore.sounds[3].src"
				preload="auto"
				loop
			/>
			<audio
				ref="whiteAudioRef"
				:src="soundStore.sounds[4].src"
				preload="auto"
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
		<div class="flex justify-center mb-15">
			<VolumeControl
				v-model:masterVolume="soundStore.masterVolume"
				@update:masterVolume="soundStore.setVolume"
			/>
		</div>
	</div>
</template>
