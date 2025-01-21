<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import AddTeamPopup from '@/components/ibercs/team/components/AddTeamPopup.vue';
import TeamLadder from '@/components/ibercs/team/components/TeamLadder.vue';
import UserState from '@/components/ibercs/user/user_state';
import Button from '@/components/ui/button/Button.vue';
import Loader from '@/components/ui/loader/Loader.vue';
import Title from '@/components/ui/title/Title.vue';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Team } from '@/entities/team';
import { onMounted, ref } from 'vue';

document.title = "IBERCS - Equipos"

const loading = ref<boolean>(true)
const teams = ref<Team[]>([])

onMounted(async () => {
    const res = await ApiBackend.Teams.GetActiveTeams()
    if (res.ok) {
        loading.value = false
        teams.value = res.data
    }
})
</script>
<template>
    <div class="flex justify-between">
        <Title text="Equipos" />
        <AddTeamPopup v-if="UserState.FaceitId != ''" />
        <TooltipProvider v-else>
            <Tooltip>
                <TooltipTrigger>
                    <Button size="sm" variant="secondary" :disabled="true">Añadir equipo</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <span class="">Logueate para añadir un equipo</span>
                </TooltipContent>
            </ToolTip>
        </TooltipProvider>
    </div>
    <section v-if="loading">
        <Loader />
    </section>
    <section v-else>
        <TeamLadder :teams="teams" />
    </section>
</template>