<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import Spinner from '@/components/ui/spinner/Spinner.vue';
import { MatchModel } from '@/entities/matches';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ref, watchEffect } from 'vue';
import { formatTimestampToDateTime } from '@/libs/utils';

const matches = ref([] as MatchModel[])
const loading = ref(true as boolean)

watchEffect(async () => {
    const res = await ApiBackend.Matches.GetRange(2)
    if (res.error == null) {
        if (res.data?.Matches == null) {
            matches.value = [] as MatchModel[]
            loading.value = false
            return
        }
        const currentTime = Math.floor(Date.now() / 1000)

        let temp = res.data.Matches as MatchModel[]
        matches.value = temp.filter(m => {
            const extraTime = m.BestOf === 1 ? 1 * 60 * 60 : (m.BestOf === 3 ? 2 * 60 * 60 : 0)

            return m.Timestamp 
                && m.Timestamp + extraTime > currentTime
        }).sort((a, b) => a.Timestamp - b.Timestamp)
    }
    loading.value = false
})

function isMatchLive(match: MatchModel): boolean {
    const currentTime = Math.floor(Date.now() / 1000);

    const extraTime = match.BestOf === 1 ? 1 * 60 * 60 : (match.BestOf === 3 ? 1.75 * 60 * 60 : 0);

    return match.Timestamp <= currentTime && (match.Timestamp + extraTime) > currentTime;
}
</script>
<template>
    <section class="border rounded-md p-2">
        <span class="text-md font-semibold px-2">Próximos partidos</span>
        <div class="mt-2">
            <div v-if="!loading" class="flex flex-col gap-2">
                
                <a v-for="m in matches" :href="`/match/${m.FaceitId}`" class="hover:dark:border-slate-800 hover:border-slate-400 rounded-md transition border dark:border-slate-900 border-slate-200 overflow-hidden">
                    <div class="relative flex flex-col gap-0.5 p-2 rounded-md" :style="`background: url(${m.IsTeamAKnown ? m.TeamA.Avatar : m.TeamB.Avatar}) no-repeat center; background-size: cover;`">
                        <div class="flex justify-between">
                            <span :class="`text-sm dark:text-slate-400 text-slate-600 ${m.IsTeamAKnown ? 'font-bold':'font-normal'}`">{{ m.TeamAName }}</span>
                            <span :class="`text-xs dark:text-slate-600 text-slate-400 font-bold`">VS</span>
                            <span :class="`text-sm dark:text-slate-400 text-slate-600 ${m.IsTeamBKnown ? 'font-bold':'font-normal'}`">{{ m.TeamBName }}</span>
                        </div>
                        <div class="flex w-full justify-between">
                            <span class="w-3/5 text-xs font-semibold dark:text-slate-500 text-slate-500 truncate">{{ m.TournamentName }}</span>
                            <span v-if="!isMatchLive(m)" class="w-2/5 text-right text-xs font-semibold dark:text-slate-500 text-slate-500">{{ formatTimestampToDateTime(m.Timestamp) }}</span>
                            <span v-if="isMatchLive(m)" class="w-2/5 text-right text-xs font-semibold text-red-700">Jugando</span>
                        </div>
                    </div>
                </a>

                <div v-if="!matches.length" class="flex flex-col items-center gap-2 py-6">
                    <Icon icon="material-symbols:swords-outline" class="h-8 w-8 mt-0.5 text-slate-600" />
                    <span class="text-sm font-semibold text-slate-500">No hay partidos</span>
                </div>
            </div>
            <div v-else>
                <div class="flex flex-col items-center gap-2 py-6">
                    <Spinner/>
                    <span class="text-sm font-semibold text-slate-500">Cargando partidos</span>
                </div>
            </div>
        </div>
    </section>
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