<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
// import Badge from '@/components/ui/badge/Badge.vue';
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue';
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue';
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue';
import { PlayerModel } from '@/entities/players';
import { TeamsModel } from '@/entities/teams';
// import { GetTournamentColor } from '@/libs/utils';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { PropType, ref, watchEffect } from 'vue';

const props = defineProps({
	player: {
		type: Object as PropType<PlayerModel>,
		required: true
	},
    withAvatar: {
        type: Boolean,
        required: true
    }
})

const teams = ref([] as TeamsModel[])

watchEffect( async () => {
    if (props.player) {
        const res = await ApiBackend.Teams.FindTeamByPlayerId(props.player?.FaceitId)
        if (res.error == null) {
            teams.value = res.data.teams as TeamsModel[]
        }
    }
})
</script>

<template>
    <section>
        <div class="flex justify-between gap-4">
            <div v-if="!props.player?.FaceitElo" class="w-full">
                <div class="flex justify-center w-full mt-10 mb-4">
                    <span class="text-lg font-semibold text-slate-500">No hay estadisticas que mostrar</span>
                </div>
            </div>
            <div v-else class="flex flex-col gap-4 w-full justify-between">
                <div class="w-full">                
                    <div v-if="withAvatar" class="flex">
                        <div>
                            <img :src="props.player.Avatar" width="200" class="rounded-md border-2" />
                        </div>
                        <div class="flex w-full justify-between">
                            <span class="pl-6 text-3xl font-semibold dark:text-slate-200 text-slate-800 mb-4">{{ props.player.Nickname }}</span>
                            <a :href="`https://www.faceit.com/es/players/${props.player.Nickname}`" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition cursor-pointer h-fit">
                                <Icon icon="cib:faceit" class="h-[1.2rem] w-[1.2rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-full justify-around h-full">
                    <div class="flex w-full justify-between h-min lg:flex-row flex-col gap-4">
                        <div class="flex gap-4 w-full lg:justify-start justify-center">
                            <div class="bg-yellow-700 rounded-md p-2">
                                <span class="flex flex-col items-center text-md font-semibold dark:text-slate-100 text-slate-100">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger class="flex">
                                                <Icon icon="game-icons:rank-3" class="h-12 w-12 transition-all dark:rotate-0 dark:scale-100" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Elo</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {{ props.player.FaceitElo }}
                                </span>
                            </div>
                        </div>
                        <div class="flex gap-4 w-full lg:justify-start justify-center">
                            <div class="dark:bg-slate-800 bg-slate-200 rounded-md p-2">
                                <span class="flex flex-col items-center text-sm font-semibold dark:text-slate-500 text-slate-500">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger class="flex">
                                                <Icon icon="mynaui:letter-k-solid" class="h-12 w-12 transition-all dark:rotate-0 dark:scale-100 -mr-3" />
                                                <Icon icon="mynaui:letter-r-solid" class="h-12 w-12 transition-all dark:rotate-0 dark:scale-100 -ml-3" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Media de kills por ronda</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {{ props.player.Stats.KrRatio }}
                                </span>
                            </div>
                            <div class="dark:bg-slate-800 bg-slate-200 rounded-md p-2">
                                <span class="flex flex-col items-center text-sm font-semibold dark:text-slate-500 text-slate-500">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger class="flex">
                                                <Icon icon="mynaui:letter-k-solid" class="h-12 w-12 transition-all dark:rotate-0 dark:scale-100 -mr-3" />
                                                <Icon icon="mynaui:letter-d-solid" class="h-12 w-12 transition-all dark:rotate-0 dark:scale-100 -ml-3" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Kills/Deaths ratio</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {{ props.player.Stats.KdRatio }}
                                </span>
                            </div>
                        </div>
                        <div class="flex gap-4 w-full lg:justify-center justify-center">
                            <div class="dark:bg-slate-800 bg-slate-200 rounded-md p-2">
                                <span class="flex flex-col items-center text-sm font-semibold dark:text-slate-500 text-slate-500">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Icon icon="mynaui:letter-k-solid" class="h-12 w-12 transition-all dark:rotate-0 dark:scale-100" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Media de kills</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {{ props.player.Stats.KillsAverage }}
                                </span>
                            </div>
            
                            <div class="dark:bg-slate-800 bg-slate-200 rounded-md p-2">
                                <span class="flex flex-col items-center text-sm font-semibold dark:text-slate-500 text-slate-500">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Icon icon="mynaui:letter-d-solid" class="h-12 w-12 transition-all dark:rotate-0 dark:scale-100" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Media de muertes</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {{ props.player.Stats.DeathsAverage }}
                                </span>
                            </div>
            
                            <div class="dark:bg-slate-800 bg-slate-200 rounded-md p-2">
                                <span class="flex flex-col items-center text-sm font-semibold dark:text-slate-500 text-slate-500">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Icon icon="mynaui:letter-a-solid" class="h-12 w-12 transition-all dark:rotate-0 dark:scale-100" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Media de asistencias</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {{ props.player.Stats.AssistAverage }}
                                </span>
                            </div>
                        </div>
                        <div class="flex gap-4 w-full lg:justify-end justify-center">
                            <div class="dark:bg-slate-800 bg-slate-200 rounded-md p-2">
                                <span class="flex flex-col items-center text-sm font-semibold dark:text-slate-500 text-slate-500">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Icon icon="mdi:head-remove" class="h-12 w-12 transition-all dark:rotate-0 dark:scale-100" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Media de headshots</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {{ props.player.Stats.HeadshotPercentAverage }}%
                                </span>
                            </div>
        
                            <div class="dark:bg-slate-800 bg-slate-200 rounded-md p-2">
                                <span class="flex flex-col items-center text-sm font-semibold dark:text-slate-500 text-slate-500">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Icon icon="material-symbols:stars-outline" class="h-12 w-12 transition-all dark:rotate-0 dark:scale-100" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Media de MVPs</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {{ props.player.Stats.MVPAverage }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="teams">
                    <span class="text-lg font-semibold text-slate-500 ml-1">Equipos</span>
                    <div class="border rounded mt-1">
                        <div v-for="team in teams" class=" hover:dark:bg-slate-900 hover:bg-slate-100 transition " >
                            <a :href="`/team/${team.Nickname}`" class="flex items-center justify-between p-2">
                                <div class="flex items-center gap-4">
                                    <img :src="team.Avatar" class="w-20 h-20 rounded border" />
                                    <span class="text-xl font-bold dark:text-slate-300 text-slate-700">{{ team.Name }}</span>
                                </div>
                                <div class="flex items-center gap-10 pr-4">
                                    <!-- <div v-for="tournament in team.Tournaments">
                                        <Badge :class="GetTournamentColor(tournament)">{{ tournament }}</Badge>
                                    </div> -->
                                    <div class="flex gap-4 items-start">
                                        <a v-if="team.Website != undefined" :href="team.Website" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition">
                                            <Icon icon="mdi:web" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
                                        </a>
                                        <a v-if="team.Instagram !== undefined" :href="team.Instagram" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition">
                                            <Icon icon="radix-icons:instagram-logo" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
                                        </a>
                                        <a v-if="team.Twitter != undefined" :href="team.Twitter" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition">
                                            <Icon icon="ri:twitter-x-line" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
                                        </a>
                                    </div>
                                </div>
                            </a>
    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>