import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './pages/HomeView.vue'
import Layout from './pages/Layout.vue'
import LadderPlayersView from './pages/LadderPlayersView.vue'
import FaceitCallback from './pages/FaceitCallback.vue'
import NotFoundView from './pages/NotFoundView.vue'

export const PathRoutes = {
	Home: "/",
	Ladder_Players: "/ladder/players",
	Ladder_Teams: "/ladder/teams",
	Team_Profile: "/team/:team_name",
	Player_Profile: "/player/:player_name",
	MyProfile: "/my-profile",
	AuthCallback: "/auth/callback",
	Administration: "/administration",
	Tournaments: "/tournaments",
	Match: "/match/:match_id",
	LookingForTeam: "/looking-for-team",
	Esea: "/esea",
}

const routes = [
	{ path: PathRoutes.Home, component: Layout, children: [
		{ path: "", component: HomeView },
		{ path: PathRoutes.Ladder_Players, component: LadderPlayersView },
	]},
	{ path: PathRoutes.AuthCallback, component: FaceitCallback},
	{ path: "/:pathMatch(.*)*", component: NotFoundView },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router