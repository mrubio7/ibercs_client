<script setup lang="ts">
const props = defineProps({
  size: {
    type: String,
    required: false,
  }
})
</script>

<template>
  <div class="flex justify-center items-center">
    <div v-if="!props.size" :class="`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-slate-500`"></div>
    <div v-if="props.size" :class="`animate-spin rounded-full h-${props.size} w-${props.size} border-t-2 border-b-2 border-slate-500`"></div>
  </div>
</template>
