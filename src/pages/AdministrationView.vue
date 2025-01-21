<script setup lang="ts">
import ApiPermissions from '@/api/api_permissions';
import NewsManagement from '@/components/ibercs/administration/components/NewsManagement.vue';
import RoleManagement from '@/components/ibercs/administration/components/RoleManagement.vue';
import TeamManagement from '@/components/ibercs/administration/components/TeamManagement.vue';
import AddTeamPopup from '@/components/ibercs/team/components/AddTeamPopup.vue';
import Button from '@/components/ui/button/Button.vue';
import Title from '@/components/ui/title/Title.vue'
import router, { PathRoutes } from '@/router';
import { watchEffect } from 'vue';

document.title = "IBERCS - Administración"

watchEffect(() => {
    if (!ApiPermissions.SuperAdmin.value) {
        router.push("/");
    }
})
</script>
<template>
    <Title text="Administración" />
    <section class="flex flex-col gap-4">
        <div class="flex flex-col border rounded p-2">
            <span class="text-md font-semibold text-slate-500 pl-2">Gestionar roles</span>
            <div class="flex pt-2">
                <RoleManagement />
            </div>
        </div>
        <div class="p-2 border rounded">
            <div class="flex justify-between">
                <span class="text-md font-semibold text-slate-500 pl-2 w-full">Gestionar equipos</span>
                <AddTeamPopup />
            </div>
            <div class="flex pt-2">
                <TeamManagement />
            </div>
        </div>
        <div class="p-2 border rounded">
            <div class="flex justify-between">
                <span class="text-md font-semibold text-slate-500 pl-2 w-full">Gestionar noticias</span>
                <RouterLink :to="PathRoutes.CreateNews" class="flex justify-end w-full mb-2">
                    <Button size="sm" variant="secondary">Crear noticia</Button>
                </RouterLink>
            </div>
            <div class="flex pt-2">
                <NewsManagement />
            </div>
        </div>
    </section>
</template>