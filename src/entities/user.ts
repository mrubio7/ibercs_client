import { Player } from "./players"
import { Profile } from "./profile"
import { Roles } from "./roles"
import { Token } from "./Token"

export interface User_Auth extends User {
	Roles    :Roles
}

export interface User_Auth_WithToken extends User_Auth {
	Token    :Token
}

export interface User {                                       
	FaceitId :string
	Avatar   :string                    
	Username :string                    
	Profile  :Profile
	Player   :Player|undefined
}