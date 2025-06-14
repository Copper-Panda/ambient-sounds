<script setup>
	import {ref, reactive, onMounted, watch} from 'vue'
	import VolumeControl from '~/components/VolumeControl.vue'
	import CountDown from '~/components/CountDown.vue'

	const sounds = reactive([
		{name: 'rain', src: '/sounds/rain.wav', dom: null, isPlaying: false},
		{name: 'chwe', src: '/sounds/chew.wav', dom: null, isPlaying: false},
		{name: 'mew', src: '/sounds/mew.wav', dom: null, isPlaying: false},
		{name: 'thunder', src: '/sounds/thunder.wav', dom: null, isPlaying: false},
		{name: 'test', src: '/sounds/test.wav', dom: null, isPlaying: false},
	])

	const rainAudioRef = ref(null)
	const chweAudioRef = ref(null)
	const mewAudioRef = ref(null)
	const thunderAudioRef = ref(null)
	const testAudioRef = ref(null)

	const masterVolume = ref(0.8)
	const countDownRef = ref(null)

	onMounted(() => {
		sounds.find((sound) => sound.name === 'rain').dom = rainAudioRef.value
		sounds.find((sound) => sound.name === 'chwe').dom = chweAudioRef.value
		sounds.find((sound) => sound.name === 'mew').dom = mewAudioRef.value
		sounds.find((sound) => sound.name === 'thunder').dom = thunderAudioRef.value
		sounds.find((sound) => sound.name === 'test').dom = testAudioRef.value

		sounds.forEach((sound) => {
			if (sound.dom) {
				sound.dom.volume = masterVolume.value
			}
		})
	})

	// 监听音量变化
	watch(masterVolume, (val) => {
		sounds.forEach((sound) => {
			if (sound.dom) sound.dom.volume = val
		})
	})

	const togglePlay = (currentSound) => {
		if (!currentSound.dom) {
			console.error(`Audio reference for '${currentSound.name}' is not set`)
			return
		}
		const audioRef = currentSound.dom

		if (audioRef.paused) {
			sounds.forEach((sound) => {
				if (sound !== currentSound && sound.dom) {
					sound.dom.pause()
					sound.dom.currentTime = 0
					sound.isPlaying = false
				}
			})
			audioRef.currentTime = 0
			audioRef
				.play()
				.then(() => {
					currentSound.isPlaying = true
				})
				.catch((e) => {
					console.error(`Error playing ${currentSound.name} audio:`, e)
					currentSound.isPlaying = false
				})
		} else {
			audioRef.pause()
			audioRef.currentTime = 0
			currentSound.isPlaying = false
		}
	}

	// 停止全部播放
	function stopAll() {
		sounds.forEach((sound) => {
			if (sound.dom) {
				sound.dom.pause()
				sound.dom.currentTime = 0
			}
			sound.isPlaying = false
		})
	}
</script>

<template>
	<div>
		<div class="flex flex-row justify-center">
			<audio ref="rainAudioRef" :src="sounds[0].src" preload="auto" loop />
			<audio ref="chweAudioRef" :src="sounds[1].src" preload="auto" loop />
			<audio ref="mewAudioRef" :src="sounds[2].src" preload="auto" loop />
			<audio ref="thunderAudioRef" :src="sounds[3].src" preload="auto" loop />
			<audio ref="testAudioRef" :src="sounds[4].src" preload="auto" loop />
			<SoundCard
				v-for="sound in sounds"
				:key="sound.name"
				:sound="sound"
				@togglePlay="togglePlay"
				class="mx-2"
			/>
		</div>
		<div class="flex justify-center mt-8">
			<VolumeControl v-model:masterVolume="masterVolume" />
		</div>
	</div>
</template>
