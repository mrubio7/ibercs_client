<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import Badge from '@/components/ui/badge/Badge.vue';
import Loader from '@/components/ui/loader/Loader.vue';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import Title from '@/components/ui/title/Title.vue';
import { Player } from '@/entities/players';
import { onMounted, ref } from 'vue';
import FreeAgent_InGameRolesIcons from './FreeAgent_InGameRolesIcons.vue';

const loading = ref<Boolean>(true)
const players = ref<Player[]>()

onMounted( async () => {
    const res = await ApiBackend.Players.GetFreeAgents(5)
    if (res.ok) {
        players.value = res.data
        loading.value = false
    }
})
</script>

<template>
    <section>
        <Title text="Jugadores libres" />
        <div class="border rounded" >
            <div v-if="loading" class="p-8">
                <Loader />
            </div>
            <div v-else-if="!players" class="flex justify-center items-center px-4 py-10">
                <span class="text-slate-500 font-semibold">
                    Aún no hay jugadores en busqueda de equipo
                </span>
            </div>
            <div v-else>
                <Table>
                    <TableBody>
                        <TableRow v-for="p in players" class="">
                            <TableCell class="w-1/12 text-right">
                                <Badge variant="secondary">{{ p.FaceitElo }}</Badge>
                            </TableCell>
                            <TableCell class="w-4/12">
                                <span class="pl-1 font-semibold text-slate-700 dark:text-slate-300">
                                    {{ p.Nickname }}
                                </span>
                            </TableCell>
                            <TableCell class="w-7/12">
                                <FreeAgent_InGameRolesIcons v-model="p.FreeAgent.InGameRoles" :editable="false" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    </section>
</template>