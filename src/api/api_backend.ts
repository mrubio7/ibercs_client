import { PlayerModel } from "@/entities/players"
import { authenticated_delete, authenticated_post, basic_get, basic_post } from "@/libs/fetchs"
import { Token } from "@/entities/Token"

const getHost = (): string => {
    let host = import.meta.env.VITE_BACKEND_HOST
    return "http://localhost:8080/api/v2"
    return host || "http://localhost:8080/api/v2"
}

export const ApiBackend = {
    Users: {
        AuthCallback: async (code: string) => {
            const codeVerifier = localStorage.getItem('faceit_code_verifier');
            const endpoint = `${getHost()}/auth/faceit`;
            const res = await basic_post(endpoint, { "code": code, "code_verifier": codeVerifier })
            localStorage.removeItem('faceit_code_verifier');
            return res
        },
        IsValidToken: async (token:Token) => {
            const endpoint = `${getHost()}/auth`;
            const res = await basic_post(endpoint, {
                "AccessToken":token.AccessToken,
                "RefreshToken":token.RefreshToken,
                "TokenType":token.TokenType,
                "ExpiresIn":token.ExpiresIn,
                "ExpiresAt":token.ExpiresAt
            })
            return res
        },
        Login: async () => {
            const endpoint = `${getHost()}/auth`;
            const res = await authenticated_post(endpoint, {})
            return res
        },
        Logout: async () => {
            const endpoint = `${getHost()}/auth`;
            const res = await authenticated_delete(endpoint, {})
            return res
        }
    },
    Players: {
        GetAll: async () => {
            const endpoint = `${getHost()}/players`;
            const res = await basic_get(endpoint)
            return res.data as PlayerModel[]
        },
    }
}