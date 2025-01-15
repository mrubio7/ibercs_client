<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import ApiPermissions from '@/api/api_permissions';
import ComboBox from '@/components/ui/combo-box/ComboBox.vue';
import Loader from '@/components/ui/loader/Loader.vue';
import Switch from '@/components/ui/switch/Switch.vue';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { User_Auth } from '@/entities/user';
import { ref, watchEffect } from 'vue';

const loading = ref<Boolean>(true)
const userOpts = ref<{value:string, label:string}[]>([])
const roleOpts = Object.keys(ApiPermissions).filter(k => k !== "SuperAdmin").map(k => ({ value: k, label: k }))

watchEffect(async () => {
    if (ApiPermissions.SuperAdmin) {
        const res = await ApiBackend.Admin.GetUsersWithRoles()
        if (res.ok) {
            loading.value = false
            userOpts.value = Array.from(res.data as User_Auth[]).map((user) => ({ value: user.Id.toString(), label: user.Username }))
        }
    }
})

const usersIdChosen = ref<string>()
const optionsChosen = ref<string>()
const createRole = ref<boolean>(false)
const updateRole = ref<boolean>(false)
const deleteRole = ref<boolean>(false)
</script>

<template>
    <div class="w-full rounded overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-4/12">Usuario</TableHead>
                    <TableHead class="w-2/12">Rol</TableHead>
                    <TableHead class="w-2/12 text-center">Crear</TableHead>
                    <TableHead class="w-2/12 text-center">Editar</TableHead>
                    <TableHead class="w-2/12 text-center">Eliminar</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-if="loading">
                    <TableCell colspan="5">
                        <Loader :horizontal="true" class="p-1" />
                    </TableCell>
                </TableRow>
                <TableRow v-else>
                    <TableCell class="font-medium text-center">
                        <ComboBox :model-value="usersIdChosen" :options="userOpts" placeholder="Usuario" search-placeholder="Buscar usuario" />
                    </TableCell>
                    <TableCell class="font-medium text-center">
                        <ComboBox :model-value="optionsChosen" :options="roleOpts" placeholder="Rol" search-placeholder="Buscar rol" />
                    </TableCell>
                    <TableCell class="font-medium text-center">
                        <Switch :checked="createRole" />
                    </TableCell>
                    <TableCell class="font-medium text-center">
                        <Switch :checked="updateRole" />
                    </TableCell>
                    <TableCell class="font-medium text-center">
                        <Switch :checked="deleteRole" />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>