<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import { DTO_CreateNews } from '@/api/dto/request';
import NewsItem from '@/components/ibercs/news/components/NewsItem.vue';
import { useToast } from '@/components/ui/toast';
import { INITIAL_News, News } from '@/entities/news';
import { PathRoutes } from '@/router';
import { useRouter } from 'vue-router';

const { toast } = useToast()
const router = useRouter()

const handleCreateNews = async (dto:News, publish:boolean) => {
    const payload:DTO_CreateNews = {
        Content: dto.Content,
        Image: dto.Image,
        Title: dto.Title,
        Publish: publish,
    }
    const res = await ApiBackend.News.Create(payload)
    if (res.ok) {
        toast({
            title:"Noticia creada",
            description:"Noticia creada satisfactoriamente, redirigiendo",
            duration: 4000
        })
        router.push(PathRoutes.News.replace(":id", res.data.Id.toString()))
    } else {
        toast({
            title:"Error inesperado",
            description:res.message,
            duration: 3000
        })
    }
}

</script>

<template>
    <section>
        <NewsItem :news="INITIAL_News" :editor="true" :handler="handleCreateNews"/>
    </section>
</template>