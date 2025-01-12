<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { TeamRankModel } from '@/entities/teams';
import { PropType } from 'vue';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { PathRoutes } from '@/router';
import Badge from '@/components/ui/badge/Badge.vue';
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue';
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue';
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue';
const props = defineProps({
	teams: {
		type: Array as PropType<TeamRankModel[]>,
		required: true
	}
});

const teams = ref([] as TeamRankModel[]);

watchEffect(() => {
	teams.value = props.teams.sort((a, b) => {
		return (b.ActualPoints + b.LeaguePoints) - (a.ActualPoints + a.LeaguePoints);
	});
});
</script>


<template>
	<section class="w-full">
		<div class="flex py-4 px-2 flex-col w-full gap-2">
			<div v-for="(team, n) in teams" :key="team.FaceitId">
				<a :href="PathRoutes.Team_Profile.replace(':team_name', team.Team.Nickname)">
					<div class="flex items-center border dark:border-slate-800 border-slate-300 rounded-sm transition py-2 px-4 dark:hover:bg-slate-900 hover:bg-slate-100 cursor-pointer justify-between">
						<div class="flex items-center gap-6 w-full justify-between">
							<div class="flex items-center gap-4">
								<span class="w-6 text-md text-slate-500">{{ n+1 }}º</span>
								<Avatar class="border dark:border-slate-800 border-slate-400">
									<AvatarImage :src="team.Team.Avatar" alt="team avatar" />
								</Avatar>
								<span class="text-md font-semibold dark:text-slate-200 text-slate-700">
									{{ team.Team.Name }}
								</span>
								<span class="text-sm font-semibold dark:text-slate-500 text-slate-400 -ml-2 lg:flex hidden">
								({{ team.Team.Nickname }})
							</span>
							</div>
						</div>
						<div class="flex items-center gap-4 w-3/5 justify-end">
							<div class="relative h-full items-center flex">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<Badge variant="outline" class="font-semibold dark:text-slate-100 text-slate-900">{{ (team.ActualPoints).toFixed(0) }} puntos por partidos</Badge>
										</TooltipTrigger>
										<TooltipContent>
											<p>Puntos acumulados según el desempeño en los últimos partidos, calculados en función de la diferencia de elo entre los equipos. Ganar a equipos con más elo otorga más puntos, mientras que perder contra equipos con menos elo penaliza más.</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<div class="relative h-full items-center flex">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<Badge variant="outline" class="font-semibold dark:text-slate-100 text-slate-900">{{ (team.LeaguePoints).toFixed(0) }} puntos de liga</Badge>
										</TooltipTrigger>
										<TooltipContent>
											<p>Puntos adicionales otorgados según la dificultad de la liga en la que participa el equipo.</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<div class="relative h-full items-center flex">
								<Badge variant="secondary" class="text-sm font-bold dark:text-slate-100 text-slate-900">{{ (team.ActualPoints+team.LeaguePoints).toFixed(0) }} Pts</Badge>
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>

		<div class="flex flex-col justify-start px-2">
			<span class="text-xs text-slate-500">Solo se tienen en cuenta los últimos 12 partidos de cada equipo.</span>
			<span class="text-xs text-slate-500">Esta clasificación se encuentra en una fase experimental y puede estar sujeta a cambios en el sistema de puntuación. Si tienes alguna consulta o sugerencia, no dudes en contactarnos a través de Twitter o correo electrónico.</span>
		</div>		
	</section>
</template>
