export interface Roles {
    SuperAdmin :boolean
    News: Role
}

interface Role {
    Create: boolean
    Update: boolean
    Delete: boolean
}