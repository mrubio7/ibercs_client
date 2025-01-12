import { Token } from "./Token"

export interface User_Authenticated {
	FaceitId :string
	Username :string
	Avatar   :string
	Elo      :number
}

export interface User_Authenticated_WithToken extends User_Authenticated {
	Token    :Token
}