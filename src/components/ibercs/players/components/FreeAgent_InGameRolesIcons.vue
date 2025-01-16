<script setup lang="ts">
import IconButton from '@/components/ui/icon-button/IconButton.vue';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PLAYER_ROLES } from '@/libs/consts';
import { GetRoleIcon } from '@/libs/utils';
import { useVModel } from '@vueuse/core';
import { PropType } from 'vue';

const props = defineProps({
    modelValue: {
        required: true,
        type: Array as PropType<string[]>
    },
    editable: {
        required: false,
        type: Boolean,
        default: false
    }
});

const allRoles = Object.entries(PLAYER_ROLES).map(([_, value]) => value);

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string[]): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits);

const handleEditRole = (role: string) => {
    const currentRoles = Array.isArray(modelValue.value) ? modelValue.value : [];

    if (currentRoles.includes(role)) {
        modelValue.value.splice(modelValue.value.indexOf(role), 1);
    } else {
        modelValue.value.push(role);
    }

    emits('update:modelValue', modelValue.value);
};
</script>

<template>
    <div v-if="modelValue">
        <div class="flex justify-between mt-1.5">
            <div v-for="rol in allRoles" :key="rol" class="h-fit">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <IconButton v-if="editable" @click="handleEditRole(rol)" :class="`h-6 w-6 ${modelValue?.includes(rol) ? 'opacity-100' : 'opacity-20'}`" :icon="`${GetRoleIcon(rol)}`"/>
                            <IconButton v-else :class="`h-6 w-6 ${modelValue?.includes(rol) ? 'opacity-100' : 'opacity-20'}`" :icon="`${GetRoleIcon(rol)}`"/>

                        </TooltipTrigger>
                        <TooltipContent class="ml-1.5">
                            <p>{{ rol }}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    </div>
</template>
