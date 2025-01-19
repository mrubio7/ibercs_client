import { Player } from "@/entities/players"
import { DELETE, GET, POST, PUT } from "@/libs/fetchs"
import { Token } from "@/entities/Token"
import { DTO_AuthFaceitCallback, DTO_CreateNews, DTO_UpdateFreeAgent, DTO_UpdateNews, DTO_UpdatePublishNews, DTO_UpdateRole, DTO_UpdateUser } from "./dto/request"
import { BuildPayload } from "@/libs/payload"

const getHost = (): string => {
    let host = import.meta.env.VITE_BACKEND_HOST
    return host || "http://localhost:8080/api/v2"
}

export const ApiBackend = {
    Users: {
        AuthCallback: async (dto: DTO_AuthFaceitCallback) => {
            const payload = BuildPayload("json", dto)
            const endpoint = `${getHost()}/auth/faceit`;
            const res = await POST(endpoint, false, payload)
            localStorage.removeItem('faceit_code_verifier');
            return res
        },
        IsValidToken: async (token:Token) => {
            const payload = BuildPayload("json", token)
            const endpoint = `${getHost()}/auth`;
            const res = await POST(endpoint, false, payload)
            return res
        },
        Login: async () => {
            const endpoint = `${getHost()}/auth`;
            const res = await POST(endpoint, true, null)
            return res
        },
        Logout: async () => {
            const endpoint = `${getHost()}/auth`;
            const res = await DELETE(endpoint, true, null)
            return res
        },
        UpdateProfile: async (profile:DTO_UpdateUser) => {
            const payload = BuildPayload("form", profile)
            const endpoint = `${getHost()}/user`;
            const res = await PUT(endpoint, true, payload)
            return res
        }
    },
    Players: {
        GetAll: async () => {
            const endpoint = `${getHost()}/players`;
            const res = await GET(endpoint, false)
            return res.data as Player[]
        },
        GetTopEloPlayers: async (limit:number) => {
            const endpoint = `${getHost()}/players/top?limit=${limit}`;
            const res = await GET(endpoint, false)
            return res
        },
        Update: async (faceitId:string) => {
            const endpoint = `${getHost()}/player?faceitId=${faceitId}`;
            const res = await PUT(endpoint, true, null)
            return res
        },
        GetFreeAgents: async (limit:number) => {
            const endpoint = `${getHost()}/player/free-agents?limit=${limit}`;
            const res = await GET(endpoint, false)
            return res
        },
        UpdateFreeAgent: async (dto:DTO_UpdateFreeAgent) => {
            const payload = BuildPayload("json", dto)
            const endpoint = `${getHost()}/player/free-agent`;
            const res = await PUT(endpoint, true, payload)
            return res
        }
    },
    News: {
        GetLatestNews: async (max:number) => {
            const endpoint = `${getHost()}/latest-news?max=${max}`;
            const res = await GET(endpoint, false)
            return res
        },
        GetNewsById: async (id:number, c:string) => {
            const code = `${c != '' ? `&p=${c}` : ''}`
            const endpoint = `${getHost()}/news?id=${id}${code}`;
            const res = await GET(endpoint, false)
            return res
        },
        Create: async (news:DTO_CreateNews) => {
            const payload = BuildPayload("json", news)
            const endpoint = `${getHost()}/news`;
            const res = await POST(endpoint, true, payload)
            return res
        },
        Update: async (news:DTO_UpdateNews) => {
            const payload = BuildPayload("json", news)
            const endpoint = `${getHost()}/news`;
            const res = await PUT(endpoint, true, payload)
            return res
        },
        Delete: async (id:number) => {
            const endpoint = `${getHost()}/news?id=${id}`;
            const res = await DELETE(endpoint, true, null)
            return res
        }
    },
    Admin: {
        GetUsersWithRoles: async () => {
            const endpoint = `${getHost()}/admin/users`;
            const res = await GET(endpoint, true)
            return res
        },
        UpdateRole: async (dto:DTO_UpdateRole) => {
            const payload = BuildPayload("json", dto)
            const endpoint = `${getHost()}/admin/role`;
            const res = await PUT(endpoint, true, payload)
            return res
        },
        GetAllNews: async () => {
            const endpoint = `${getHost()}/admin/news`;
            const res = await GET(endpoint, true)
            return res
        },
        UpdatePublishNews: async (dto:DTO_UpdatePublishNews) => {
            const payload = BuildPayload("json", dto)
            const endpoint = `${getHost()}/admin/news`;
            const res = await PUT(endpoint, true, payload)
            return res
        }
    }
}