<script setup lang="ts">
import { PlayerStats } from '@/entities/players';
import { PropType } from 'vue';

const props = defineProps({
    stats: {
        required: true,
        type: Object as PropType<PlayerStats>
    }
})
</script>

<template>
    <div class="w-2/12 flex flex-col justify-center items-center">
        <span class="text-xs text-slate-500">KD</span>
        <span class="text-xs dark:text-slate-300 text-slate-700">{{ props.stats.KdRatio }}</span>
    </div>
    <div class="w-2/12 flex flex-col justify-center items-center">
        <span class="text-xs text-slate-500">KR</span>
        <span class="text-xs dark:text-slate-300 text-slate-700">{{ props.stats.KrRatio }}</span>
    </div>
    <div class="w-2/12 flex flex-col justify-center items-center">
        <span class="text-xs text-slate-500">% Headshot</span>
        <span class="text-xs dark:text-slate-300 text-slate-700">{{ props.stats.HeadshotPercentAverage }}</span>
    </div>
    <div class="w-2/12 flex flex-col justify-center items-center">
        <span class="text-xs text-slate-500">Kills</span>
        <span class="text-xs dark:text-slate-300 text-slate-700">{{ props.stats.KillsAverage }}</span>
    </div>
    <div class="w-2/12 flex flex-col justify-center items-center">
        <span class="text-xs text-slate-500">Deaths</span>
        <span class="text-xs dark:text-slate-300 text-slate-700">{{ props.stats.DeathsAverage }}</span>
    </div>
    <div class="w-2/12 flex flex-col justify-center items-center">
        <span class="text-xs text-slate-500">Assists</span>
        <span class="text-xs dark:text-slate-300 text-slate-700">{{ props.stats.AssistAverage }}</span>
    </div>
    <div class="w-2/12 flex flex-col justify-center items-center">
        <span class="text-xs text-slate-500">MVPs</span>
        <span class="text-xs dark:text-slate-300 text-slate-700">{{ props.stats.MVPAverage }}</span>
    </div>
</template>