<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import NewsItem from '@/components/ibercs/news/components/NewsItem.vue';
import Loader from '@/components/ui/loader/Loader.vue';
import { News } from '@/entities/news';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const newsId = route.params.id;

const loading = ref<Boolean>(true)
const news = ref<News>()

onMounted(async () => {
    const res = await ApiBackend.News.GetNewsById(Number(newsId))
    if (res.ok) {
        loading.value = false
        news.value = res.data
    }
})
</script>

<template>
    <section v-if="loading">
        <Loader />
    </section>
    <section v-else>
        <div v-if="news == undefined">
        </div>
        <div v-else>
            <NewsItem :news="news" :editor="false"/>
        </div>
    </section>
</template>