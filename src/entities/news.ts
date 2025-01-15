import { Basic_User } from "./user"

export interface News {
    Id          :number
    Title       :string
    Image       :string
    Content     :string
    Publish     :boolean
    CreatedAt   :string
    UpdatedAt   :string
    CreatedBy   :Basic_User
}

export const INITIAL_News:News = {
    Id:0,
    Title:"",
    Image:"",
    Content: "",
    Publish: false,
    CreatedAt:"",
    UpdatedAt:"",
    CreatedBy:{Username:"",FaceitId:"",Profile:{Description:"",Kick:"",Instagram:"",SteamURL:"",Twitch:"",Twitter:""}}
}