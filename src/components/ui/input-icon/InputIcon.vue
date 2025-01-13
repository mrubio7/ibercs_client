<script setup lang="ts">
import { HTMLAttributes } from 'vue';
import Input from '../input/Input.vue';
import { useVModel } from '@vueuse/core';
import { cn } from '@/libs/utils';
import Icon from '../icon/icon.vue';
import { MagnifyingGlassIcon } from '@radix-icons/vue';

const props = defineProps<{
  modelValue?: string | number
  class?: HTMLAttributes['class']
  icon: string
  placeholder: string,
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
})
</script>

<template>
    <div class="relative w-full max-w-sm items-center">
        <Input v-model="modelValue" id="search" type="text" :placeholder="props.placeholder" class="pl-10" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-1.5">
            <Icon :icon="props.icon" class="h-[1.2rem] w-[1.2rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-700 text-slate-200" />
        </span>
    </div>
</template>