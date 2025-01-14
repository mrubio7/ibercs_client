<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import { DTO_CreateNews } from '@/api/dto/request';
import NewsItem from '@/components/ibercs/news/components/NewsItem.vue';

const handleCreateNews = async (dto:DTO_CreateNews, publish:boolean) => {
    dto.Publish = publish
    const res = await ApiBackend.News.Create(dto)
    if (res.ok) {
       
    }
}

</script>

<template>
    <section>
        <NewsItem :news="null" :editor="true" :handler="handleCreateNews"/>
    </section>
</template>