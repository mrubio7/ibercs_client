<script setup lang="ts">
import NewsList from '@/components/ibercs/news/components/NewsList.vue';

document.title = "IBERCS - Noticias"
</script>

<template>
    <NewsList :preview="false" />
</template>