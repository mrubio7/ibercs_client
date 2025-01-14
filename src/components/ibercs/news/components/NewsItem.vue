<script setup lang="ts">
import { DTO_CreateNews } from '@/api/dto/request';
import Button from '@/components/ui/button/Button.vue';
import Editor from '@/components/ui/editor/editor.vue';
import IconButton from '@/components/ui/icon-button/IconButton.vue';
import Input from '@/components/ui/input/Input.vue';
import { News } from '@/entities/news';
import router, { PathRoutes } from '@/router';
import { PropType, ref, watchEffect } from 'vue';

const props = defineProps({
    news: {
        required:true,
        type: Object as PropType<News | null>
    },
    editor: {
        required:true,
        type: Boolean
    },
    handler: {
        required: false,
        type: Function
    }
})

const news = ref<News>()
const dtoCreate = ref<DTO_CreateNews>({
    Title:"",
    Image:"",
    Content:"",
    Publish: false
})

watchEffect(() => {
    if (props.news != null) {
        news.value = props.news
    }
})


</script>

<template>
    <div class="flex">
        <img v-if="!props.editor" class="w-60 rounded aspect-auto" :src="news!.Image" :style="'mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 70%); -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 70%); mask-size: 100% 100%; mask-repeat: no-repeat;'"></img>
        <img v-if="props.editor" class="w-60 rounded aspect-auto" :src="dtoCreate.Image" :style="'mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 70%); -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 70%); mask-size: 100% 100%; mask-repeat: no-repeat;'"></img>
        <div class="flex flex-col justify-between w-full">
            <div class="flex justify-between w-full items-start items-center gap-2 h-fit">
                <span v-if="!props.editor"  class="font-semibold text-xl text-slate-800 dark:text-slate-200 w-full pl-4">{{ news!.Title }}</span>
                <div class="flex flex-col gap-2 w-full">
                    <Input v-if="props.editor" v-model="dtoCreate.Image" placeholder="Link de la imagen" class="w-full" />
                    <Input v-if="props.editor" v-model="dtoCreate.Title" placeholder="Título" class="w-full text-2xl h-max" />
                </div>
                <span v-if="!props.editor"  class="font-semibold text-slate-400 dark:text-slate-700 pr-2">{{ new Date(news!.CreatedAt).toLocaleDateString() }}</span>
            </div>
            <div v-if="!props.editor" class="mb-8 px-6 flex items-center gap-2">
                <span class="font-semibold text-slate-500 dark:text-slate-500 mb-0.5"><span class="text-sm text-slate-400 dark:text-slate-600">Noticia creada por</span> {{ news?.CreatedBy.Username }}</span>
                <IconButton v-if="news?.CreatedBy.Profile.Twitter != ''" size="sm" icon="ri:twitter-x-line" :url="`https://x.com/${news?.CreatedBy.Profile.Twitter}`" />
                <IconButton v-if="news?.CreatedBy.Profile.Instagram != ''" size="sm" icon="mdi:instagram" :url="`https://x.com/${news?.CreatedBy.Profile.Instagram}`" />
            </div>
        </div>
        
    </div>
    <div class="mt-4">
        <Editor v-if="!props.editor" v-model="news!.Content" :toolbar="false" />
        <Editor v-if="props.editor" v-model="dtoCreate.Content" :toolbar="true" />
    </div>
    <div v-if="props.handler" class="flex justify-end mt-2 gap-2">
        <Button variant="outline" @click="props.handler(dtoCreate, false)">Guardar</Button>
        <Button variant="secondary" @click="props.handler(dtoCreate, true)">Guardar y Publicar</Button>
    </div>
</template>