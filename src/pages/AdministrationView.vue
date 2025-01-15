<script setup lang="ts">
import ApiPermissions from '@/api/api_permissions';
import NewsManagement from '@/components/ibercs/administration/components/NewsManagement.vue';
import RoleManagement from '@/components/ibercs/administration/components/RoleManagement.vue';
import Title from '@/components/ui/title/Title.vue'
import router from '@/router';
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
            <span class="text-md font-semibold text-slate-500 pl-2">Gestionar noticias</span>
            <div class="flex pt-2">
                <NewsManagement />
            </div>
        </div>
    </section>
</template>