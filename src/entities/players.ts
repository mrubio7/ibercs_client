export interface PlayerStatsModel {
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

export interface PlayerModel {
	Id: number;
	Avatar: string;
	Nickname: string;
	FaceitId: string;
	SteamId?: string | null;
	FaceitElo: number;
	Stats: PlayerStatsModel;
}

export interface ProminentPlayer {
	Id: number;
	Score: number;
	Avatar: string;
	Nickname: string;
	FaceitId: string;
	SteamId: string;
}