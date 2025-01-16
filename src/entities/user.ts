import { FreeAgent } from "./free_agent"
import { Player, PlayerStats } from "./players"
import { Profile } from "./profile"
import { Roles } from "./roles"
import { Token } from "./Token"

export interface User_Auth extends User {
	Id       :number
	Roles    :Roles
}

export const INITIAL_USER_AUTH:User_Auth = {
	Avatar:"",
	FaceitId:"",
	Id:0,
	Player: {} as Player,
	Profile: {} as Profile,
	Roles: {} as Roles,
	Username: ""

}

export interface User_Auth_WithToken extends User_Auth {
	Token    :Token
}

export interface User extends Basic_User {                                       
	Avatar   :string                    
	Player   :Player
}

export interface Basic_User {
	FaceitId :string
	Username :string                    
	Profile  :Profile
}