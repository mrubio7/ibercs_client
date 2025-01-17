<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import ApiPermissions from '@/api/api_permissions';
import { DTO_UpdatePublishNews } from '@/api/dto/request';
import { AlertDialogHeader, AlertDialogContent, AlertDialog, AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import IconButton from '@/components/ui/icon-button/IconButton.vue';
import Loader from '@/components/ui/loader/Loader.vue';
import Switch from '@/components/ui/switch/Switch.vue';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/toast';
import { NewsWithCode } from '@/entities/news';
import { PathRoutes } from '@/router';
import { ref, watchEffect } from 'vue';

const { toast } = useToast()

const loading = ref<Boolean>(true)
const newsList = ref<NewsWithCode[]>()

watchEffect(async () => {
    if (ApiPermissions.SuperAdmin.value) {
        const res = await ApiBackend.Admin.GetAllNews()
        if (res.ok) {
            loading.value = false
            newsList.value = res.data
        }
    }
})

const handleUpdatePublish = async (id:number, publish:boolean) => {
    debugger
    loading.value = true
    const dto:DTO_UpdatePublishNews = {
        Id: id,
        Publish: publish
    }
    const res = await ApiBackend.Admin.UpdatePublishNews(dto)
    if (res.ok) {
        const res = await ApiBackend.Admin.GetAllNews()
        if (res.ok) {
            loading.value = false
            newsList.value = res.data
            toast({
                title: publish ? "Noticia publicada" : "Noticia despublicada",
                description: publish ? "La noticia se ha publicado con éxito" : "La noticia se ha despublicado con éxito",
            })
            return
        }
        toast({
            title: "Error",
            description: "Hubo un error en el servidor",
        })
    }
}

const handlerDelete = async (id: number) => {
    loading.value = true
    const res = await ApiBackend.News.Delete(id)
    if (res.ok) {
        const res = await ApiBackend.Admin.GetAllNews()
        if (res.ok) {
            loading.value = false
            newsList.value = res.data
            toast({
                title: "Noticia eliminada",
                description: "La noticia se ha eliminado con éxito",
            })
            return
        }
        toast({
            title: "Error",
            description: "Hubo un error en el servidor",
        })
    }
}

</script>

<template>
    <div class="w-full rounded overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-6/12">Título</TableHead>
                    <TableHead class="w-2/12">Fecha de creación</TableHead>
                    <TableHead class="w-1/12 text-center">Publicado</TableHead>
                    <TableHead class="w-2/12 text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-if="loading">
                    <TableCell colspan="4">
                        <Loader :horizontal="true" class="p-2" />
                    </TableCell>
                </TableRow>
                <TableRow v-else v-for="n in newsList">
                    <TableCell>{{ n.Title }}</TableCell>
                    <TableCell>{{ new Date(n.CreatedAt).toLocaleDateString() }}</TableCell>
                    <TableCell class="font-medium text-center">
                        <Switch @update:checked="handleUpdatePublish(n.Id, !n.Publish)" :checked="n.Publish" />
                    </TableCell>
                    <TableCell class="font-medium text-right">
                        <div class="flex justify-end gap-2">
                            <IconButton icon="mdi:eye" :url="PathRoutes.News.replace(':id', n.Id.toString())+`?hash=${n.Code}`" />
                            <IconButton icon="akar-icons:edit" :url="PathRoutes.News.replace(':id', n.Id.toString())+`?mode=edit&hash=${n.Code}`" />
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <IconButton v-if="ApiPermissions.News.Delete" icon="material-symbols:delete-outline-rounded" />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Eliminar noticia?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            <div class="flex flex-col gap-2">
                                                <span>Estás a punto de eliminar la noticia:</span>
                                                <span>{{n.Title}}</span>
                                            </div>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Atras</AlertDialogCancel>
                                        <AlertDialogAction @click="handlerDelete(n.Id)">Eliminar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>