<script setup lang="ts">
import { News } from '@/entities/news';
import { PropType } from 'vue';

const props = defineProps({
    news: {
        required: true,
        type: Object as PropType<News>
    }
})
</script>

<template>
    <a class="border rounded hover:border-slate-400 hover:dark:border-slate-700 cursor-pointer transition-all overflow-hidden">
        <div class="p-4 flex  h-24">
            <img class="w-40 -m-4" :src="props.news.Image" :style="'mask-image: linear-gradient(to right, #000 0%, rgba(0,0,0,0) 95%); -webkit-mask-image: linear-gradient(to right, #000 0%, rgba(0,0,0,0) 95%); mask-size: 100% 100%; mask-repeat: no-repeat;'"></img>
            <div class="flex flex-col gap-2 w-full px-2">
                <span class="text-xl font-semibold">{{props.news.Title}}</span>
                <div class="flex gap-4 justify-between">
                    <div class="flex items-center gap-2 -mb-2">
                        <span class="text-sm font-semibold text-slate-600 dark:text-slate-400">{{ props.news.CreatedBy.Username }}</span>
                    </div>
                    <span class="text-sm font-semibold text-slate-500 dark:text-slate-500">{{ new Date(props.news.CreatedAt).toLocaleDateString() }}</span>
                </div>
            </div>
        </div>
    </a>
</template>
