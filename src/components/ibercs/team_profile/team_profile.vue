<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { PropType } from 'vue';
import { TeamsModel } from '@/entities/teams';

const props = defineProps({
	team: {
		type: Object as PropType<TeamsModel>,
		required: true
	},
    withHeader: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <div class="flex gap-6">
        <img v-if="props.withHeader" :src="props.team.Avatar" width="auto" class="border-2 rounded-md min-h-20 min-w-20 w-80 object-cover"/>
        <div class="w-full flex flex-col justify-between">
            <div v-if="props.withHeader" class="flex justify-between">
                <div  class="flex flex-col gap-4 items-start">
                    <span class="text-4xl font-bold dark:text-slate-400 text-slate-700">{{ props.team.Name }}</span>
                    <span class="text-xl font-bold dark:text-slate-400  text-slate-700">{{ props.team.Nickname }}</span>
                </div>
                <div class="flex gap-4 items-start">
                    <a v-if="props.team.Website != undefined" :href="props.team.Website" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition">
                        <Icon icon="mdi:web" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
                    </a>
                    <a v-if="props.team.Instagram !== undefined" :href="props.team.Instagram" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition">
                        <Icon icon="radix-icons:instagram-logo" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
                    </a>
                    <a v-if="props.team.Twitter != undefined" :href="props.team.Twitter" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition">
                        <Icon icon="ri:twitter-x-line" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
                    </a>
                </div>
            </div>
            <div class="flex xl:flex-row flex-col xl:gap-6 gap-2 justify-start" :class="`${props.withHeader ? 'justify-end':'justify-center'}`">
                
                <div class="flex flex-col items-center border rounded-sm xl:p-4 p-2 bg-slate-100 dark:bg-slate-800">
                    <span class="text-2xl font-bold">{{ props.team.Stats?.TotalMatches }}</span>
                    <span class="font-semibold">Partidos</span>
                </div>
                <div class="flex flex-col items-center border rounded-sm xl:p-4 p-2 bg-slate-100 dark:bg-slate-800">
                    <span class="text-2xl font-bold">{{ props.team.Stats?.Wins }}</span>
                    <span class="font-semibold">Victorias</span>
                </div>
                <div class="flex flex-col items-center justify-center border rounded-sm xl:p-6 p-4 bg-slate-100 dark:bg-slate-800">
                    <span class="text-2xl font-bold -mt-1">{{ props.team.Stats?.Winrate }}%</span>
                </div>
            </div>
        </div>
    </div>
    <section>
        <div class="pt-2">
            <span class="text-lg font-bold mb-2">Estadisticas por mapas</span>
            <section class="flex items-center gap-4 w-full justify-between overflow-x-auto py-2">
                <div v-for="map in props.team.Stats?.MapStats" class="relative min-h-24">
                    <div class="border border-slate-700 rounded overflow-hidden transition relative">
                    <img :src="`/maps/${map.MapName}.jpeg`" width="130" class="object-cover h-24 min-w-28" />
                    <div class="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
                        <span class="text-md font-semibold text-slate-300">{{ map.Matches }} Partidos</span>
                        <span class="text-md font-semibold text-slate-200 -mt-1">{{ map.Winrate > 0 ? map.Winrate : 0 }}% Victorias</span>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>