<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Editor from '@/components/ui/editor/editor.vue';
import IconButton from '@/components/ui/icon-button/IconButton.vue';
import Input from '@/components/ui/input/Input.vue';
import { News } from '@/entities/news';
import { PropType, ref, watchEffect } from 'vue';
import { ReloadIcon } from '@radix-icons/vue'
import AlertDialog from '@/components/ui/alert-dialog/AlertDialog.vue';
import AlertDialogTrigger from '@/components/ui/alert-dialog/AlertDialogTrigger.vue';
import AlertDialogContent from '@/components/ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogHeader from '@/components/ui/alert-dialog/AlertDialogHeader.vue';
import AlertDialogTitle from '@/components/ui/alert-dialog/AlertDialogTitle.vue';
import AlertDialogDescription from '@/components/ui/alert-dialog/AlertDialogDescription.vue';
import AlertDialogFooter from '@/components/ui/alert-dialog/AlertDialogFooter.vue';
import AlertDialogCancel from '@/components/ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogAction from '@/components/ui/alert-dialog/AlertDialogAction.vue';
import { ApiBackend } from '@/api/api_backend';
import router, { PathRoutes } from '@/router';

const props = defineProps({
    news: {
        required:true,
        type: Object as PropType<News>
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

const editMode = ref<boolean>(false)

watchEffect(() => {
    editMode.value = props.editor;
});

const setEditMode = () => {
    editMode.value = true
}

const saving = ref<boolean>(false)
const handlerSave = async () => {
    saving.value = true
    if (props.handler) {
        await props.handler(props.news, false)
        saving.value = false
    }
}
const handlerSaveAndPublish = async () => {
    saving.value = true
    if (props.handler) {
        await props.handler(props.news, true)
        saving.value = false
    }
}

const updating = ref<boolean>(false)
const handlerUpdate = async (news: News, publish:boolean) => {
    updating.value = true
    if (props.handler) {
        await props.handler(news, publish)
        editMode.value = false
        updating.value = false
    }
}

const deleting = ref<boolean>(false)
const handlerDelete = async (id: number) => {
    deleting.value = true
    const res = await ApiBackend.News.Delete(id)
    if (res.ok) {
        router.push(PathRoutes.NewsHome)
    }
}

const tempImage = ref<string>("")
watchEffect(() => {
    if (props.news.Image == "") {
        props.news.Image = tempImage.value
    }
})
</script>

<template>
    <div class="flex">
        <img v-if="!editMode" class="w-60 rounded aspect-auto image" :src="props.news.Image" :style="'mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 70%); -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 70%); mask-size: 100% 100%; mask-repeat: no-repeat;'"></img>
        <img v-if="editMode" class="w-60 rounded aspect-auto image" :src="tempImage" :style="'mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 70%); -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 70%); mask-size: 100% 100%; mask-repeat: no-repeat;'"></img>
        <div class="flex flex-col w-full">
            <div v-if="editMode"  class="flex flex-col gap-2 w-full pl-2">
                <Input v-model="tempImage" placeholder="Link de la imagen" class="w-full" />
                <Input v-model="props.news.Title" placeholder="Título" class="w-full text-2xl h-max" />
            </div>
            <div v-if="!editMode" class="pr-2 flex items-center gap-4">
                <div class="px-6 flex items-center gap-2 w-full">
                    <span class="font-semibold text-slate-500 dark:text-slate-500"><span class="text-sm text-slate-400 dark:text-slate-600">Noticia creada por</span> {{ news?.CreatedBy.Username }}</span>
                    <IconButton v-if="props.news.CreatedBy.Profile.Twitter != ''" size="sm" icon="ri:twitter-x-line" :url="`https://x.com/${props.news.CreatedBy.Profile.Twitter}`" />
                    <IconButton v-if="props.news.CreatedBy.Profile.Instagram != ''" size="sm" icon="mdi:instagram" :url="`https://x.com/${props.news.CreatedBy.Profile.Instagram}`" />
                </div>
                <span  class="font-semibold text-slate-400 dark:text-slate-700">{{ new Date(news!.CreatedAt).toLocaleDateString() }}</span>
                <Button @click="setEditMode" variant="outline" size="sm">Editar</Button>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant="destructive" size="sm" :disabled="deleting">
                            <ReloadIcon v-if="deleting" class="w-4 h-4 mr-2 animate-spin" />
                            Eliminar
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar noticia?</AlertDialogTitle>
                            <AlertDialogDescription>
                                <div class="flex flex-col gap-2">
                                    <span>Estás a punto de eliminar la noticia:</span>
                                    <span>{{news.Title}}</span>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Atras</AlertDialogCancel>
                            <AlertDialogAction @click="handlerDelete(news.Id)">Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                
            </div>
            <span v-if="!editMode"  class="font-semibold text-2xl text-slate-800 dark:text-slate-200 w-full pl-4 mt-4">{{ props.news.Title }}</span>
        </div>
        
    </div>
    <div class="mt-4">
        <Editor v-if="!editMode" v-model="props.news.Content" :toolbar="false" />
        <Editor v-if="editMode" v-model="props.news.Content" :toolbar="true" />
    </div>
    <div v-if="props.handler && props.news.Id == 0" class="flex justify-end mt-2 gap-2">
        <Button variant="outline" @click="handlerSave" :disabled="saving">
            <ReloadIcon v-if="saving" class="w-4 h-4 mr-2 animate-spin" />
            Guardar
        </Button>
        <Button variant="secondary" @click="handlerSaveAndPublish" :disabled="saving">
            <ReloadIcon v-if="saving" class="w-4 h-4 mr-2 animate-spin" />
            Guardar y Publicar
        </Button>
    </div>
    <div v-if="props.handler && editMode && props.news.Id > 0" class="flex justify-end mt-2 gap-2">
        <Button variant="outline" @click="handlerUpdate" :disabled="updating">
            <ReloadIcon v-if="updating" class="w-4 h-4 mr-2 animate-spin" />
            Actualizar
        </Button>
    </div>
</template>