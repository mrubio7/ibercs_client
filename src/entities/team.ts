import { Player } from "./players"

export interface Team {
    FaceitId: string
    Avatar: string
    Tag: string
    Name: string
    Logo: string
    Players: Player[]
}