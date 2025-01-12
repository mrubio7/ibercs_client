<script setup lang="ts">
import { TournamentModel } from '@/entities/tournament';
import { PropType, ref, watchEffect } from 'vue';
import Badge from '@/components/ui/badge/Badge.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';

const tournaments = ref([] as TournamentModel[])

const props = defineProps({
    tournaments: {
        type: Array as PropType<TournamentModel[]>,
        required: true
    }
})

watchEffect(() => {
    tournaments.value = props.tournaments.sort((a, b) => a.StartDate - b.StartDate)
})

const daysUntilTournament = (startDate: number): number => {
    const currentTime = Math.floor(Date.now() / 1000) // Tiempo actual en segundos
    const differenceInSeconds = startDate - currentTime // Diferencia en segundos
    return Math.ceil(differenceInSeconds / (24 * 60 * 60)) // Convertir a días
}

const buildHrefTournament = (tournament:string, name:string) => {
if (name.includes("ESEA")) {
    return `https://www.faceit.com/es/cs2/league/ESEA%20League/a14b8616-45b9-4581-8637-4dfd0b5f6af8/${tournament}/overview`
} else {
    return `https://www.faceit.com/en/championship/${tournament}`
}
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-if="tournaments?.length == 0" class="w-full flex">
            <span class="p-2 text-slate-500 font-semibold text-center w-full">No existen torneos</span>
        </div>
        <div v-else>
            <a v-for="t in tournaments" :href="buildHrefTournament(t.FaceitId, t.Name)" target="_blank" class="hover:dark:border-slate-800 hover:border-slate-300 transition rounded border dark:border-slate-900 border-slate-100 transition overflow-hidden">
                <div
                    class="relative flex lg:flex-row flex-col gap-2 items-center justify-between p-4 rounded"
                    :class="'bg-opacity-60 dark:bg-opacity-70 bg-white dark:bg-black'"
                    :style="`background: url(${t.BackgroundImage}) no-repeat center; background-size: cover;`"
                >
                    <span class="text-md font-semibold dark:text-slate-300 text-slate-600">{{ t.Name }}</span>
                    <div class="flex gap-4">
                        <Badge v-if="t.GeoCountries != null" variant="secondary" class="flex gap-4">
                            <div v-for="flag in t.GeoCountries" class="flex">
                                <Icon :icon="`flag:${flag.toLowerCase()}-4x3`" class="h-[1.2rem] w-[1.2rem] rotate-0 transition-all rounded-md"/>
                            </div>
                        </Badge>
                        <Badge v-else variant="secondary" class="flex gap-4">
                            <div class="flex">
                                <Icon :icon="`flag:eu-4x3`" class="h-[1.2rem] w-[1.2rem] rotate-0 transition-all rounded-md"/>
                            </div>
                        </Badge>
                        <Badge v-if="daysUntilTournament(t.StartDate) < 1 && t.Status == 'finished'" variant="outline">Finalizado</Badge>
                        <Badge v-if="daysUntilTournament(t.StartDate) < 1 && t.Status == 'live'" variant="destructive">En curso</Badge>
                        <Badge v-if="daysUntilTournament(t.StartDate) == 1" variant="destructive">Hoy!</Badge>
                        <Badge v-if="daysUntilTournament(t.StartDate) == 2" variant="outline">Mañana</Badge>
                        <Badge v-if="daysUntilTournament(t.StartDate) >= 3" variant="outline">en {{daysUntilTournament(t.StartDate)}} días </Badge>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<style scoped>
.relative::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(248, 250, 252, 0.9); /* Modo claro */
  z-index: 0;
  transition: background-color 0.3s;
}

.dark .relative::before {
  background-color: rgba(2, 6, 23, 0.9); /* Modo oscuro */
}

.relative > * {
  position: relative;
  z-index: 1;
}
</style>