<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import TeamLadder from '@/components/ibercs/team/components/TeamLadder.vue';
import { Team } from '@/entities/team';
import { onMounted, ref } from 'vue';

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
    <TeamLadder :teams="teams" />
</template>