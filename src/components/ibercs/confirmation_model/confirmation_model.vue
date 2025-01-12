<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import Button from '@/components/ui/button/Button.vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: 'Confirmación'
    },
    message: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => {
    emit('confirm');
};

const cancel = () => {
    emit('cancel');
};
</script>

<template>
    <div v-if="props.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-sm">
            <h2 class="text-lg font-semibold mb-4">{{ props.title }}</h2>
            <p class="text-sm mb-6">{{ props.message }}</p>
            <div class="flex justify-between gap-4">
                <Button variant="secondary" @click="cancel">Cancelar</Button>
                <Button variant="destructive" @click="confirm">Eliminar</Button>
            </div>
        </div>
    </div>
</template>
