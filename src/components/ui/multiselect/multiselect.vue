<script setup lang="ts">
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PropType, ref, watchEffect } from 'vue';
import { cn } from '@/libs/utils';
import Button from '../button/Button.vue';
import Badge from '../badge/Badge.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';

const props = defineProps({
	width: {
		type: String,
		default: '300',
	},
	placeholder: {
		type: String,
		required: true,
	},
	options: {
		type: Array as PropType<{ value: string; label: string }[]>,
		required: true,
	},
	modelValue: {
		type: Array as PropType<string[]>,
		default: () => []
	},
	bgColor: {
		type: String,
		default: ''
	}
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const open = ref(false);
const selectedValues = ref<string[]>([]);

// Synchronize selectedValues with modelValue from the parent
watchEffect(() => {
	selectedValues.value = props.modelValue;
});

const toggleSelection = (frameworkValue: string) => {
	const index = selectedValues.value.indexOf(frameworkValue);
	if (index === -1) {
		// Add to selection if not already selected
		selectedValues.value.push(frameworkValue);
	} else {
		// Remove from selection if already selected
		selectedValues.value.splice(index, 1);
	}
	emit('update:modelValue', selectedValues.value);
};

</script>

<template>
	<Popover v-model:open="open">
		<PopoverTrigger as-child>
			<Button
				variant="ghost"
				role="combobox"
				:aria-expanded="open"
				:class="`w-full justify-between border rounded`"
			>
				<div class="flex gap-1 items-center flex-wrap" :class="`w-full ${selectedValues.length > 0 ? '-ml-3' : ''}`">
					<template v-if="selectedValues.length">
						<Badge variant="secondary" class="p-1 px-2 " v-for="rol in selectedValues" :key="rol">{{ options.find(f => f.value === rol)?.label }}</Badge>
					</template>
					<span v-if="!selectedValues.length">{{ props.placeholder }}</span>
				</div>
				<Icon :icon="open ? 'ic:round-expand-less' : 'ic:round-expand-more'" class="h-6 w-6 text-slate-500" />
			</Button>
		</PopoverTrigger>
		<PopoverContent :class="`w-[${props.width}px] p-0`">
			<Command>
				<CommandInput class="h-9" :placeholder="props.placeholder" />
				<CommandEmpty>Ningun rol encontrado.</CommandEmpty>
				<CommandList>
					<CommandGroup class="flex flex-col gap-1">
						<CommandItem
							v-for="opt in options"
							:key="opt.value"
							:value="opt.value"
							@select="() => {
								toggleSelection(opt.value);
							}"
							:class="{
								'': selectedValues.includes(opt.value),
								'hover:bg-slate-50': true,
							}"
						>
							{{ opt.label }}
							<Icon
								icon="heroicons-solid:check"
								:class="cn(
									'ml-auto h-4 w-4',
									selectedValues.includes(opt.value) ? 'opacity-100' : 'opacity-0',
								)"
							/>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
</template>
