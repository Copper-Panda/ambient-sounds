<script setup>
	const open = ref(false)
	function togglePopover() {
		open.value = !open.value
	}

	const emit = defineEmits(['timer-finished'])
	const remainingTimeSeconds = ref(0)
	const timerIntervalId = ref(null)
	const isTimerActive = ref(false)
	const selectedDurationHours = ref(0)
	const selectedDurationMinutes = ref(15)
	const selectedDurationSeconds = ref(0)
	const selectedDuration = computed(() => {
		return (
			selectedDurationHours.value * 3600 +
			selectedDurationMinutes.value * 60 +
			selectedDurationSeconds.value
		)
	})

	// 更新格式化时间显示，支持小时
	const formattedTime = computed(() => {
		if (remainingTimeSeconds.value <= 0) return '00:00:00'
		const hours = Math.floor(remainingTimeSeconds.value / 3600)
		const minutes = Math.floor((remainingTimeSeconds.value % 3600) / 60)
		const seconds = remainingTimeSeconds.value % 60
		return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
			2,
			'0',
		)}:${String(seconds).padStart(2, '0')}`
	})

	const clearTimer = () => {
		if (timerIntervalId.value) {
			clearInterval(timerIntervalId.value)
		}
		timerIntervalId.value = null
		remainingTimeSeconds.value = 0
		isTimerActive.value = false
	}

	const cancelTimer = () => {
		clearTimer()
	}

	const startTimer = () => {
		clearTimer()
		if (selectedDuration.value <= 0) return
		remainingTimeSeconds.value = selectedDuration.value
		isTimerActive.value = true
		timerIntervalId.value = setInterval(() => {
			remainingTimeSeconds.value -= 1
			if (remainingTimeSeconds.value <= 0) {
				clearTimer()
				emit('timer-finished')
			}
		}, 1000)
	}

	onBeforeUnmount(() => {
		clearTimer()
	})
</script>

<template>
	<UPopover v-model:open="open" :content="{
      align: 'end',
      side: 'bottom',
      sideOffset: 8
    }">
		<UButton
			:icon="isTimerActive ? undefined : 'ph:clock-countdown'"
			:label="isTimerActive ? formattedTime : 'CountDown'"
			variant="soft"
			size="md"
			:class="[
				'min-w-18 font-mono font-bold bg-[#21252C]/50 hover:bg-[#21252C]/70 hover:cursor-pointer',
				isTimerActive ? 'text-[#50A4C2]' : 'text-[#E0E5EB]',
			]"
		/>
		<template #content>
			<div
				class="min-h-50 min-w-80 bg-[#23272e] rounded-md border-0 ring-2 ring-[#23272e] flex flex-col p-5 items-center justify-center gap-4"
			>
				<span
					:class="[
						isTimerActive ? 'text-[#50A4C2]' : 'text-[#E0E5EB]',
						'text-3xl',
					]"
					>{{ formattedTime }}</span
				>
				<div class="flex gap-4 items-center justify-center">
					<div class="flex flex-col items-center">
						<p class="text-sm font-mono text-[#AAB1B8]">hours</p>
						<UInputNumber
							v-model="selectedDurationHours"
							:min="0"
							:max="23"
							label="Hours"
							:step="1"
							class="w-22 mt-2"
							:ui="{
								base: 'bg-[#1A1E26] text-[#E0E5EB] rounded-md focus-visible:ring-[#50A4C2]',
							}"
						>
							<template #increment="{disabled}">
								<Icon
									name="ph:plus"
									size="14"
									:class="[
										'cursor-pointer transition-colors m-1',
										disabled
											? 'text-gray-500 cursor-not-allowed'
											: 'text-[#AAB1B8] hover:text-[#E0E5EB]',
									]"
								/>
							</template>
							<template #decrement="{disabled}">
								<Icon
									name="ph:minus"
									size="14"
									:class="[
										'cursor-pointer transition-colors m-1',
										disabled
											? 'text-gray-500 cursor-not-allowed'
											: 'text-[#AAB1B8] hover:text-[#E0E5EB]',
									]"
								/>
							</template>
						</UInputNumber>
					</div>
					<div class="flex flex-col items-center">
						<p class="text-sm font-mono text-[#AAB1B8]">minutes</p>
						<UInputNumber
							v-model="selectedDurationMinutes"
							:min="0"
							:max="59"
							label="Minutes"
							:step="5"
							class="w-22 mt-2"
							:ui="{
								base: 'bg-[#1A1E26] text-[#E0E5EB] rounded-md focus-visible:ring-[#50A4C2]',
							}"
						>
							<template #increment="{disabled}">
								<Icon
									name="ph:plus"
									size="14"
									:class="[
										'cursor-pointer transition-colors m-1',
										disabled
											? 'text-gray-500 cursor-not-allowed'
											: 'text-[#AAB1B8] hover:text-[#E0E5EB]',
									]"
								/>
							</template>
							<template #decrement="{disabled}">
								<Icon
									name="ph:minus"
									size="14"
									:class="[
										'cursor-pointer transition-colors m-1',
										disabled
											? 'text-gray-500 cursor-not-allowed'
											: 'text-[#AAB1B8] hover:text-[#E0E5EB]',
									]"
								/>
							</template>
						</UInputNumber>
					</div>
					<div class="flex flex-col items-center">
						<p class="text-sm font-mono text-[#AAB1B8]">seconds</p>
						<UInputNumber
							v-model="selectedDurationSeconds"
							:min="0"
							:max="59"
							label="Seconds"
							:step="5"
							class="w-22 mt-2"
							:ui="{
								base: 'bg-[#1A1E26] text-[#E0E5EB] rounded-md focus-visible:ring-[#50A4C2]',
							}"
						>
							<template #increment="{disabled}">
								<Icon
									name="ph:plus"
									size="14"
									:class="[
										'cursor-pointer transition-colors m-1',
										disabled
											? 'text-gray-500 cursor-not-allowed'
											: 'text-[#AAB1B8] hover:text-[#E0E5EB]',
									]"
								/>
							</template>
							<template #decrement="{disabled}">
								<Icon
									name="ph:minus"
									size="14"
									:class="[
										'cursor-pointer transition-colors m-1',
										disabled
											? 'text-gray-500 cursor-not-allowed'
											: 'text-[#AAB1B8] hover:text-[#E0E5EB]',
									]"
								/>
							</template>
						</UInputNumber>
					</div>
				</div>
				<div class="flex flex-row">
					<div class="mx-4">
						<Icon
							name="gridicons:play"
							size="36"
							:class="[
								'text-[#50A4C2] cursor-pointer',
								isTimerActive
									? 'text-[#AAB1B8] cursor-not-allowed pointer-events-none'
									: 'text-[#50A4C2]',
							]"
							@click="startTimer"
						/>
					</div>
					<div class="mx-4">
						<Icon
							name="gridicons:pause"
							size="36"
							:class="[
								'text-[#50A4C2] cursor-pointer',
								isTimerActive
									? 'text-[#50A4C2]'
									: 'text-[#AAB1B8] cursor-not-allowed pointer-events-none',
							]"
							@click="cancelTimer"
						/>
					</div>
				</div>
			</div>
		</template>
	</UPopover>
</template>
