<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import Editor from '@/components/ui/editor/editor.vue';
import IconButton from '@/components/ui/icon-button/IconButton.vue';
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
            <div class="flex">
                <img class="w-60 rounded aspect-auto" :src="news.Image" :style="'mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 70%); -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 70%); mask-size: 100% 100%; mask-repeat: no-repeat;'"></img>
                <div class="flex flex-col justify-between w-full">
                    <div class="flex justify-between w-full items-start items-center gap-2 px-4 h-fit">
                        <span class="font-semibold text-xl text-slate-800 dark:text-slate-200">{{ news.Title }}</span>
                        <span class="font-semibold text-slate-400 dark:text-slate-700">{{ new Date(news.CreatedAt).toLocaleDateString() }}</span>
                    </div>
                    <div class="mb-8 px-6 flex items-center gap-2">
                        <span class="font-semibold text-slate-500 dark:text-slate-500 mb-0.5"><span class="text-sm text-slate-400 dark:text-slate-600">Noticia creada por</span> {{ news.CreatedBy.Username }}</span>
                        <IconButton v-if="news.CreatedBy.Profile.Twitter != ''" size="sm" icon="ri:twitter-x-line" :url="`https://x.com/${news.CreatedBy.Profile.Twitter}`" />
                        <IconButton v-if="news.CreatedBy.Profile.Instagram != ''" size="sm" icon="mdi:instagram" :url="`https://x.com/${news.CreatedBy.Profile.Instagram}`" />
                    </div>
                </div>
                
            </div>
            <div>
                <Editor :value="news.Content" :toolbar="false" />
            </div>
        </div>
    </section>
</template>