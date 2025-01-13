<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import NewsPreview from './NewsPreview.vue';
import { ApiBackend } from '@/api/api_backend';
import { News } from '@/entities/news';

const newsList = ref<News[]>([])

watchEffect(async() => {
    const res = await ApiBackend.News.GetLatestNews(3)
    if (res.ok) {
        newsList.value = res.data
    }
})
</script>

<template>
    <NewsPreview :news="newsList[0]" />
</template>