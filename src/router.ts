import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './pages/HomeView.vue'
import Layout from './pages/Layout.vue'
import LadderPlayersView from './pages/LadderPlayersView.vue'
import FaceitCallback from './pages/FaceitCallback.vue'
import NotFoundView from './pages/NotFoundView.vue'
import MyProfileView from './pages/MyProfileView.vue'
import NewsView from './pages/NewsView.vue'
import CreateNewsView from './pages/CreateNewsView.vue'
import component from '@/components/ui/spinner/Spinner.vue'
import NewsAllView from './pages/NewsAllView.vue'

export const PathRoutes = {
	Home: "/",
	Ladder_Players: "/ladder/players",
	MyProfile: "/my-profile",
	AuthCallback: "/auth/callback",
	News: "/news/:id",
	NewsHome: "/news",
	CreateNews: "/admin/news/create"
}

const routes = [
	{ path: PathRoutes.Home, component: Layout, children: [
		{ path: "", component: HomeView },
		{ path: PathRoutes.Ladder_Players, component: LadderPlayersView },
		{ path: PathRoutes.MyProfile, component: MyProfileView },
		{ path: PathRoutes.News, component: NewsView },
		{ path: PathRoutes.NewsHome, component: NewsAllView },
		{ path: PathRoutes.CreateNews, component: CreateNewsView }
	]},
	{ path: PathRoutes.AuthCallback, component: FaceitCallback},
	{ path: "/:pathMatch(.*)*", component: NotFoundView },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router