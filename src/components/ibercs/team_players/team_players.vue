<script setup lang="ts">
import Spinner from '@/components/ui/spinner/Spinner.vue';
import { PlayerModel } from '@/entities/players';
import { PropType } from 'vue';
import { Badge } from '@/components/ui/badge'
import { Icon } from '@iconify/vue'

const props = defineProps({
	players: {
		type: Array as PropType<PlayerModel[]>,
		required: true
	}
})
</script>

<template>
    <section v-if="props.players.length == 0">
        <Spinner />
    </section>
    <section v-else class="flex flex-col overflow-x-auto">
        <span class="text-lg font-bold mb-2">Jugadores</span>
        <div class="flex min-w-full min-h-60 space-x-4">
            <a v-for="p in players" 
                :href="`/player/${p.Nickname}`"
                :key="p.Nickname" 
                class="relative flex-shrink-0 flex flex-col justify-end dark:bg-slate-950 bg-slate-100 rounded-lg overflow-hidden w-52 border-2 mb-2 hover:dark:bg-slate-900 hover:bg-slate-100 transition" 
            >
                <div class="relative w-full h-full">
                    <img :src="p.Avatar" class="absolute w-full h-full object-cover" style="mask-image: linear-gradient(to top, transparent 30%, black);" />
                </div>
                <div class="flex flex-col items-start -mt-16 p-4">
                    <div class="flex justify-between w-full mb-4">
                        <span class="relative z-10 text-lg font-bold">{{ p.Nickname }}</span>
                        <span class="flex justify-end"><Badge>{{ p.FaceitElo }}</Badge></span>
                    </div>
                    <div class="flex flex-col w-full gap-4">
                        <div class="flex w-full ml-1">
                            <div class="flex w-1/2 flex-col justify-between gap-0">
                                <span class="text-sm font-semibold dark:text-slate-300 text-slate-800">KD: {{ p.Stats.KdRatio }}</span>
                            </div>
                            <div class="flex w-1/2 flex-col justify-between gap-0">
                                <span class="text-sm font-semibold dark:text-slate-300 text-slate-800">KD: {{ p.Stats.KdRatio }}</span>
                            </div>
                        </div>
                        <div class="flex w-full">
                            <div class="flex w-1/2 flex-col justify-between gap-0">
                                <span class="flex items-center text-sm font-semibold dark:text-slate-500 text-slate-500">
                                    <Icon icon="mynaui:letter-k-solid" class="h-5 w-5 transition-all dark:rotate-0 dark:scale-100" />
                                    {{ p.Stats.KillsAverage }}
                                </span>
                                <span class="flex items-center text-sm font-semibold dark:text-slate-500 text-slate-500">
                                    <Icon icon="mynaui:letter-d-solid" class="h-5 w-5 transition-all dark:rotate-0 dark:scale-100" />
                                    {{ p.Stats.DeathsAverage }}
                                </span>
                                <span class="flex items-center text-sm font-semibold dark:text-slate-500 text-slate-500">
                                    <Icon icon="mynaui:letter-a-solid" class="h-5 w-5 transition-all dark:rotate-0 dark:scale-100" />
                                    {{ p.Stats.AssistAverage }}
                                </span>
                            </div>
                            <div class="flex w-1/2 flex-col justify-between gap-0">
                                <span class="flex items-center text-sm font-semibold dark:text-slate-500 text-slate-500">
                                    <Icon icon="mdi:head-remove" class="h-4 w-4 transition-all dark:rotate-0 dark:scale-100 mr-1" />
                                    {{ p.Stats.HeadshotPercentAverage }}%
                                </span>
                                <span class="flex items-center text-sm font-semibold dark:text-slate-500 text-slate-500">
                                    <Icon icon="material-symbols:stars-outline" class="h-4 w-4 transition-all dark:rotate-0 dark:scale-100 mr-1" />
                                    {{ p.Stats.MVPAverage }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </section>
</template>
