<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import { DTO_CreateTeam } from '@/api/dto/request';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import Button from '@/components/ui/button/Button.vue';
import Icon from '@/components/ui/icon/Icon.vue';
import Input from '@/components/ui/input/Input.vue';
import Loader from '@/components/ui/loader/Loader.vue';
import { useToast } from '@/components/ui/toast';
import { FaceitTeam } from '@/entities/team';
import { onMounted, ref, watchEffect } from 'vue';

const { toast } = useToast()
const faceitTeamUrl = ref<string>("")
const loadingTeam = ref<boolean>(true)
const teamRetrieved = ref<FaceitTeam>()

onMounted(() => {
    faceitTeamUrl.value = ""
})

watchEffect( async () => {
    if (faceitTeamUrl.value != "") {
        loadingTeam.value = true
        const faceitId = faceitTeamUrl.value.split("/").pop()
        const res = await ApiBackend.Teams.GetTeamFromFaceit(faceitId!)
        if (res.ok) {
            loadingTeam.value = false
            teamRetrieved.value = res.data
        }
    }
})
const handlerCreate = async () => {
    const payload:DTO_CreateTeam = {
        FaceitId: teamRetrieved.value!.FaceitId,
        Name: teamRetrieved.value!.Name,
        Avatar: teamRetrieved.value!.Avatar,
        Tag: teamRetrieved.value!.Tag,
        PlayersId: teamRetrieved.value!.Members.map(x => x.FaceitId)
    }
    const res = await ApiBackend.Teams.CreateTeam(payload)
    if (res.ok) {
        toast({
            title: "Equipo creado",
            description: "El equipo ha sido creado correctamente, un administrador lo revisará y lo aprobará",
        })
        return
    }
    toast({
        title: "Error",
        description: "Ha ocurrido un error al crear el equipo",
    })
}
</script>

<template>
    <AlertDialog>
        <AlertDialogTrigger>
            <Button size="sm" variant="secondary">Proponer equipo</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Añadir equipo</AlertDialogTitle>
                <AlertDialogDescription>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-col gap-1">
                            <label>
                                Link del equipo
                            </label>
                            <Input v-model="faceitTeamUrl" label="ID de Faceit" placeholder="Ej.: https://www.faceit.com/en/teams/c401cb6d-4578-4244-9fb0-cc1ff81ed747" />
                        </div>
                        <div v-if="faceitTeamUrl != ''">
                            <div v-if="loadingTeam" class="p-4">
                                <Loader />
                            </div>
                            <div v-else class="p-2 border rounded my-4">
                                <div class="flex flex-col gap-4">
                                    <div class="flex gap-4">
                                        <Avatar shape="square" size="sm" >
                                            <AvatarImage :src="teamRetrieved?.Avatar!" />
                                        </Avatar>
                                        <span class="font-bold text-3xl">{{ teamRetrieved?.Name }}</span>
                                    </div>
                                    <div class="flex flex-col ml-2">
                                        <div class="font-semibold text-sm flex items-center gap-2" v-for="member in teamRetrieved?.Members">
                                            <img :src="member.Avatar" class="w-4 h-4 rounded" />
                                            <Icon :icon="`flag:${member.Country}-4x3`" />
                                            <span>{{ member.Nickname }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Atras</AlertDialogCancel>
                <AlertDialogAction @click="handlerCreate" :disabled="teamRetrieved?.FaceitId == ''">Crear</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>