import {defineStore} from 'pinia'
import {ref, reactive} from 'vue'

export const useSoundStore = defineStore('sound', () => {
	const sounds = reactive([
		{name: 'rain', src: '/sounds/rain.wav', dom: null, isPlaying: false},
		{name: 'chwe', src: '/sounds/chew.wav', dom: null, isPlaying: false},
		{name: 'mew', src: '/sounds/mew.wav', dom: null, isPlaying: false},
		{name: 'thunder', src: '/sounds/thunder.wav', dom: null, isPlaying: false},
		{name: 'test', src: '/sounds/test.wav', dom: null, isPlaying: false},
	])
	const masterVolume = ref(0.8)
	const timerActive = ref(false) // 定时器是否激活
	const timerSeconds = ref(0) // 剩余秒数

	function setDom(name, dom) {
		const sound = sounds.find((s) => s.name === name)
		if (sound) sound.dom = dom
	}

	function togglePlay(currentSound) {
		if (!currentSound.dom) return
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
				.catch(() => {
					currentSound.isPlaying = false
				})
		} else {
			audioRef.pause()
			audioRef.currentTime = 0
			currentSound.isPlaying = false
		}
	}

	function stopAll() {
		sounds.forEach((sound) => {
			if (sound.dom) {
				sound.dom.pause()
				sound.dom.currentTime = 0
			}
			sound.isPlaying = false
		})
	}

	function setVolume(val) {
		masterVolume.value = val
		sounds.forEach((sound) => {
			if (sound.dom) sound.dom.volume = val
		})
	}

	// 定时器结束时调用
	function handleTimerFinished() {
		console.log('Timer finished: Stopping all sounds.')
		stopAll()
		timerActive.value = false
		timerSeconds.value = 0
	}

	return {
		sounds,
		masterVolume,
		setDom,
		togglePlay,
		stopAll,
		setVolume,
		// timer相关
		timerActive,
		timerSeconds,
		handleTimerFinished,
	}
})
