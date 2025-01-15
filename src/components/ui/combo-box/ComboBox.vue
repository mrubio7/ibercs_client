<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/libs/utils'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { PropType, ref, watchEffect } from 'vue'

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
        type: String
    },
    searchPlaceholder: {
        type: String
    }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const open = ref(false)
const value = ref('')

watchEffect(() => {
    emit('update:modelValue', value.value);
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
        {{ value ? options.find((option) => option.value === value)?.label : props.placeholder }}

        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0">
      <Command v-model="value">
        <CommandInput :placeholder="props.searchPlaceholder" />
        <CommandEmpty>No encontrado</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="open = false"
            >
              <Check
                :class="cn(
                  'mr-2 h-4 w-4',
                  value === option.value ? 'opacity-100' : 'opacity-0',
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