<script setup lang="ts">
const props = defineProps({
    text: {
        required: true,
        type: String
    }
})
</script>

<template>
    <h3 class="text-lg font-semibold px-2 pb-2">
        {{props.text}}
    </h3>
</template>