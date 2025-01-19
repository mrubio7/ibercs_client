<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import Badge from '@/components/ui/badge/Badge.vue';
import Loader from '@/components/ui/loader/Loader.vue';
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

const getColorRank = (n:number) => {
    // switch (n) {
    //     case 1:
    //         return "to-amber-400"
    //     case 2:
    //         return "to-red-600"
    //     case 3:
    //         return "to-fuchsia-800"
    //     case 4:
    //         return "to-indigo-800"
    //     case 5:
    //         return "to-blue-700"
    // }
}
</script>

<template>
    <section class="border rounded p-2">
        <Title :text="`Top ${props.playersNumber} jugadores`" />
        <div class="flex flex-col border rounded overflow-hidden">
            <div v-if="loading" class="p-8">
                <Loader />
            </div>
            <div v-else>
                <Table>
                    <TableBody>
                        <TableRow v-for="(player, n) in players" :key="player.Id" class="bg-gradient-to-r from-transparent via-[transparent] via-[transparent]" :class="getColorRank(n+1)" >
                            <TableCell class="w-8 text-center font-semibold text-slate-800 dark:text-slate-100">
                                {{ n+1 }}º
                            </TableCell>
                            <TableCell class="font-semibold text-slate-800 dark:text-slate-100">
                                {{ player.Nickname }}
                            </TableCell>
                            <TableCell class="w-16">
                                <Badge variant="secondary">{{ player.FaceitElo }}</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    </section>
</template>