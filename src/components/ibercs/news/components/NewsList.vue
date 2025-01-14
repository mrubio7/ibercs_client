<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import NewsPreview from './NewsPreview.vue';
import { ApiBackend } from '@/api/api_backend';
import { News } from '@/entities/news';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import Title from '@/components/ui/title/Title.vue';
import Button from '@/components/ui/button/Button.vue';
import { User, User_Auth } from '@/entities/user';
import UserState from '../../user/user_state';
import { RouterLink } from 'vue-router';
import { PathRoutes } from '@/router';

const props = defineProps({
    preview: {
        required: false,
        type: Boolean,
        default: false
    }
})


const newsList = ref<News[]>([])
const loading = ref<Boolean>(true)

const newsNumber = props.preview ? 3 : 6;

const user = ref<User_Auth>()

onMounted(async() => {
    const res = await ApiBackend.News.GetLatestNews(newsNumber)
    if (res.ok) {
        newsList.value = res.data
        loading.value = false
    }
})

watchEffect(() => {
    user.value = UserState
})
</script>

<template>
    <div class="flex justify-between items-center">
        <Title :text="props.preview ? 'Últimas noticias' : 'Noticias'" />
        <RouterLink :to="PathRoutes.CreateNews" v-if="user?.Roles.SuperAdmin || user?.Roles.News.Create">
            <Button size="sm" variant="secondary">Crear noticia</Button>
        </RouterLink>
    </div>
    <div v-if="loading" class="flex flex-col gap-2 ">
        <Skeleton v-for="_ in newsNumber" class="w-full h-28 rounded" />
    </div>
    <div v-else>
        <div v-if="newsList.length > 0" class="flex flex-col">
            <div class="flex flex-col gap-2">
                <NewsPreview :preview="props.preview" v-for="n in newsList" :news="n" />
            </div>
        </div>
    </div>
</template>