<script setup>
	const masterVolume = defineModel('masterVolume', {
		type: Number,
		default: 0.8,
	})

	const iconName = computed(() => {
		if (masterVolume.value > 0.6) return 'lucide:volume-2'
		if (masterVolume.value > 0) return 'lucide:volume-1'
		return 'lucide:volume-x'
	})

	const isMobile = computed(() =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
)
</script>

<template>
	<div
		class="flex flex-col items-center justify-center p-4 bg-[#23272e] rounded-xl w-full max-w-xl"
	>
		<div v-if="isMobile" class="mt-2 text-[#FFB300] text-sm font-mono text-center">
            Volume control is not available on mobile devices.
        </div>
		<USlider
			v-model="masterVolume"
			:min="0"
			:max="1"
			:step="0.01"
			:disabled="isMobile"
			class="w-full mt-4 hover:cursor-pointer"
			:ui="{
				base: 'group',
				track: 'h-5 bg-[#AAB1B8]/20 rounded-full',
				range: 'bg-[#50A4C2]',
				thumb:
					'bg-[#E0E5EB] ring-1 ring-[#E0E5EB]/80 size-5 transition-transform group-hover:scale-110',
			}"
		/>
		<div class="flex items-center justify-center mt-4 space-x-2">
			<div class="relative w-6 h-6">
				<Icon
					name="lucide:volume-2"
					v-show="iconName === 'lucide:volume-2'"
					size="24"
					class="text-[#50A4C2] absolute"
				/>
				<Icon
					name="lucide:volume-1"
					v-show="iconName === 'lucide:volume-1'"
					size="24"
					class="text-[#50A4C2] absolute"
				/>
				<Icon
					name="lucide:volume-x"
					v-show="iconName === 'lucide:volume-x'"
					size="24"
					class="text-[#50A4C2] absolute"
				/>
			</div>

			<span
				class="text-[#bfc9d1] font-mono text-lg select-none inline-block min-w-28 text-left"
			>
				Volume {{ Math.round(masterVolume * 100) }}
			</span>
		</div>
	</div>
</template>
