<script setup lang="ts">
import Spinner from '@/components/ui/spinner/Spinner.vue'

const props = defineProps({
    horizontal: {
        required: false,
        type: Boolean
    }
})
</script>

<template>
    <div class="flex justify-center items-center gap-2" :class="props.horizontal ? 'flex-row-reverse gap-4' : 'flex-col'">
        <span class="text-lg font-semibold text-slate-500">Cargando...</span>
        <Spinner />
    </div>
</template>