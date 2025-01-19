<script setup lang="ts">
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import Button from '@/components/ui/button/Button.vue';
import IconImage from '@/components/ui/icon-image/IconImage.vue';
import Icon from '@/components/ui/icon/Icon.vue';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TableCell from '@/components/ui/table/TableCell.vue';
import Title from '@/components/ui/title/Title.vue';
import { Team } from '@/entities/team';
import { PropType, ref } from 'vue';

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
        <Title text="Equipos" />
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Equipo</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="team in props.teams" class="">
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
                            <Icon class="h-8 w-8 transition-all scale-150" icon="ic:round-expand-less" :class="expandedTeams.has(team.FaceitId) ? 'rotate-180' : ''" />
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </section>
</template>