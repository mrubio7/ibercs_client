import { ApiBackend } from "@/api/api_backend";
import ApiLocalStorage from "@/api/api_localstorage";
import { DTO_AuthFaceitCallback } from "@/api/dto/request";
import { User_Auth, User_Auth_WithToken } from "@/entities/user";
import { reactive } from "vue";

const AuthState = reactive<User_Auth>({
    FaceitId: "",
	Username: "",
	Avatar: "",
	Profile: {
        Description:"",
        Instagram:"",
        Kick:"",
        SteamURL:"",
        Twitch:"",
        Twitter:"",
    },
    Roles: {
        SuperAdmin: false
    }
})

export const AuthenticateFromFaceit = async (code:string): Promise<boolean> => {
    const dto: DTO_AuthFaceitCallback = {code: code, code_verifier: localStorage.getItem('faceit_code_verifier')!}
    const res = await ApiBackend.Users.AuthCallback(dto)
    if (!res.ok) {
        return false
    }
    const userData = res.data as User_Auth_WithToken
    setUserAuthenticated(userData)
    return true
}

export const ItsAlreadyLogged = async () => {
    const token = await ApiLocalStorage.Token.Get()
    if (token == null) {
        return
    }

    const res = await ApiBackend.Users.IsValidToken(token)
    if (!res.ok) {
        ApiLocalStorage.User.Remove()
        ApiLocalStorage.Token.Remove()
        return false
    }
    const userData = res.data as User_Auth_WithToken
    setUserAuthenticated(userData)
}

export const ClearAuthState = () => {
    AuthState.FaceitId = ""
    AuthState.Avatar = ""
    AuthState.Username = ""
    AuthState.Profile = {
        Description:"",
        Instagram:"",
        Kick:"",
        SteamURL:"",
        Twitch:"",
        Twitter:"",
    },
    AuthState.Roles = {
        SuperAdmin: false
    }
    ApiLocalStorage.User.Remove()
    ApiLocalStorage.Token.Remove()
}

const setUserAuthenticated = (user:User_Auth_WithToken) => {
    AuthState.FaceitId = user.FaceitId
    AuthState.Avatar = user.Avatar
    AuthState.Username = user.Username
    AuthState.Roles = user.Roles
    AuthState.Profile = user.Profile
    ApiLocalStorage.Token.Save(user.Token)
    ApiLocalStorage.User.Save(user)
}

export default AuthState