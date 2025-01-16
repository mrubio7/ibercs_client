<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import { DTO_UpdateFreeAgent } from '@/api/dto/request';
import FreeAgent_Edit from '@/components/ibercs/players/components/FreeAgent_Edit.vue';
import UserProfile from '@/components/ibercs/user/components/UserProfile.vue';
import UserState from '@/components/ibercs/user/user_state';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Button from '@/components/ui/button/Button.vue';
import Loader from '@/components/ui/loader/Loader.vue'
import { useToast } from '@/components/ui/toast';
import { INITIAL_USER_AUTH, User_Auth } from '@/entities/user';
import { ref, watchEffect } from 'vue';

const myUser = ref<User_Auth>(INITIAL_USER_AUTH)
const loader = ref<Boolean>(true)

watchEffect(() => {
    myUser.value = UserState
    if (myUser.value.FaceitId !== "") {
        loader.value = false
    }
})

const freeAgent = ref<DTO_UpdateFreeAgent>({Description:"",FaceitId:"",InGameRoles:[],Publish:false})
watchEffect(() => {
    if (myUser.value.Player != undefined) {
        freeAgent.value.Description = myUser.value.Player.FreeAgent.Description
        freeAgent.value.FaceitId = myUser.value.Player.FaceitId
        freeAgent.value.InGameRoles = myUser.value.Player.FreeAgent.InGameRoles
        freeAgent.value.Publish = myUser.value.Player.FreeAgent.Publish
    }
    
})

const { toast } = useToast()
const editFreeAgent = ref<boolean>(false)
const handleEditFreeAgent = async () => {
    const res = await ApiBackend.Players.UpdateFreeAgent(freeAgent.value)
    if (res.ok) {
        toast({
            title: "Anuncio de jugador publicado",
            description: "El anuncio ha sido publicado"
        })
        editFreeAgent.value = false
        return
    }
    toast({
        title: "Error",
        description: "El anuncio no se ha podido publicar"
    })
}
</script>

<template>
    <section v-if="loader">
        <div class="pt-2 pb-4">
            <Loader />
        </div>
    </section>
    <section v-else>
        <div v-if="myUser">
            <UserProfile :user="myUser" :roles="myUser.Roles" :my-profile="true" />
        </div>
        <div class="mt-2">
            <Accordion type="single" collapsible>
                <AccordionItem value="freeagent">
                    <AccordionTrigger class="hover:no-underline pl-2">
                        Anuncio de jugador libre
                    </AccordionTrigger>
                    <AccordionContent>
                        <div class="flex flex-col items-end w-full">
                            <FreeAgent_Edit v-model="freeAgent" :editable="editFreeAgent" />
                            <div class="flex gap-2 mt-2">
                                <Button size="sm" variant="secondary" @click="editFreeAgent = !editFreeAgent">{{ editFreeAgent ? 'Cancelar' : 'Editar' }}</Button>
                                <Button v-if="editFreeAgent" size="sm" @click="handleEditFreeAgent">Modificar</Button>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </section>
</template>