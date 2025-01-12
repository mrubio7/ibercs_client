<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import Multiselect from '@/components/ui/multiselect/multiselect.vue';
import { PLAYER_ROLES } from '@/libs/consts';
import { LookingForTeamModel } from '@/entities/lftplayer';
import { PlayerModel } from '@/entities/players';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    initialData: {
        type: Object as () => LookingForTeamModel,
        default: null
    },
    initialId: {
        type: String,
        default: null
    }
});
  
const emit = defineEmits(['close', 'submit']);
  
// Opciones para los roles en el juego
const roleOptions = Object.entries(PLAYER_ROLES).map(([key, value]) => ({
    value: key,
    label: value
}));

// Inicializa el formulario con un objeto que cumpla con la interfaz LookingForTeamModel
const form = ref<LookingForTeamModel>({
    InGameRole: [],
    TimeTable: '',
    OldTeams: '',
    PlayingYears: 0,
    Description: '',
    Player: {} as PlayerModel,
    FaceitId: ''
});

// Detectar modo de edición y cargar los datos iniciales
watch(
    () => props.initialData,
    (newData) => {
        if (newData) {
            form.value = { ...newData }; // Cargar los datos iniciales en el formulario
        }
    },
    { immediate: true }
);

// Cerrar el modal
const closeModal = () => {
    emit('close');
};

// Enviar los datos
const submitForm = () => {
    emit('submit', form.value);
    closeModal();
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="dark:bg-slate-900 bg-slate-100 border-2 rounded-lg p-6 w-full max-w-lg">
            <h2 class="text-xl font-semibold mb-4">
                {{ props.initialData ? 'Actualizar anuncio de búsqueda de equipo' : 'Publicar anuncio de búsqueda de equipo' }}
            </h2>
            
            <!-- Formulario para los campos del modelo -->
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Roles en el Juego</label>
                <Multiselect v-model="form.InGameRole" width="450" :options="roleOptions" placeholder="Selecciona roles" multiple />
            </div>
    
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Disponibilidad Horaria</label>
                <Input v-model="form.TimeTable" type="text" class="rounded p-2 w-full" placeholder="Ej. Tardes, Fines de semana" />
            </div>
    
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Equipos Anteriores</label>
                <Input v-model="form.OldTeams" type="text" class="rounded p-2 w-full" placeholder="Ej. Equipo1, Equipo2" />
            </div>
    
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Años Jugando</label>
                <Input v-model.number="form.PlayingYears" type="number" class="rounded p-2 w-full" min="0" />
            </div>
    
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Descripción</label>
                <Textarea v-model="form.Description" class="rounded p-2 w-full" placeholder="Describe tu estilo de juego, experiencia, etc."></Textarea>
            </div>
    
            <!-- Botones de acción -->
            <div class="flex justify-between gap-4 mt-6">
                <Button variant="destructive" @click="closeModal" class="rounded px-4 py-2">Cancelar</Button>
                <Button variant="outline" @click="submitForm" class="rounded px-4 py-2">
                    {{ props.initialData ? 'Actualizar' : 'Publicar' }}
                </Button>
            </div>
        </div>
    </div>
</template>
