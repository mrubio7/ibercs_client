<script setup lang="ts">
import Spinner from '@/components/ui/spinner/Spinner.vue'
</script>

<template>
    <div class="flex flex-col justify-center items-center gap-2">
        <span class="text-lg font-semibold text-slate-500">Cargando...</span>
        <Spinner />
    </div>
</template>