<script setup lang="ts">
import ApiPermissions from '@/api/api_permissions';
import Role from '@/components/ibercs/administration/components/Role.vue';
import Title from '@/components/ui/title/Title.vue'
import router from '@/router';
import { watchEffect } from 'vue';

watchEffect(() => {
    if (!ApiPermissions.SuperAdmin) {
        router.push("/");
    }
})
</script>
<template>
    <Title text="Administración" />
    <section class="flex flex-col gap-4">
        <div class="flex flex-col border rounded p-2">
            <span class="text-md font-semibold text-slate-500">Gestionar Roles</span>
            <div class="flex justify-between items-center gap-4 pt-2">
                <Role />
            </div>
        </div>
        <div class="p-2 border rounded">
            <span>Gestionar noticias</span>
        </div>
    </section>
</template>