<script setup lang="ts">
    import Players_datatable from '@/components/ibercs/players/components/players_datatable.vue';
    import { ApiBackend } from '@/api/api_backend';
    import { Player } from '@/entities/players';
    import { ref, onMounted } from 'vue';

    const players = ref([] as Player[]);

    document.title = "IBERCS - Jugadores"

    onMounted(async () => {
        players.value = await ApiBackend.Players.GetAll();
    });
</script>

<template>
    <Players_datatable :players="players" />
</template>