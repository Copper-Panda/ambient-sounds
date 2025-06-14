<script setup>
const masterVolume = defineModel('masterVolume', {
  type: Number,
  default: 0.8
});
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4 bg-[#23272e] rounded-xl w-full max-w-xl">
    <USlider
      v-model="masterVolume"
      :min="0"
      :max="1"
      :step="0.01"
      class="w-full mt-4 cursor-pointer"
      label="Master Volume"
      color="primary"
    />
    <span class="mt-2 text-[#bfc9d1] font-mono text-lg select-none">{{ Math.round(masterVolume * 100) }}</span>
  </div>
</template>