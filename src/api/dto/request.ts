export interface DTO_AuthFaceitCallback {
    code: string,
    code_verifier: string
}

export interface DTO_UpdateUser {
    Username:string
	Twitter:string
	Instagram:string
	SteamURL:string
	Twitch:string
	Kick:string
	Description:string
}

export interface DTO_CreateNews {
	Title:string
	Image:string
	Content:string
	Publish:boolean
}