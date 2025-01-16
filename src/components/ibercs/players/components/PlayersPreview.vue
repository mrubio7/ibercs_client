<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import Badge from '@/components/ui/badge/Badge.vue';
import { Table, TableBody, TableCell } from '@/components/ui/table';
import TableRow from '@/components/ui/table/TableRow.vue';
import Title from '@/components/ui/title/Title.vue';
import { Player } from '@/entities/players';
import { onMounted, ref } from 'vue';

const props = defineProps({
    playersNumber: {
        required:true,
        type: Number
    }
})

const players = ref<Player[]>([])
const loading = ref<Boolean>(true)

onMounted(async () => {
    const res = await ApiBackend.Players.GetTopEloPlayers(props.playersNumber)
    if (res.ok) {
        players.value = res.data
        loading.value = false
    }
})
</script>

<template>
    <section>
        <Title text="Top 10 jugadores" />
        <div class="flex flex-col border rounded overflow-hidden">
            <Table>
                <TableBody>
                    <TableRow v-for="(player, n) in players" :key="player.Id"  class="">
                        <TableCell class="w-8 text-center text-slate-500">
                            {{ n+1 }}º
                        </TableCell>
                        <TableCell class="font-semibold text-slate-600 dark:text-slate-400">
                            {{ player.Nickname }}
                        </TableCell>
                        <TableCell class="w-16">
                            <Badge variant="secondary">{{ player.FaceitElo }}</Badge>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </section>
</template>