<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';

const props = defineProps({
    icon: {
        required: true,
        type: String
    }
})
</script>

<template>
    <span class="p-1.5 rounded-md transition h-fit">
        <Icon :icon="props.icon" class="h-[1.2rem] w-[1.2rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-700 text-slate-200" />
    </span>
</template>