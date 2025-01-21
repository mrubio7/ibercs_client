<script setup lang="ts">
import { DTO_UpdateFreeAgent } from '@/api/dto/request';
import { useVModel } from '@vueuse/core';
import { PropType, ref, watchEffect } from 'vue';
import FreeAgent_InGameRolesIcons from './FreeAgent_InGameRolesIcons.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import Switch from '@/components/ui/switch/Switch.vue';

const props = defineProps({
    modelValue: {
        required:true,
        type: Object as PropType<DTO_UpdateFreeAgent>,
    },
    horizontal: {
        required: false,
        type: Boolean,
    },
    editable: {
        type: Boolean
    },
    hidePublish: {
        type: Boolean
    }
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits)
</script>

<template>
    <div class="flex justify-between gap-4 w-full">
        <div class="flex gap-2 w-full" :class="props.horizontal ? 'flex-row' : 'flex-col'">
            <div class="px-2 flex justify-between items-center gap-4">
                <div class="pl-4 w-96">
                    <FreeAgent_InGameRolesIcons v-model="modelValue.InGameRoles" :editable="editable" class="lg:px-0 px-4"/>
                </div>
                <div v-if="!hidePublish" class="w-40 flex justify-end items-center gap-4">
                    <label class="text-sm text-slate-500 font-semibold">Publicado</label>
                    <Switch v-model:checked="modelValue.Publish" :disabled="!editable" />
                </div>
            </div>
            <div class="w-full flex flex-col items-end px-1">
                <Textarea v-model="modelValue.Description" maxlength="350" rows="7" :disabled="!editable"></Textarea>
                <label class="text-xs text-slate-500 mt-1">{{modelValue.Description.length}} / 350 carácteres</label>
            </div>
        </div>
    </div>
</template>