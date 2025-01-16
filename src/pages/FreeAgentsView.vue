<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import FreeAgentsDatatable from '@/components/ibercs/players/components/FreeAgentsDatatable.vue';
import { Player } from '@/entities/players';
import { onMounted, ref } from 'vue';

const loading = ref<boolean>(true)
const players = ref<Player[]>([])

document.title = "IBERCS - Jugadores libres"

onMounted(async () => {
    const res = await ApiBackend.Players.GetFreeAgents(0)
    if (res.ok) {
        loading.value = false
        players.value = res.data
    }
})
</script>

<template>
    <FreeAgentsDatatable :players="players" />
</template>