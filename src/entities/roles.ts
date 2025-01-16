export interface Roles {
    SuperAdmin :boolean
    News: Role
    FreeAgents: Role
}

interface Role {
    Create: boolean
    Update: boolean
    Delete: boolean
}