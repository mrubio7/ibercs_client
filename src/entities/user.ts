import { Player } from "./players"
import { Profile } from "./profile"
import { Roles } from "./roles"
import { Token } from "./Token"

export interface User_Auth extends User {
	Id       :number
	Roles    :Roles
}

export interface User_Auth_WithToken extends User_Auth {
	Token    :Token
}

export interface User extends Basic_User {                                       
	Avatar   :string                    
	Player   :Player|undefined
}

export interface Basic_User {
	FaceitId :string
	Username :string                    
	Profile  :Profile
}