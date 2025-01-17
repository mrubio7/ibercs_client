<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import { DTO_UpdateNews } from '@/api/dto/request';
import NewsItem from '@/components/ibercs/news/components/NewsItem.vue';
import Loader from '@/components/ui/loader/Loader.vue';
import { useToast } from '@/components/ui/toast';
import { INITIAL_News, News } from '@/entities/news';
import router from '@/router';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const { toast } = useToast();
const route = useRoute();
const newsId = route.params.id;
const hash = route.query.hash?.toString() || "";
const edit = route.query.mode;

const loading = ref<boolean>(true)
const news = ref<News>(INITIAL_News)
const editorMode = ref<boolean>(edit == "edit" ? true : false)

watchEffect(async () => {
    const res = await ApiBackend.News.GetNewsById(Number(newsId), hash)
    if (res.ok) {
        loading.value = false
        news.value = res.data
        return
    }
    router.push("/")
})

const handlerUpdate = async (req:News) => {
    const payload:DTO_UpdateNews = {
        Id: req.Id,        
        Content: req.Content,
        Image: req.Image,
        Title: req.Title
    }
    const res = await ApiBackend.News.Update(payload)
    if (res.ok) {
        news.value = res.data
        toast({
            title: "Noticia actualizada",
            description: "La noticia se ha actualizado correctamente.",
            duration: 3000
        })
    }
    editorMode.value = false
}

watchEffect(() => {
    editorMode.value = editorMode.value
})
</script>

<template>
    <section v-if="loading">
        <Loader />
    </section>
    <section v-else>
        <div v-if="news?.Id === 0">
        </div>
        <div v-else>
            <NewsItem :news="news" :editor="editorMode" :handler="handlerUpdate"/>
        </div>
    </section>
</template>