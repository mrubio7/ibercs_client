<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import ApiPermissions from '@/api/api_permissions';
import { DTO_UpdateRole } from '@/api/dto/request';
import ComboBox from '@/components/ui/combo-box/ComboBox.vue';
import Loader from '@/components/ui/loader/Loader.vue';
import Switch from '@/components/ui/switch/Switch.vue';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { useToast } from '@/components/ui/toast';
import { User_Auth } from '@/entities/user';
import { ref, watchEffect } from 'vue';

const loading = ref<Boolean>(true)
const userOpts = ref<{value:string, label:string}[]>([])
const roleOpts = Object.keys(ApiPermissions).filter(k => k !== "SuperAdmin").map(k => ({ value: k, label: k }))
const users = ref<User_Auth[]>()

watchEffect(async () => {
    if (ApiPermissions.SuperAdmin) {
        const res = await ApiBackend.Admin.GetUsersWithRoles()
        if (res.ok) {
            loading.value = false
            users.value = res.data
            userOpts.value = Array.from(res.data as User_Auth[]).map((user) => ({ value: user.FaceitId, label: user.Username }))
        }
    }
})

const userFaceitIdChosen = ref<string>("")
const roleNameChosen = ref<string>("")
const createRole = ref<boolean>(false)
const updateRole = ref<boolean>(false)
const deleteRole = ref<boolean>(false)
const disabledButtons = ref<boolean>(true)

const { toast } = useToast()

watchEffect(() => {
    if (users.value) {
        if (userFaceitIdChosen.value != "") {
            const userRoles = users.value.filter(a => a.FaceitId == userFaceitIdChosen.value)[0].Roles
            createRole.value = userRoles.News.Create
            updateRole.value = userRoles.News.Update
            deleteRole.value = userRoles.News.Delete
        }
    }

    if (roleNameChosen.value != "" && userFaceitIdChosen.value != "") {
        disabledButtons.value = false
    }
})

const handleUpdateRole = async (c:boolean, u:boolean, d:boolean) => {
    const payload:DTO_UpdateRole = {
        FaceitId: userFaceitIdChosen.value,
        RoleName: roleNameChosen.value,
        Create: c,
        Update: u,
        Delete: d
    }
    const res = await ApiBackend.Admin.UpdateRole(payload)
    if (res.ok) {
        toast({
            title: "Roles actualizados",
            description: "Los roles han sido actualizados"
        })
        return
    }
    toast({
        title: "Error",
        description: "Los roles no se han podido actualizar"
    })
}
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
                        <ComboBox v-model="userFaceitIdChosen" :options="userOpts" placeholder="Usuario" search-placeholder="Buscar usuario" />
                    </TableCell>
                    <TableCell class="font-medium text-center">
                        <ComboBox v-model="roleNameChosen" :options="roleOpts" placeholder="Rol" search-placeholder="Buscar rol" />
                    </TableCell>
                    <TableCell class="font-medium text-center">
                        <Switch :disabled="disabledButtons" @update:checked="handleUpdateRole(!createRole, updateRole, deleteRole)" v-model:checked="createRole" />
                    </TableCell>
                    <TableCell class="font-medium text-center">
                        <Switch :disabled="disabledButtons" @update:checked="handleUpdateRole(createRole, !updateRole, deleteRole)" v-model:checked="updateRole" />
                    </TableCell>
                    <TableCell class="font-medium text-center">
                        <Switch :disabled="disabledButtons" @update:checked="handleUpdateRole(createRole, updateRole, !deleteRole)" v-model:checked="deleteRole" />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>