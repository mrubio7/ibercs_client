<script setup lang="ts">
import { EseaStanding } from '@/entities/esea';
import { PropType } from 'vue';

const props = defineProps({
    standing: {
        type: Object as PropType<EseaStanding>,
    },
})

</script>
<template>
    <div v-if="props.standing != null" class="flex items-center gap-6">
        <div class="flex gap-1 font-semibold dark:text-slate-300 text-slate-600 lg:text-md text-sm">
            <span>
                {{ props.standing.MatchesPlayed }}
            </span>
            <span>
                Partidos
            </span>
        </div>
        <div class="flex gap-1 font-semibold dark:text-slate-300 text-slate-600 lg:text-md text-sm">
            <span>
                {{ props.standing.MatchesWon }} 
            </span>
            <span>
                Victorias
            </span>
        </div>
        <div class="flex gap-1 font-semibold dark:text-slate-300 text-slate-600 lg:text-md text-sm">
            <span>
                {{ props.standing.RankStart == props.standing.RankEnd ? `${props.standing.RankStart}º`: `${props.standing.RankStart}º-${props.standing.RankEnd}º` }}  
            </span>
        </div>      
    </div>
    <div v-else class="w-full text-nowrap">
        No clasificado
    </div>
</template>