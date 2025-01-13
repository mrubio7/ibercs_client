import { Profile } from "./profile"
import { Roles } from "./roles"
import { Token } from "./Token"

export interface User_Auth {
	FaceitId :string
	Username :string
	Avatar   :string
	Roles    :Roles
	Profile  :Profile
}

export interface User_Auth_WithToken extends User_Auth {
	Token    :Token
}

export interface User {                     
	Email    :string                    
	FaceitId :string                    
	Username :string                    
	Profile  :Profile
}