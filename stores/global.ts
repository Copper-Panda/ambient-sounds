import {defineStore} from 'pinia'
import {ref, reactive} from 'vue'

export const useSoundStore = defineStore('sound', () => {
	const sounds = reactive([
		{name: 'rain', src: '/sounds/rain.mp3', dom: null, isPlaying: false, iconName:'bi:cloud-rain'},
		{name: 'thunder', src: '/sounds/thunder.mp3', dom: null, isPlaying: false, iconName:'gravity-ui:thunderbolt'},
		{name: 'stream', src: '/sounds/stream.mp3', dom: null, isPlaying: false, iconName:'fluent:stream-20-filled'},
		{name: 'waves', src: '/sounds/waves.mp3', dom: null, isPlaying: false, iconName:'material-symbols:waves'},
		{name: 'night', src: '/sounds/night.mp3', dom: null, isPlaying: false, iconName:'material-symbols:moon-stars-outline'},
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
