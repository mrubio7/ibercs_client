import { Player } from "./players"

export interface Team {
    FaceitId: string
    Avatar: string
    Tag: string
    Name: string
    Logo: string
    Players: Player[]
}

export interface FaceitTeam extends Team {
    Members: Member[]
}

interface Member {
    FaceitId :string
	Nickname :string
	Avatar   :string
	Country  :string
}