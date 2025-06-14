<script setup>
	import {ref, onMounted} from 'vue'
	import {useSoundStore} from '~/stores/global'
	import VolumeControl from '~/components/VolumeControl.vue'

	const soundStore = useSoundStore()

	const rainAudioRef = ref(null)
	const chweAudioRef = ref(null)
	const mewAudioRef = ref(null)
	const thunderAudioRef = ref(null)
	const testAudioRef = ref(null)

	onMounted(() => {
		soundStore.setDom('rain', rainAudioRef.value)
		soundStore.setDom('chwe', chweAudioRef.value)
		soundStore.setDom('mew', mewAudioRef.value)
		soundStore.setDom('thunder', thunderAudioRef.value)
		soundStore.setDom('test', testAudioRef.value)
		soundStore.setVolume(soundStore.masterVolume)
	})
</script>

<template>
	<div>
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
				ref="testAudioRef"
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
		<div class="flex justify-center mt-8">
			<VolumeControl
				v-model:masterVolume="soundStore.masterVolume"
				@update:masterVolume="soundStore.setVolume"
			/>
		</div>
	</div>
</template>
