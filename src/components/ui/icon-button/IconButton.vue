<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import { watchEffect } from 'vue';


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
    },
    size: {
        required: false,
        type: String
    },
    handler: {
        required: false,
        type: Function
    }
})

var size = "1.2rem";

watchEffect(() => {
    switch (props.size!) {
        case "sm":
            size = "0.85rem";
            return
        case "md":
            size = "1.2rem"
            return
        case "lg":
            size = "1.8rem"
            return
        default:
            size = "1.2rem"
            return 
    }
})

</script>

<template>
    <div v-if="props.url">
        <div v-if="disabled" class="flex">
            <a :href="`${props.url}`" target="_blank" class="p-1.5 rounded-md transition h-fit cursor-default">
                <Icon @click="props.handler ? props.handler : ''" :icon="props.icon" :class="`h-[${size}] w-[${size}] scale-0 transition-all rotate-0 scale-100 dark:text-slate-700 text-slate-200`" />
            </a>
        </div>
        <div v-else class="flex">
            <a :disbled="disabled" :href="`${props.url}`" target="_blank"  class="p-1.5 rounded-md transition h-fit dark:hover:bg-slate-800 hover:bg-slate-100 cursor-pointer">
                <Icon @click="props.handler ? props.handler : ''" :icon="props.icon" :class="`h-[${size}] w-[${size}] scale-0 transition-all rotate-0 scale-100 dark:text-slate-300 text-slate-700`" />
            </a>
        </div>
    </div>
    <div v-else>
        <div v-if="disabled" class="flex">
            <a target="_blank" class="p-1.5 rounded-md transition h-fit cursor-default">
                <Icon @click="props.handler ? props.handler : ''" :icon="props.icon" :class="`h-[${size}] w-[${size}] scale-0 transition-all rotate-0 scale-100 dark:text-slate-700 text-slate-200`" />
            </a>
        </div>
        <div v-else class="flex">
            <a :disbled="disabled" target="_blank"  class="p-1.5 rounded-md transition h-fit dark:hover:bg-slate-800 hover:bg-slate-100 cursor-pointer">
                <Icon @click="props.handler ? props.handler : ''" :icon="props.icon" :class="`h-[${size}] w-[${size}] scale-0 transition-all rotate-0 scale-100 dark:text-slate-300 text-slate-700`" />
            </a>
        </div>
    </div>
</template>