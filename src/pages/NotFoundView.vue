<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import { Button } from '@/components/ui/button'

document.title = "IBERCS - 404 :("
</script>

<template>
    <section id="notfound" class="flex justify-center items-center w-full h-full bg-slate-900">
        <div class="flex flex-col items-center gap-4 -mt-16">
            <Icon icon="tabler:error-404" class="h-[10rem] w-[10rem] scale-100 transition-all text-slate-800" />
            <div class="flex gap-4 p-2">
                <Icon icon="mdi:knife-military" class="h-[4rem] w-[4rem] scale-100 transition-all text-slate-500" />
                <Icon icon="mdi:pistol" class="h-[4rem] w-[4rem] scale-100 transition-all text-slate-500" />
            </div>
            <div class="flex flex-col items-center">
                <span class="text-2xl font-bold text-slate-300">¡Ups! Esta página ha decidido ir de eco.</span>
                <span class="text-2xl font-semibold text-slate-500 mt-2">Ahorra tus clics y vuelve en la próxima ronda.</span>
            </div>
            <a href="/" class="mt-2">
                <Button variant="secondary">Ir a la Home</Button>
            </a>
        </div>
    </section>
</template>

<style>
#notfound {
    height: 100vh !important;
}
</style>