import ApiLocalStorage from "@/api/api_localstorage";
import { PlayerModel } from "@/entities/players";
import { UserModel } from "@/entities/users";
import { reactive } from "vue";

export const UserState = reactive<UserModel>({
    ID:undefined,
    Role:0,
    PlayerID:"",
    Name:"",
    Description: "",
    Twitch:"",
    Twitter:"",
    Token: "",
    Player:{} as PlayerModel,
})

export const ClearState = () => {
    ApiLocalStorage.User.Remove()
    UserState.ID = undefined
    UserState.Description = ""
    UserState.PlayerID = ""
    UserState.Name = ""
    UserState.Role = 0
    UserState.Twitch = ""
    UserState.Twitter = ""
    UserState.Player = {} as PlayerModel
}

