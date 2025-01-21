<script setup lang="ts">
import { PropType, ref, watchEffect } from 'vue';
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from '@/components/ui/table';
import { Player } from '@/entities/players';
import FreeAgent_InGameRolesIcons from './FreeAgent_InGameRolesIcons.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import IconButton from '@/components/ui/icon-button/IconButton.vue';
import Button from '@/components/ui/button/Button.vue';
import Icon from '@/components/ui/icon/Icon.vue';
import ApiPermissions from '@/api/api_permissions';
import { DTO_UpdateFreeAgent } from '@/api/dto/request';
import FreeAgent_Edit from './FreeAgent_Edit.vue';
import { ApiBackend } from '@/api/api_backend';
import { useToast } from '@/components/ui/toast';
import Title from '@/components/ui/title/Title.vue';
import PlayerStats from './PlayerStats.vue';

const props = defineProps({
    players: {
        required: true,
        type: Array as PropType<Player[]>
    }
})

const playersData = ref<Player[]>([])
const expandedPlayers = ref<Set<string>>(new Set());
const toggleExpand = (playerId: string) => {
    if (expandedPlayers.value.has(playerId)) {
        expandedPlayers.value.delete(playerId);
    } else {
        expandedPlayers.value.add(playerId);
    }
};

watchEffect(() => {
    playersData.value = props.players
})

const { toast } = useToast()
// MODAL
const show = ref<boolean>(false)
const editFreeAgent = ref<DTO_UpdateFreeAgent>({
    Description:"",
    FaceitId:"",
    InGameRoles:[],
    Publish:true
})
const handleOpenModal = (roles:string[], desc:string, faceitId:string) => {
    editFreeAgent.value.InGameRoles = roles
    editFreeAgent.value.Description = desc
    editFreeAgent.value.FaceitId = faceitId
    show.value = true
}
const handleEditFreeAgent = async () => {
    const dto:DTO_UpdateFreeAgent = {
        Description: editFreeAgent.value.Description,
        FaceitId: editFreeAgent.value.FaceitId,
        InGameRoles: editFreeAgent.value.InGameRoles,
        Publish: true
    }

    if (dto.InGameRoles == null) {
        dto.InGameRoles = []
    }

    const res = await ApiBackend.Players.UpdateFreeAgent(dto)
    if (res.ok) {
        const updatedPlayer = res.data;
        const index = playersData.value.findIndex(p => p.FaceitId === updatedPlayer.FaceitId);
        if (index !== -1) {
            playersData.value[index] = updatedPlayer;
        }
        closeModal()
        toast({
            duration: 3000,
            title: "Anuncio modificado",
            description: "El anuncio ha sido actualizado con éxito"
        })
        return
    }
    toast({
        duration: 3000,
        title: "Error",
        description: "El anuncio no se ha podido modificar"
    })
}
const handleDeleteFreeAgent = async (roles:string[], desc:string, faceitId:string) => {
    const dto:DTO_UpdateFreeAgent = {
        Description: desc,
        FaceitId: faceitId,
        InGameRoles: roles,
        Publish: false
    }
    const res = await ApiBackend.Players.UpdateFreeAgent(dto)
    if (res.ok) {
        toast({
            duration: 3000,
            title: "Anuncio despublicado",
            description: "El anuncio ha sido despublicado con éxito"
        })
        const index = playersData.value.findIndex(p => p.FaceitId === dto.FaceitId);
        if (index !== -1) {
            playersData.value.splice(index, 1);
        }
        return
    }
    toast({
        duration: 3000,
        title: "Error",
        description: "El anuncio no se ha podido despublicar"
    })
}
const closeModal = () => {
    show.value = false
}
</script>

<template>
    <section>
        <Title text="Jugadores libres" />    
        <div v-if="!playersData" class="flex justify-center items-center px-4 py-10">
            <span class="text-slate-500 font-semibold">
                Aún no hay jugadores en busqueda de equipo
            </span>
        </div>
        <div v-else>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="text-center">Elo</TableHead>
                        <TableHead class="text-center">Nick</TableHead>
                        <TableHead class="text-center">Roles</TableHead>
                        <TableHead class="text-center">Descripción</TableHead>
                        <TableHead class="text-center">Stats</TableHead>
                        <TableHead class="text-center"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-for="p in playersData">
                        <!-- FREE AGENT INFO -->
                        <TableRow>
                            <TableCell class="text-center">
                                <Badge variant="secondary">{{ p.FaceitElo }}</Badge>
                            </TableCell>
                            <TableCell class="w-1/12 text-center">
                                <span class="pl-1 font-semibold text-slate-700 dark:text-slate-300">
                                    {{ p.Nickname }}
                                </span>
                            </TableCell>
                            <TableCell class="w-3/12 px-5">
                                <FreeAgent_InGameRolesIcons v-model="p.FreeAgent.InGameRoles" />
                            </TableCell>
                            <TableCell class="w-8/12 text-xs text-slate-500">
                                {{ p.FreeAgent.Description }}
                            </TableCell>
                            <TableCell class="w-3/12">
                                <Button size="icon" class="scale-90" variant="outline" @click="toggleExpand(p.FaceitId)" >
                                    <Icon class="h-8 w-8 transition-all scale-150" icon="ic:round-expand-less" :class="expandedPlayers.has(p.FaceitId) ? '' : 'rotate-180'" />
                                </Button>
                            </TableCell>
                            <TableCell class="w-20">
                                <div class="flex gap-1">
                                    <IconButton v-if="ApiPermissions.FreeAgents.Update.value" icon="akar-icons:edit" @click="handleOpenModal(p.FreeAgent.InGameRoles, p.FreeAgent.Description, p.FaceitId)" />
                                    <IconButton v-if="ApiPermissions.FreeAgents.Delete.value" icon="material-symbols:delete-outline-rounded" @click="handleDeleteFreeAgent(p.FreeAgent.InGameRoles, p.FreeAgent.Description, p.FaceitId)" />
                                </div>
                            </TableCell>
                        </TableRow>
                        <!-- STATS -->
                        <TableRow  class="bg-gray-100 dark:bg-gray-900 transition-all ease-out"  :class="expandedPlayers.has(p.FaceitId) ? 'translate-y-0' : '-translate-y-2'">
                            <TableCell class="border-b-2" :class="expandedPlayers.has(p.FaceitId) ? '' : 'hidden'" colspan="6">
                                <div class="flex gap-2 w-full -mt-1">
                                    <PlayerStats :stats="p.Stats" />
                                </div>
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>

    </section>
    <!-- EDIT FREE AGENT MODAL -->
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
        <div class="dark:bg-slate-950 bg-slate-100 border rounded-lg p-6 w-full max-w-lg">
            <h2 class="text-lg font-semibold mb-4">Modificando anuncio</h2>
    
            <FreeAgent_Edit v-model="editFreeAgent" :horizontal="false" :editable="true" :hide-publish="true" />

            <div class="flex justify-end gap-4 mt-6">
                <Button @click="show = false" class="rounded px-4 py-2" variant="outline">Atras</Button>
                <Button @click="handleEditFreeAgent" class="rounded px-4 py-2"  >Modificar</Button>
            </div>
        </div>
    </div>

</template>