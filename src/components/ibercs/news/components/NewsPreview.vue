<script setup lang="ts">
import { News } from '@/entities/news';
import { PathRoutes } from '@/router';
import { PropType } from 'vue';

const props = defineProps({
    news: {
        required: true,
        type: Object as PropType<News>
    }
})
</script>

<template>
    <RouterLink :to="PathRoutes.News.replace(':id', props.news.Id.toString())">
        <div class="border rounded hover:border-slate-400 hover:dark:border-slate-700 cursor-pointer transition-all overflow-hidden">
            <div class="flex h-28">
                <img class="-m-4 aspect-auto" :src="props.news.Image" :style="'mask-image: linear-gradient(to right, #000 0%, rgba(0,0,0,0) 90%); -webkit-mask-image: linear-gradient(to right, #000 0%, rgba(0,0,0,0) 90%); mask-size: 100% 100%; mask-repeat: no-repeat;'"></img>
                <div class="flex flex-col justify-center gap-2 w-full">
                    <div class="text-xs flex items-center gap-2 -mb-1 -mt-2">
                            <span class="font-semibold text-slate-500 dark:text-slate-500">{{ props.news.CreatedBy.Username }}</span>
                            <span class="font-semibold text-slate-400 dark:text-slate-700">{{ new Date(props.news.CreatedAt).toLocaleDateString() }}</span>
                        </div>
                    <span class="text-xl -my-0 font-semibold text-nowrap text-ellipsis truncate">{{props.news.Title}}</span>
                    <div class="flex flex-col">
                        <span class="text-xs text-slate-500 textWrap pr-8 -mt-1">
                            {{ props.news.Content }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<style>
.textWrap {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   line-clamp: 2;
   -webkit-line-clamp: 2; /* number of lines to show */
   line-height: X;        /* fallback */
   max-height: X*N;       /* fallback */
}
</style>