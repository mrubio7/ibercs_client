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

export interface DTO_UpdateNews {
	Id:number
	Title:string
	Image:string
	Content:string
}

export interface DTO_UpdateRole {
	FaceitId:string
	RoleName:string
	Create:boolean
	Update:boolean
	Delete:boolean
}

export interface DTO_UpdatePublishNews {
	Id:number
	Publish:boolean
}

export interface DTO_UpdateFreeAgent {
	FaceitId    :string
	InGameRoles :string[]
	Description :string
	Publish     :boolean
}

export interface DTO_AssignPlayerToTeam {
	TeamId         :number
	PlayerFaceitId :string
	Assign         :boolean
}