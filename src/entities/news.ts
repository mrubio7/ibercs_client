import { Basic_User } from "./user"

export interface News {
    Id          :number
    Title       :string
    Image       :string
    Content     :string
    CreatedAt   :string
    UpdatedAt   :string
    CreatedBy   :Basic_User
}

export const INITIAL_News:News = {
    Content: "",
    CreatedBy:{Username:"",FaceitId:"",Profile:{Description:"",Kick:"",Instagram:"",SteamURL:"",Twitch:"",Twitter:""}},
    Id:0,
    Image:"",
    CreatedAt:"",
    Title:"",
    UpdatedAt:""
}