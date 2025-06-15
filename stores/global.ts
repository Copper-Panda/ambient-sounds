import {defineStore} from 'pinia'

export const useSoundStore = defineStore('sound', () => {
	let audioContext = null
	let masterGainNode = null

	function initAudioContext() {
		if (!audioContext) {
			audioContext = new (window.AudioContext || window.webkitAudioContext)()
			masterGainNode = audioContext.createGain()
			masterGainNode.connect(audioContext.destination)
			masterGainNode.gain.value = masterVolume.value
			console.log('AudioContext initialized.')
		}
	}

	const sounds = reactive([
		{
			name: 'rain',
			src: '/sounds/rain.wav',
			buffer: null,
			sourceNode: null,
			gainNode: null,
			isPlaying: false,
			iconName: 'solar:cloud-rain-linear',
		},
		{
			name: 'chwe',
			src: '/sounds/chew.wav',
			buffer: null,
			sourceNode: null,
			gainNode: null,
			isPlaying: false,
			iconName: 'solar:cloud-rain-linear',
		},
		{
			name: 'mew',
			src: '/sounds/mew.wav',
			buffer: null,
			sourceNode: null,
			gainNode: null,
			isPlaying: false,
			iconName: 'solar:cloud-rain-linear',
		},
		{
			name: 'thunder',
			src: '/sounds/thunder.wav',
			buffer: null,
			sourceNode: null,
			gainNode: null,
			isPlaying: false,
			iconName: 'solar:cloud-rain-linear',
		},
		{
			name: 'WhiteNoise',
			src: '/sounds/whiteNoise.wav',
			buffer: null,
			sourceNode: null,
			gainNode: null,
			isPlaying: false,
			iconName: 'solar:cloud-rain-linear',
		},
	])

	const masterVolume = ref(0.8)
	const timerActive = ref(false)
	const timerSeconds = ref(0)

	watch(masterVolume, (newVal) => {
		if (masterGainNode) {
			masterGainNode.gain.value = newVal
		}
	})

	async function loadAudioFile(sound) {
		if (sound.buffer) {
			console.log(`${sound.name} already loaded.`)
			return
		}

		initAudioContext()

		try {
			const response = await fetch(sound.src)
			const arrayBuffer = await response.arrayBuffer()
			sound.buffer = await audioContext.decodeAudioData(arrayBuffer)
			console.log(`${sound.name} loaded and decoded.`)
		} catch (error) {
			console.error(`Error loading or decoding ${sound.name}:`, error)
		}
	}

	async function togglePlay(currentSound) {
		initAudioContext()

		if (currentSound.isPlaying) {
			if (currentSound.sourceNode) {
				currentSound.sourceNode.stop()
				currentSound.sourceNode.disconnect()
			}
			if (currentSound.gainNode) {
				currentSound.gainNode.disconnect()
				currentSound.gainNode = null
			}
			currentSound.isPlaying = false
		} else {
			if (!currentSound.buffer) {
				console.log(`Loading ${currentSound.name} first...`)
				await loadAudioFile(currentSound)
				if (!currentSound.buffer) {
					console.error(`Failed to load ${currentSound.name}. Cannot play.`)
					return
				}
			}

			sounds.forEach((sound) => {
				if (sound !== currentSound && sound.isPlaying) {
					if (sound.sourceNode) {
						sound.sourceNode.stop()
						sound.sourceNode.disconnect()
						sound.sourceNode = null
					}
					if (sound.gainNode) {
						sound.gainNode.disconnect()
						sound.gainNode = null
					}
					sound.isPlaying = false
				}
			})

			currentSound.sourceNode = audioContext.createBufferSource()
			currentSound.sourceNode.buffer = currentSound.buffer

			currentSound.gainNode = audioContext.createGain()
			currentSound.gainNode.gain.value = 1

			currentSound.sourceNode.connect(currentSound.gainNode)
			currentSound.gainNode.connect(masterGainNode)

			currentSound.sourceNode.loop = true

			currentSound.sourceNode.start(0)
			currentSound.isPlaying = true
			console.log(`Playing ${currentSound.name}.`)

			if (audioContext.state === 'suspended') {
				audioContext.resume().then(() => {
					console.log('AudioContext resumed successfully.')
				})
			}
		}
	}

	function stopAll() {
		sounds.forEach((sound) => {
			if (sound.isPlaying && sound.sourceNode) {
				sound.sourceNode.stop()
				sound.sourceNode.disconnect()
				sound.sourceNode = null
			}
			if (sound.gainNode) {
				sound.gainNode.disconnect()
				sound.gainNode = null
			}
			sound.isPlaying = false
		})
		console.log('All sounds stopped.')
	}

	function setVolume(val) {
		masterVolume.value = val
	}

	function handleTimerFinished() {
		console.log('Timer finished: Stopping all sounds.')
		stopAll()
		timerActive.value = false
		timerSeconds.value = 0
	}

	return {
		sounds,
		masterVolume,
		togglePlay,
		stopAll,
		setVolume,
		timerActive,
		timerSeconds,
		handleTimerFinished,
	}
})
