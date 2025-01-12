<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { LookingForTeamModel } from '@/entities/lftplayer';
import { PERMISSIONS, PLAYER_ROLES } from '@/libs/consts';
import { computed, PropType, ref, watchEffect } from 'vue';
import Player_roles_table from './player_roles_table.vue';
import Multiselect from '@/components/ui/multiselect/multiselect.vue';
import Slider from '@/components/ui/slider/Slider.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { UserModel } from '@/entities/users';
import { UserState } from '../user_login/state';
import New_lft_modal from './new_lft_modal.vue';
import Confirmation_model from '../confirmation_model/confirmation_model.vue';
import { ApiBackend } from '@/api/api_backend';
import { useToast } from '@/components/ui/toast';

const props = defineProps({
    lftplayers: {
        type: Array as PropType<LookingForTeamModel[]>,
        required: true,
    }
});

const { toast } = useToast()

const showModal = ref(false);
const showConfirmModal = ref(false); 
const user = ref({} as UserModel)
const lftPlayers = ref(props.lftplayers);
const selectedRole = ref<string[]>([]);
const minElo = ref([0]);
const expandedPlayers = ref<Set<string>>(new Set());
const playerToEdit = ref<LookingForTeamModel | null>(null);
const playerToDelete = ref<string | null>(null); // Almacena el ID del jugador a eliminar

watchEffect(() => {
    lftPlayers.value = props.lftplayers;
});


const filteredPlayers = computed(() => {
    if (!lftPlayers.value) return [];
    return lftPlayers.value.filter(player => {
        const roleMatch = selectedRole.value.length > 0 
            ? selectedRole.value.every(role => player.InGameRole.includes(role)) 
            : true;
        const eloMatch = (minElo.value !== null ? player.Player.FaceitElo >= minElo.value[0] : true);
        return roleMatch && eloMatch;
    });
});

const roleOptions = Object.entries(PLAYER_ROLES).map(([key, value]) => ({
    value: key,
    label: value
}));

// Toggle the expanded state for each player
const toggleExpand = (playerId: string) => {
    if (expandedPlayers.value.has(playerId)) {
        expandedPlayers.value.delete(playerId);
    } else {
        expandedPlayers.value.add(playerId);
    }
};

watchEffect(() => {
    user.value = UserState
})

// Maneja el envío del formulario desde el modal
const handleFormSubmit = async (newLftPlayer: LookingForTeamModel, playerId:string) => {
    const res = await ApiBackend.Players.UpdateLookingForTeam(newLftPlayer, playerId);
    if (res.error == null) {
        toast({
            title: 'Publicación actualizada',
            description: 'Tu publicación ha sido actualizada correctamente',
        });
        showModal.value = false;
        playerToEdit.value = null;
        document.location.reload();
    }
};

const editPlayer = (player: LookingForTeamModel) => {
    playerToEdit.value = { ...player };
    showModal.value = true;
};

const deletePlayer = async (playerId: string) => {
    const res = await ApiBackend.Players.DeleteLookingForTeam(playerToDelete.value as string);
    if (res.error == null) {
        toast({
            title: 'Publicación eliminada',
            description: 'Tu publicación ha sido eliminada correctamente',
        });
    }
    lftPlayers.value = lftPlayers.value.filter(player => player.Player.FaceitId !== playerId);
    showModal.value = false;
    document.location.reload();
};

const confirmDeletePlayer = (playerId: string) => {
    playerToDelete.value = playerId;
    showConfirmModal.value = true;
};

const cancelDelete = () => {
    playerToDelete.value = null;
    showConfirmModal.value = false;
};
</script>

<template>
    <Confirmation_model
        :show="showConfirmModal" 
        title="Confirmar eliminación" 
        message="¿Estás seguro de que deseas eliminar este jugador?" 
        @confirm="deletePlayer" 
        @cancel="cancelDelete" 
    />
    <New_lft_modal 
        :show="showModal" 
        :initialData="(playerToEdit as LookingForTeamModel)" 
        @close="showModal = false; playerToEdit = null" 
        @submit="handleFormSubmit" 
    />
    <div>  
        <div class="flex gap-6 justify-between items-center p-2 mt-2">
            <Icon icon="stash:filter-solid" class="h-12 w-12 text-slate-500" />
            <div class="flex w-full gap-4 items-center">
                <span class="text-sm text-slate-500 text-nowrap">
                    <Badge variant="outline">
                        Elo mínimo: {{ minElo[0] }}
                    </Badge>
                </span>
                <Slider v-model:model-value="minElo" :default-value="[0]" :max="3000" :min="0" :step="100" class="w-full" />
            </div>
            <Multiselect width="500" :options="roleOptions" :model-value="selectedRole" placeholder="Selecciona rol" />
        </div>
        
        <Table class="min-w-full rounded-md overflow-hidden">
            <TableHeader>
                <TableRow class="w-full">
                    <TableHead colspan="3" class="w-2/12">
                        <span class="text-sm font-semibold">Nick</span>
                    </TableHead>
                    <TableHead colspan="2" class="w-2/12">
                        <span class="text-sm font-semibold">Elo</span>
                    </TableHead>
                    <TableHead colspan="5" class="w-5/12">
                        <span class="text-sm font-semibold">Roles</span>
                    </TableHead>
                    <TableHead colspan="2" class="w-1/12"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody v-if="!filteredPlayers.length">
                <TableRow>
                    <TableCell colspan="12" class="text-center text-slate-500 p-6">
                        <span class="text-md font-semibold">
                            No se han encontrado anuncios
                        </span>
                    </TableCell>
                </TableRow>
            </TableBody>
            
            <TableBody v-else>
                <template v-for="(player) in filteredPlayers" :key="player.Player.Id">
                    <!-- Fila principal del jugador -->
                    <TableRow>
                        <TableCell colspan="3" class="font-semibold text-slate-500">
                            <RouterLink :to="`/player/${player.Player.Nickname}`">
                                {{ player.Player.Nickname }}
                            </RouterLink>
                        </TableCell>
                        <TableCell colspan="2" class="font-semibold text-slate-500">
                            <Badge>
                                {{ player.Player.FaceitElo }}
                            </Badge>
                        </TableCell>
                        <TableCell colspan="5" class="font-semibold text-slate-500">
                            <Player_roles_table :roles="player.InGameRole" />
                        </TableCell>
                        <TableCell colspan="2" class="font-semibold text-slate-500 flex justify-end pt-3 gap-4">
                            <Button size="xs" variant="outline">
                                <Icon class="h-8 w-8 transition-all" :icon="expandedPlayers.has(player.Player.FaceitId) ? 'ic:round-expand-less' : 'ic:round-expand-more'"  @click="toggleExpand(player.Player.FaceitId)" />
                            </Button>
                            <div v-if="user.PlayerID == player.Player.FaceitId || user.Role >= PERMISSIONS.ADMIN" class="flex gap-2">
                                <!-- Botón de editar -->
                                <Button size="xs" variant="secondary" @click="editPlayer(player)">
                                    <Icon class="h-5 w-5 transition-all" icon="iconoir:edit" />
                                </Button>
                                
                                <!-- Botón de eliminar -->
                                <Button size="xs" variant="destructive" @click="confirmDeletePlayer(player.Player.FaceitId)">
                                    <Icon class="h-5 w-5 transition-all" icon="material-symbols:delete" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    
                    <!-- Fila expandida con más datos, colocada justo debajo de la fila principal -->
                    <!-- Fila expandida con más datos, colocada justo debajo de la fila principal -->
                    <TableRow v-if="expandedPlayers.has(player.Player.FaceitId)" class="bg-gray-100 dark:bg-gray-900">
                        <!-- Ajuste de colspan a 12 para que la fila expandida ocupe todo el ancho -->
                        <TableCell colspan="12" class="p-4">
                            <div class="flex gap-2 w-full -mt-2">
                                <div class="w-2/12 flex flex-col justify-center items-center">
                                    <span class="text-xs text-slate-500">KD</span>
                                    <span class="text-xs dark:text-slate-300 text-slate-700">{{ player.Player.Stats.KdRatio }}</span>
                                </div>
                                <div class="w-2/12 flex flex-col justify-center items-center">
                                    <span class="text-xs text-slate-500">KR</span>
                                    <span class="text-xs dark:text-slate-300 text-slate-700">{{ player.Player.Stats.KrRatio }}</span>
                                </div>
                                <div class="w-2/12 flex flex-col justify-center items-center">
                                    <span class="text-xs text-slate-500">% Headshot</span>
                                    <span class="text-xs dark:text-slate-300 text-slate-700">{{ player.Player.Stats.HeadshotPercentAverage }}</span>
                                </div>
                                <div class="w-2/12 flex flex-col justify-center items-center">
                                    <span class="text-xs text-slate-500">Kills</span>
                                    <span class="text-xs dark:text-slate-300 text-slate-700">{{ player.Player.Stats.KillsAverage }}</span>
                                </div>
                                <div class="w-2/12 flex flex-col justify-center items-center">
                                    <span class="text-xs text-slate-500">Deaths</span>
                                    <span class="text-xs dark:text-slate-300 text-slate-700">{{ player.Player.Stats.DeathsAverage }}</span>
                                </div>
                                <div class="w-2/12 flex flex-col justify-center items-center">
                                    <span class="text-xs text-slate-500">Assists</span>
                                    <span class="text-xs dark:text-slate-300 text-slate-700">{{ player.Player.Stats.AssistAverage }}</span>
                                </div>
                                <div class="w-2/12 flex flex-col justify-center items-center">
                                    <span class="text-xs text-slate-500">MVPs</span>
                                    <span class="text-xs dark:text-slate-300 text-slate-700">{{ player.Player.Stats.MVPAverage }}</span>
                                </div>
                            </div>
                            <div class="flex gap-2 w-full mt-4">
                                <div class="w-2/12 flex flex-col justify-center items-center">
                                    <span class="text-xs text-slate-500">Horario</span>
                                    <span class="text-xs dark:text-slate-300 text-slate-700 text-center">{{ player.TimeTable }}</span>
                                </div>
                                <div class="w-2/12 flex flex-col justify-center items-center">
                                    <span class="text-xs text-slate-500">Equipos anteriores</span>
                                    <span class="text-xs dark:text-slate-300 text-slate-700 text-center">{{ player.OldTeams }}</span>
                                </div>
                                <div class="w-8/12 flex flex-col justify-center items-center">
                                    <span class="text-xs text-slate-500">Descripción</span>
                                    <span class="text-xs dark:text-slate-300 text-slate-700">{{ player.Description }}</span>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </template>
            </TableBody>
        </Table>
    </div>
</template>