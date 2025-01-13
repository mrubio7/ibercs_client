<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import { DTO_UpdateUser } from '@/api/dto/request';
import Button from '@/components/ui/button/Button.vue';
import IconButton from '@/components/ui/icon-button/IconButton.vue';
import InputIcon from '@/components/ui/input-icon/InputIcon.vue';
import Input from '@/components/ui/input/Input.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import { useToast } from '@/components/ui/toast';
import { Roles } from '@/entities/roles';
import { User } from '@/entities/user';
import { PropType, ref } from 'vue';

const { toast } = useToast()

const props = defineProps({
    user: {
        required: true,
        type: Object as PropType<User>
    },
    roles: {
        required: true,
        type: Object as PropType<Roles>
    },
    myProfile: {
        required: false,
        type: Boolean,
    }
})

const setPayload = (user:User):DTO_UpdateUser => {
    return {
        Description: user.Profile.Description,
        Instagram: user.Profile.Instagram,
        Kick: user.Profile.Kick,
        SteamURL: user.Profile.SteamURL,
        Twitch: user.Profile.Twitch,
        Twitter: user.Profile.Twitter,
        Username: user.Username
    }
}

const editMode = ref<Boolean>(false)
const payload = ref<DTO_UpdateUser>(setPayload(props.user))

const handleUpdateUser = async () => {
    const res = await ApiBackend.Users.UpdateProfile(payload.value)
    if (!res.ok) {
        toast({
            variant: "destructive",
            title: "Error inesperado",
            description: "Su perfil no se ha podido actualizar"
        })
        return
    }
    toast({
        title: "Perfil actualizado",
        description: "Su perfil ha sido actualizado con éxito"
    })
    editMode.value = false
}

</script>

<template>
    <section>
        <div class="grid grid-cols-3 gap-2">
            <div class="grid grid-cols-3 gap-4">
                <img :src="props.user.Avatar" class="rounded border-2"></img>
                <div class="flex flex-col gap-2">
                    <span class="text-2xl font-bold text-slate-700 dark:text-slate-300">{{ props.user.Player?.Nickname }}</span>
                    <span v-if="props.user.Username != props.user.Player?.Nickname && !editMode" class="text-xl font-semibold text-slate-500">{{ payload.Username }}</span>
                    <Input v-if="editMode" v-model="payload.Username" placeholder="Nombre de usuario" class="w-48" />
                </div>
            </div>
            <div class="col-span-2 h-full">
                <div v-if="myProfile || props.roles.SuperAdmin" class="flex flex-col items-end gap-2 h-full justify-between">
                    <div class="flex justify-end items-center gap-3">
                        <IconButton v-if="!editMode" icon="cib:faceit" :url="`https://www.faceit.com/es/players/${props.user.Player?.Nickname}`" />
                        <IconButton v-if="!editMode" :disabled="payload.Twitter == ''"  icon="ri:twitter-x-line" :url="`https://x.com/${payload.Twitter}`" />
                        <InputIcon v-if="editMode" placeholder="Usuario" icon="ri:twitter-x-line" v-model="payload.Twitter" />
                        <IconButton v-if="!editMode" :disabled="payload.Twitch == ''" icon="mdi:twitch" :url="`https://www.twitch.tv/${payload.Twitch}`" />
                        <InputIcon v-if="editMode" placeholder="Usuario" icon="mdi:twitch" v-model="payload.Twitch" />
                        <IconButton v-if="!editMode" :disabled="payload.Kick == ''" icon="ri:kick-fill" :url="`https://kick.com/${payload.Kick}`" />
                        <InputIcon v-if="editMode" placeholder="Usuario" icon="ri:kick-fill" v-model="payload.Kick" />
                        <IconButton v-if="!editMode" :disabled="payload.Instagram == ''" icon="mdi:instagram" :url="`https://www.instagram.com/${payload.Instagram}`" />
                        <InputIcon v-if="editMode" placeholder="Usuario" icon="mdi:instagram" v-model="payload.Instagram" />
                        <IconButton v-if="!editMode" :disabled="payload.SteamURL == ''" icon="mdi:steam" :url="`${payload.SteamURL}`" />
                        <InputIcon v-if="editMode" placeholder="Link de perfil" icon="mdi:steam" v-model="payload.SteamURL" />
                        <Button v-if="!editMode" class="w-fit" variant="secondary" @click="editMode = true">Editar perfil</Button>
                    </div>
                    <div class="w-full">
                        <Textarea :disabled="!editMode" v-model="payload.Description" placeholder="Bio" class="bg-slate-900"></Textarea>
                    </div>
                    <div v-if="editMode" class="flex justify-end items-end">
                        <Button @click="handleUpdateUser">Guardar</Button>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>