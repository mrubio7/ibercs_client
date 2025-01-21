<script setup lang="ts">
import IconButton from '@/components/ui/icon-button/IconButton.vue';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PLAYER_ROLES } from '@/libs/consts';
import { GetRoleIcon } from '@/libs/utils';
import { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array as PropType<string[]>,
    required: true
  },
  editable: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

// Convertimos el objeto en un array de roles
const allRoles = Object.values(PLAYER_ROLES);

/**
 * Manejador para (des)asignar roles.
 * Se evita mutar directamente el array original.
 */
function handleEditRole(role: string) {
  const currentRoles = props.modelValue;
  let newValue: string[] = [];

  if (currentRoles.includes(role)) {
    newValue = currentRoles.filter(r => r !== role);
  } else {
    newValue = [...currentRoles, role];
  }

  // Emitimos la actualización
  emit('update:modelValue', newValue);
}
</script>

<template>
  <div>
    <div class="flex justify-between">
      <div
        v-for="rol in allRoles"
        :key="rol"
        class="h-fit"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger class="flex items-center">
              <!-- Botón cuando es editable -->
              <IconButton
                v-if="editable"
                class="flex items-center"
                @click="handleEditRole(rol)"
                :class="`h-6 w-6 ${modelValue.includes(rol) ? 'opacity-100' : 'opacity-20'}`"
                :icon="`${GetRoleIcon(rol)}`"
              />
              <!-- Botón cuando NO es editable -->
              <IconButton
                v-else
                class="flex items-center"
                :class="`h-6 w-6 ${modelValue?.includes(rol) ? 'opacity-100' : 'opacity-20'}`"
                :icon="`${GetRoleIcon(rol)}`"
              />
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
