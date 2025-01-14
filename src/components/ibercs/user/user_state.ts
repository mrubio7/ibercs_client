import { ApiBackend } from "@/api/api_backend";
import ApiLocalStorage from "@/api/api_localstorage";
import { DTO_AuthFaceitCallback } from "@/api/dto/request";
import { User_Auth, User_Auth_WithToken } from "@/entities/user";
import { reactive } from "vue";

const UserState = reactive<User_Auth>({
    FaceitId: "",
	Username: "",
	Avatar: "",
	Profile: {
        Description:"",
        Instagram:"",
        Kick:"",
        SteamURL:"",
        Twitch:"",
        Twitter:""
    },
    Roles: {
        SuperAdmin: false,
        News: {
            Create: false,
            Delete: false,
            Update: false
        }
    },
    Player: undefined
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
    UserState.FaceitId = ""
    UserState.Avatar = ""
    UserState.Username = ""
    UserState.Profile = {
        Description:"",
        Instagram:"",
        Kick:"",
        SteamURL:"",
        Twitch:"",
        Twitter:"",
    },
    UserState.Roles = {
        SuperAdmin: false,
        News: {
            Create: false,
            Delete: false,
            Update: false
        }
    }
    ApiLocalStorage.User.Remove()
    ApiLocalStorage.Token.Remove()
}

const setUserAuthenticated = (user:User_Auth_WithToken) => {
    UserState.FaceitId = user.FaceitId
    UserState.Avatar = user.Avatar
    UserState.Username = user.Username
    UserState.Roles = user.Roles
    UserState.Profile = user.Profile
    UserState.Player = user.Player
    ApiLocalStorage.Token.Save(user.Token)
    ApiLocalStorage.User.Save(user)
}

export default UserState