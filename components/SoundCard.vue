<script setup>
const props = defineProps({
  sound: Object
})
const emit = defineEmits(['togglePlay'])
const togglePlaying = () => {
  emit('togglePlay', props.sound)
}
</script>

<template>
  <div
    @click="togglePlaying"
    :class="[
      'h-28 w-48 rounded-lg cursor-pointer flex flex-col items-center justify-center transition-colors duration-300',
      sound.isPlaying
        ? 'bg-[#21252C]/80 hover:bg-[#21252C]/90'
        : 'bg-[#21252C]/50 hover:bg-[#21252C]/70'
    ]"
  >
    <Icon
      :name="sound.iconName"
      size="36"
      :class="[
        'transition-colors duration-300',
        sound.isPlaying ? 'text-[#50A4C2]' : 'text-[#E0E5EB]',
      ]"
    />
    <span
      :class="[
        'transition-colors duration-300 font-sans font-bold',
        sound.isPlaying ? 'text-[#50A4C2]' : 'text-[#E0E5EB]'
      ]"
    >
      {{ sound.name }}
    </span>
  </div>
</template>
