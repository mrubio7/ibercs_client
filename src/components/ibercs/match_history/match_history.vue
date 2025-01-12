<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Spinner from '@/components/ui/spinner/Spinner.vue';
import { MatchModel } from '@/entities/matches';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { PropType, ref, computed, watchEffect } from 'vue';

const props = defineProps({
    matchHistory: {
        required: true,
        type: Array as PropType<MatchModel[]>
    },
    teamFaceitId: {
        required: true,
        type: String,
    },
    pageSize: {
        required: true,
        type: Number,
        default: 6
    }
})

const matches = ref([] as MatchModel[]);
const currentPage = ref(1);
const loading = ref(true)

watchEffect(() => {
    matches.value = props.matchHistory.sort((a, b) => b.Timestamp - a.Timestamp);
    if (matches.value) {
        loading.value = false
    }
});

// Computed properties to separate upcoming and past matches
const upcomingMatches = computed(() => {
    const currentTime = Math.floor(Date.now() / 1000);
    return matches.value.filter(match => match.Timestamp > currentTime);
});

const pastMatches = computed(() => {
    const currentTime = Math.floor(Date.now() / 1000);
    return matches.value.filter(match => match.Timestamp <= currentTime);
});

// Computed property for paginated past matches
const paginatedPastMatches = computed(() => {
    const start = (currentPage.value - 1) * props.pageSize;
    const end = start + props.pageSize;
    return pastMatches.value.slice(start, end);
});

// Function to change pages
const totalPages = computed(() => Math.ceil(pastMatches.value.length / props.pageSize));
const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
}
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
}

const matchwon = (
    teamAFaceitId: string,
    teamBFaceitId: string,
    teamAScore: number,
    teamBScore: number,
    timestamp: number,
    isClass: boolean,
    teamSelected: string
) => {
    const currentTime = Math.floor(Date.now() / 1000);

    // Manejo de puntajes no definidos
    teamAScore = teamAScore ?? 0;
    teamBScore = teamBScore ?? 0;

    // Comprobación de si el partido es en el futuro
    if (timestamp > currentTime) {
        return isClass ? 'text-slate-500' : 'PROXIMAMENTE';
    }

    // Determinación del resultado según el equipo seleccionado
    if (teamSelected === teamAFaceitId) {
        if (teamAScore > teamBScore) {
            return isClass ? 'text-emerald-500' : 'VICTORIA';
        } else if (teamAScore < teamBScore) {
            return isClass ? 'text-red-500' : 'DERROTA';
        }
    } else if (teamSelected === teamBFaceitId) {
        if (teamBScore > teamAScore) {
            return isClass ? 'text-emerald-500' : 'VICTORIA';
        } else if (teamBScore < teamAScore) {
            return isClass ? 'text-red-500' : 'DERROTA';
        }
    }

    // Retorno nulo si el equipo seleccionado no coincide con ninguno
    return null;
};

</script>

<template>
    <span class="text-lg font-bold">Historial de partidos</span>
    <section v-if="loading">
        <Spinner />
    </section>
    <section v-else class="w-full">
        <div v-if="upcomingMatches.length" class="mb-2 w-full">
            <div class="w-full justify-end text-left p-2">
                <span class="text-sm font-semibold text-slate-500">Próximos partidos</span>
            </div>
            <div class="flex flex-col gap-2">
                

               
                <div v-for="match in upcomingMatches" :key="match.FaceitId" >
                    <RouterLink :to="`/match/${match.FaceitId}`">
                        <div class="flex justify-between border p-2 rounded hover:dark:border-slate-600 hover:border-slate-300 transition">
                            <div class="flex items-center gap-3 ml-1">
                                <span class="text-sm font-semibold text-slate-500">vs</span>
                                <span class="text-lg font-semibold dark:text-slate-300 text-slate-700">
                                    {{ (props.teamFaceitId !== match.TeamAFaceitId) ? match.TeamAName : match.TeamBName }}
                                </span>
                            </div>
                            <div class="flex flex-col gap-0.5 p-2 rounded-md">
                                <div class="flex items-center gap-4 mr-2">
                                    <span class="text-sm font-semibold text-slate-500">{{ new Date(match.Timestamp * 1000).toLocaleString() }}</span>
                                    <span class="text-sm font-semibold text-slate-500">PROXIMAMENTE</span>
                                </div>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>

        <!-- Past Matches Section with Pagination -->
        <div v-if="pastMatches.length">
            <div class="w-full justify-end text-left p-2">
                <span class="text-sm font-semibold text-slate-500">Partidos anteriores</span>
            </div>
            <div class="flex flex-col gap-2">
                <a v-for="match in paginatedPastMatches" :key="match.FaceitId">
                    <RouterLink :to="`/match/${match.FaceitId}`">
                        <div class="flex justify-between border p-2 rounded hover:dark:border-slate-600 hover:border-slate-300 transition">
                            <div class="flex items-center gap-3 ml-1">
                                <span class="text-sm font-semibold text-slate-500">vs</span>
                                <span class="text-lg font-semibold dark:text-slate-300 text-slate-700">
                                    {{ (props.teamFaceitId !== match.TeamAFaceitId) ? match.TeamAName : match.TeamBName }}
                                </span>
                            </div>
                            <div class="flex flex-col gap-0.5 p-2 rounded-md">
                                <div class="flex items-center gap-4 mr-2">
                                    <span class="text-sm font-semibold text-slate-500">{{ new Date(match.Timestamp * 1000).toLocaleString() }}</span>
                                    <span 
                                        class="text-sm font-semibold"
                                        :class="matchwon(match.TeamAFaceitId, match.TeamBFaceitId, match.ScoreTeamA, match.ScoreTeamB, match.Timestamp, true, props.teamFaceitId)"
                                    >
                                        {{ matchwon(match.TeamAFaceitId, match.TeamBFaceitId, match.ScoreTeamA, match.ScoreTeamB, match.Timestamp, false, props.teamFaceitId) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </RouterLink>
                </a>
            </div>

            <!-- Pagination Controls -->
            <div class="flex justify-end gap-4 items-center mt-4">
				<Button @click="prevPage" variant="outline" :disabled="currentPage === 1">
					<Icon icon="radix-icons:arrow-left" class="h-[1.2rem] w-[1.2rem]" />
				</Button>
				<span class="text-sm">{{ currentPage }} / {{ totalPages }}</span>
				<Button @click="nextPage" variant="outline" :disabled="currentPage === totalPages">
					<Icon icon="radix-icons:arrow-right" class="h-[1.2rem] w-[1.2rem]" />
				</Button>
			</div>
        </div>
    </section>
</template>
