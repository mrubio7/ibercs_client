<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/libs/utils'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { PropType, ref, watch } from 'vue'

const props = defineProps({
  options: {
    type: Array as PropType<{ value: string; label: string }[]>,
    required: true,
  },
  modelValue: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: "Selecciona una opción"
  },
  searchPlaceholder: {
    type: String,
    default: "Buscar..."
  }
})

// Emitimos el evento convencional para modelos en Vue:
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// Maneja si el Popover está abierto/cerrado
const open = ref(false)

// Guarda el valor seleccionado (interno)
const selectedValue = ref(props.modelValue)

// Guarda el texto de búsqueda
const search = ref('')

// Si desde fuera cambia la prop modelValue, actualizamos selectedValue
watch(
  () => props.modelValue,
  (newVal) => {
    selectedValue.value = newVal
  }
)

// Cada vez que cambie selectedValue, emitimos hacia el padre
watch(selectedValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between"
      >
        <!-- Mostramos el label según el valor seleccionado, o el placeholder si no hay nada -->
        {{
          selectedValue
            ? options.find(option => option.value === selectedValue)?.label
            : placeholder
        }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-full p-0">
      <!-- Usamos :value para el texto de búsqueda,
           y @input para actualizar esa variable local. -->
      <Command :value="search" @input="search = $event">
        <CommandInput :placeholder="searchPlaceholder" />
        <CommandEmpty>No encontrado</CommandEmpty>

        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.label"
              @select="() => {
                selectedValue = option.value
                open = false
              }"
            >
              <Check
                :class="cn(
                  'mr-2 h-4 w-4',
                  selectedValue === option.value ? 'opacity-100' : 'opacity-0',
                )"
              />
              {{ option.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
