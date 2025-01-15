<script setup lang="ts">
import { News } from '@/entities/news';
import { PathRoutes } from '@/router';
import { PropType } from 'vue';

const props = defineProps({
    news: {
        required: true,
        type: Object as PropType<News>
    },
    preview: {
        required: true,
        type: Boolean
    }
})

const convertToText = (html:string):string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
}
</script>

<template>
    <RouterLink :to="PathRoutes.News.replace(':id', props.news.Id.toString())">
        <div class="border rounded hover:border-slate-400 hover:dark:border-slate-700 cursor-pointer transition-all overflow-hidden">
            <div class="flex" :class="`${props.preview ? 'h-12': 'h-28'}`">
                <img class="relative image" :src="props.news.Image" 
                    :style="'mask-image: linear-gradient(to right, #000 -20%, rgba(0,0,0,0) 90%); -webkit-mask-image: linear-gradient(to right, #000 -20%, rgba(0,0,0,0) 90%); mask-size: 100% 100%; mask-repeat: no-repeat;'"
                ></img>
                <div class="flex flex-col justify-center gap-2 w-11/12">
                    <div v-if="!props.preview" class="text-xs flex items-center gap-2 -mb-1 -mt-2">
                        <span class="font-semibold text-slate-500 dark:text-slate-500">{{ props.news.CreatedBy.Username }}</span>
                        <span class="font-semibold text-slate-400 dark:text-slate-700">{{ new Date(props.news.CreatedAt).toLocaleDateString() }}</span>
                    </div>
                    <span v-if="!props.preview" class="text-xl -my-0 font-semibold text-nowrap text-ellipsis truncate">{{props.news.Title}}</span>
                    <span v-else class="text-md -ml-2 w-80 -my-0 font-semibold text-nowrap text-ellipsis truncate">{{ props.news.Title }}</span>
                    <div v-if="!props.preview" class="flex flex-col">
                        <span class="text-xs text-slate-500 textWrap pr-8 -mt-1">
                            {{ convertToText(props.news.Content) }}
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
}
.image {
    width: 160px; /* Fija el ancho de la imagen */
    height: 100%; /* La altura se adapta al contenedor */
    object-fit: cover; /* Mantiene la proporción y recorta si es necesario */
}
</style>