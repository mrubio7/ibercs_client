<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import { DTO_AssignPlayerToTeam } from '@/api/dto/request';
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import ComboBox from '@/components/ui/combo-box/ComboBox.vue';
import IconButton from '@/components/ui/icon-button/IconButton.vue';
import Switch from '@/components/ui/switch/Switch.vue';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/toast';
import { FaceitTeam, Team } from '@/entities/team';
import { onMounted, ref, watchEffect } from 'vue';

const { toast } = useToast()
const loading = ref<boolean>(true)
const teamOpts = ref<{value:string, label:string}[]>([])
const teamIdchosen = ref<string>("")

onMounted(async() => {
    const res = await ApiBackend.Teams.GetActiveTeams()
    if (res.ok) {
        teamOpts.value = Array.from(res.data as Team[]).map((user) => ({ value: user.FaceitId, label: user.Name }))
        loading.value = false
    }
})

const teamChosen = ref<FaceitTeam>()
watchEffect(async () => {
    const res = await ApiBackend.Teams.GetTeamFromFaceit(teamIdchosen.value)
    if (res.ok) {
        teamChosen.value = res.data
    }
})

const teamSaved = ref<Team>()
watchEffect(async () => {
    if (teamIdchosen.value != "") {
        const res = await ApiBackend.Teams.GetTeamByFaceitId(teamIdchosen.value)
        if (res.ok) {
            teamSaved.value = res.data
            assignedPlayers.value = new Set((res.data as Team).Players.map(p => p.FaceitId))
        }
    }
})
const assignedPlayers = ref<Set<string>>(new Set());
const isPlayerAssigned = (faceitId: string): boolean => {
    return assignedPlayers.value.has(faceitId)
};
const assignPlayer = async (playerFaceitId: string, teamId: number) => {
    if (assignedPlayers.value.has(playerFaceitId)) {
        assignedPlayers.value.delete(playerFaceitId);
    } else {
        assignedPlayers.value.add(playerFaceitId);
    }

    const payload:DTO_AssignPlayerToTeam = {
        Assign: assignedPlayers.value.has(playerFaceitId),
        PlayerFaceitId: playerFaceitId,
        TeamId: teamId
    }

    const res = await ApiBackend.Players.AssignToTeam(payload)
    if (res.ok) {
        toast({
            title: "Jugador asignado correctamente",
            description: `El jugador ha sido asignado correctamente al equipo`,
        })
        return
    }
    toast({
        title: "Error al asignar jugador",
        description: `Ha ocurrido un error al asignar el jugador al equipo`,
    })
    assignedPlayers.value.delete(playerFaceitId);
}
</script>

<template>
    <Table class="rounded overflow-hidden">
        <TableHeader>
            <TableRow>
                <TableHead class="w-4/12">Equipo</TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell>
                    <ComboBox v-model="teamIdchosen" :options="teamOpts" placeholder="Equipo" search-placeholder="Buscar equipo" />
                </TableCell>
                <TableCell class="">
                    <div class="flex items-center justify-end gap-4">
                        <IconButton icon="mdi:eye" />
                    </div>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colspan="10">
                    <Table v-if="teamChosen?.Members" class="rounded overflow-hidden">
                        <TableHeader>
                            <TableHead class="w-10">Pais</TableHead>
                            <TableHead class="">Jugador</TableHead>
                            <TableHead class="w-40">Acciones</TableHead>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="m in teamChosen?.Members">
                                <TableCell>
                                    <IconButton :icon="`flag:${m.Country}-4x3`" class="rounded" />
                                </TableCell>
                                <TableCell>
                                    <div class="flex items-center gap-4">
                                        <Avatar class="w-8 h-8">
                                            <AvatarImage :src="m.Avatar"  />
                                        </Avatar>
                                        <span class="text-slate-500 font-semibold">
                                            {{ m.Nickname }}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell class="">
                                    <div class="flex justify-center items-center">
                                        <Switch
                                            :disabled="m.Country !== 'es'"
                                            :checked="isPlayerAssigned(m.FaceitId)"
                                            @update:checked="assignPlayer(m.FaceitId, teamSaved!.Id)"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableCell>
            </TableRow>
            
        </TableBody>
    </Table>
</template>