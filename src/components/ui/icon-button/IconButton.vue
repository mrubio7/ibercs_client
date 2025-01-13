<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';


const props = defineProps({
    url: {
        required: false,
        type: String,
    },
    icon: {
        required: true,
        type: String,
    },
    disabled: {
        required: false,
        type: Boolean,
    }
})

</script>

<template>
    <div v-if="disabled" class="flex">
        <a :href="`${props.url}`" target="_blank" class="p-1.5 rounded-md transition h-fit cursor-default">
            <Icon :icon="props.icon" class="h-[1.2rem] w-[1.2rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-700 text-slate-200" />
        </a>
    </div>
    <div v-else class="flex">
        <a :disbled="disabled" :href="`${props.url}`" target="_blank"  class="p-1.5 rounded-md transition h-fit dark:hover:bg-slate-800 hover:bg-slate-100 cursor-pointer">
            <Icon :icon="props.icon" class="h-[1.2rem] w-[1.2rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-300 text-slate-700" />
        </a>
    </div>
</template>