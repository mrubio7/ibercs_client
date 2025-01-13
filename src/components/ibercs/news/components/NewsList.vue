<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import NewsPreview from './NewsPreview.vue';
import { ApiBackend } from '@/api/api_backend';
import { News } from '@/entities/news';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';

const newsList = ref<News[]>([])
const loading = ref<Boolean>(true)

onMounted(async() => {
    const res = await ApiBackend.News.GetLatestNews(3)
    if (res.ok) {
        newsList.value = res.data
        loading.value = false
    }
})
</script>

<template>
    <div v-if="loading" class="flex flex-col gap-2">
        <Skeleton class="w-full h-24 rounded" />
    </div>
    <div v-else>
        <div v-if="newsList.length > 0" class="flex flex-col gap-2">
            <NewsPreview v-for="n in newsList" :news="n" />
        </div>
    </div>
</template>