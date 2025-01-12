export const LEAGUES = {
    ESEA_ADVANCED: {
        NAME: "ADVANCED",
        COLOR: "bg-amber-400",
    },
    ESEA_MAIN: {
        NAME:"MAIN",
        COLOR:"bg-red-600"
    },
    ESEA_INTERMEDIATE: {
        NAME:"INTERMEDIATE",
        COLOR:"bg-fuchsia-600"
    },
    ESEA_OPEN10: {
        NAME:"OPEN10",
        COLOR:"bg-indigo-700"
    },
    ESEA_OPEN: {
        NAME:"OPEN",
        COLOR:"bg-blue-600"
    }
}

export const TOURNAMENT_PRIORITY: Record<string, number> = {
    "ESEA ADVANCED": 1,
    "ESEA MAIN": 2,
    "ESEA INTERMEDIATE": 3,
    "ESEA OPEN10": 4,
    "ESEA OPEN": 5,
};

export const PLAYER_ROLES = {
    Lurker: "Lurker",
    EntryFragger: "EntryFragger",
    Support: "Support",
    IGL: "IGL",
    AWPer: "AWPer",
    Rifler: "Rifler",
    Flex: "Flex",
    Coach: "Coach",
}

export const PERMISSIONS = {
    PLAYER: 0,
    COACH: 1,
    MANAGER: 2,
    ADMIN: 3,
    SUPERADMIN: 4
}