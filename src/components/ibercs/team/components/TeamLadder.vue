<script setup lang="ts">
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Icon from '@/components/ui/icon/Icon.vue';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TableCell from '@/components/ui/table/TableCell.vue';
import Title from '@/components/ui/title/Title.vue';
import { Team } from '@/entities/team';
import { PropType, ref } from 'vue';
import PlayerStats from '../../players/components/PlayerStats.vue';

const props = defineProps({
    teams: {
        required: true,
        type: Array as PropType<Team[]>
    }
})

const expandedTeams = ref<Set<string>>(new Set());
const toggleExpand = (playerId: string) => {
    if (expandedTeams.value.has(playerId)) {
        expandedTeams.value.delete(playerId);
    } else {
        expandedTeams.value.add(playerId);
    }
};
</script>

<template>
    <section>
        <div class="flex justify-between">
            <Title text="Equipos" />
        </div>
        <div v-if="teams.length == 0" class="flex justify-center items-center p-8">
            <span class="text-slate-500 font-semibold">
                Aún no hay equipos
            </span>
        </div>
        <div v-else>
            <Table class="rounded overflow-hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead>Equipo</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-for="team in props.teams">
                        <TableRow class="">
                            <TableCell class="font-semibold">
                                <div class="flex items-center gap-2">
                                    <Avatar class="w-7 h-7 flex">
                                        <AvatarImage :src="team.Avatar" alt="avatar" />
                                    </Avatar>
                                    {{ team.Name }} 
                                    <span class="text-slate-500">({{ team.Tag }})</span>
                                </div>
                            </TableCell>
                            <TableCell class="font-semibold text-right">
                                <Button size="icon" class="scale-90" variant="outline" @click="toggleExpand(team.FaceitId)" >
                                    <Icon class="h-8 w-8 transition-all scale-150" icon="ic:round-expand-less" :class="expandedTeams.has(team.FaceitId) ? '' : 'rotate-180'" />
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow class="transition-all ease-out hover:bg-[transparent]"  :class="expandedTeams.has(team.FaceitId) ? 'translate-y-0' : '-translate-y-2'">
                            <TableCell colspan="4" class="p-0">
                                <div :class="expandedTeams.has(team.FaceitId) ? '' : 'hidden'" v-for="player in team.Players" class="flex flex-col hover:dark:bg-slate-900 hover:bg-slate-100 transition">
                                    <div class="flex justify-between items-center gap-2 px-4 border-b py-1">
                                        <Badge variant="secondary" class="">{{ player.FaceitElo }}</Badge>
                                        <div class="flex items-center gap-4 w-2/12">
                                            <img :src="player.Avatar" class="h-6 w-6 rounded-full border border-slate-500" />
                                            <span class="font-semibold text-slate-600 dark:text-slate-400">{{ player.Nickname }}</span>
                                        </div>
                                        <div class="w-9/12 flex items-center">
                                            <PlayerStats :stats="player.Stats" />
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
    
                    </template>
                </TableBody>
            </Table>
        </div>
    </section>
</template>