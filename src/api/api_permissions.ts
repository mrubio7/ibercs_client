import { Roles } from "@/entities/roles"
import { reactive, computed } from "vue"

const roles = reactive<Roles>({
    SuperAdmin: false,
    News: {
        Create: false,
        Delete: false,
        Update: false
    },
})

const ApiPermissions = {
    SuperAdmin: computed(() => roles.SuperAdmin),
    News: {
        Create: computed(() => roles.SuperAdmin || roles.News.Create),
        Update: computed(() => roles.SuperAdmin || roles.News.Update),
        Delete: computed(() => roles.SuperAdmin || roles.News.Delete),
    }
}

export const setRoles = (r: Roles) => {
    roles.SuperAdmin = r.SuperAdmin
    roles.News = r.News
}

export default ApiPermissions
