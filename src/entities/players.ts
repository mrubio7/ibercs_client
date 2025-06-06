import { FreeAgent } from "./free_agent";
import { Team } from "./team";

export interface PlayerStats {
	Id: number;
	KrRatio: number;
	KdRatio: number;
	KillsAverage: number;
	DeathsAverage: number;
	HeadshotPercentAverage: number;
	MVPAverage: number;
	AssistAverage: number;
	TripleKillsAverage: number;
	QuadroKillsAverage: number;
	PentaKillsAverage: number;
	UpdatedAt: string;
}

export interface Player {
	Id: number;
	Avatar: string;
	Nickname: string;
	FaceitId: string;
	SteamId?: string | null;
	FaceitElo: number;
	Stats: PlayerStats;
	FreeAgent: FreeAgent;
	Team: Team | null;
}

