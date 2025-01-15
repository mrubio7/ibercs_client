<script setup lang="ts">
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuContent, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger, MenubarSub, MenubarLabel } from '@/components/ui/menubar'
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { PathRoutes } from '@/router';
import { onBeforeMount, ref, watchEffect } from 'vue';
import LoginFaceit from '@/components/ibercs/user/components/LoginFaceit.vue';
import { Logout } from '@/libs/utils';
import { Toaster } from '@/components/ui/toast';
import MenubarSubTrigger from '@/components/ui/menubar/MenubarSubTrigger.vue';
import MenubarSubContent from '@/components/ui/menubar/MenubarSubContent.vue';
import Button from '@/components/ui/button/Button.vue';
import { ItsAlreadyLogged } from '@/components/ibercs/user/user_state';
import { User_Auth } from '@/entities/user';
import UserState from '@/components/ibercs/user/user_state';
import ApiPermissions from '@/api/api_permissions';

const mode = useColorMode()
const auth = ref<User_Auth | undefined>(undefined)

onBeforeMount(async () => {
    ItsAlreadyLogged()
});

watchEffect(() => {
    auth.value = UserState
})
</script>

<template>
    <Toaster />
    <section class="flex flex-col min-h-screen w-full">
        <!-- Barra de navegación -->
        <div class="flex w-full justify-between border-b">
            <div class="flex w-full justify-between items-center px-4 py-2">
                <div class="lg:flex hidden">
                    <Menubar class="flex border-0 gap-4 shadow-none">
                        <RouterLink :to="PathRoutes.Home">
                            <MenubarShortcut :class="navigationMenuTriggerStyle()" class="cursor-pointer">
                                <div>
                                    <img src="/logo.png" width="30"/>
                                </div>
                            </MenubarShortcut>
                        </RouterLink>
    
                        <MenubarMenu class="flex">
                            <MenubarTrigger class="cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-200 transition p-2 px-4">Jugadores</MenubarTrigger>
                            <MenubarContent>
                                <RouterLink :to="PathRoutes.Ladder_Players">
                                    <MenubarItem class="cursor-pointer">
                                        Clasificación
                                    </MenubarItem>
                                </RouterLink>
                            </MenubarContent>
                        </MenubarMenu>

                        <RouterLink :to="PathRoutes.NewsHome">
                            <MenubarLabel class="cursor-pointer rounded dark:hover:bg-slate-800 hover:bg-slate-200 transition p-2 px-4">
                                Noticias
                            </MenubarLabel>
                        </RouterLink>
    
                    </Menubar>
                </div>
                <div class="lg:hidden flex">
                    <Menubar class="flex border-0 gap-4 shadow-none">
                        <MenubarShortcut :class="navigationMenuTriggerStyle()" class="cursor-pointer">
                            <RouterLink :to="PathRoutes.Home">
                                <div>
                                    <img src="/logo.png" width="30"/>
                                </div>
                            </RouterLink>
                        </MenubarShortcut>
                        
                        <MenubarMenu class="flex">
                            <MenubarTrigger class="cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-200 transition p-2 px-4">
                                <Icon icon="cuida:menu-outline" class="h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:scale-100" />
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarSub>
                                    <MenubarSubTrigger>Jugadores</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <RouterLink :to="PathRoutes.Ladder_Players">
                                            <MenubarItem class="cursor-pointer">Clasificación</MenubarItem>
                                        </RouterLink>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <RouterLink :to="PathRoutes.NewsHome">
                                    <MenubarSub>
                                    <MenubarItem>Noticias</MenubarItem>
                                </MenubarSub>
                                </RouterLink>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>
            <div class="flex items-center">
                <div class="flex w-20 items-center justify-center">
                    <div v-if="mode == 'light'" class="absolute">
                        <Button variant="outline" size="icon" @click="mode = 'dark'">
                            <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0" />
                        </Button>
                    </div>
                    <div v-else class="absolute">
                        <Button variant="outline" size="icon" @click="mode = 'light'" >
                            <Icon icon="radix-icons:sun" class="h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100" />
                        </Button>
                    </div>
                </div>
                <NavigationMenu class="lg:w-2/12 w-4/12 pr-6 pt-2 pb-2">
                    <NavigationMenuList class="flex justify-end items-center space-x-4">
                        <div v-if="auth?.Avatar != ''">
                            <NavigationMenuItem class="">
                                <NavigationMenuTrigger>
                                    <LoginFaceit :auth="auth" />
                                </NavigationMenuTrigger>
                                <NavigationMenuContent class="">
                                    <div class="p-1 pb-1.5 pr-1.5">
                                        <RouterLink :to="PathRoutes.MyProfile">
                                            <NavigationMenuLink class="block p-2 text-sm dark:text-slate-400 hover:dark:bg-slate-800 rounded transition cursor-pointer">Mi perfil</NavigationMenuLink>
                                        </RouterLink>
                                        <RouterLink v-if="ApiPermissions.SuperAdmin.value" :to="PathRoutes.Administration">
                                            <NavigationMenuLink class="block p-2 text-sm dark:text-slate-400 hover:dark:bg-slate-800 rounded transition cursor-pointer">Administración</NavigationMenuLink>
                                        </RouterLink>
                                        <NavigationMenuLink @click="Logout" class="block p-2 text-sm dark:text-slate-400 hover:dark:bg-slate-800 rounded transition cursor-pointer">Desconectar</NavigationMenuLink>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </div>
                        <div v-else>
                            <NavigationMenuItem>
                                <LoginFaceit :auth="auth"/>
                            </NavigationMenuItem>
                        </div>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>

        <!-- Contenido principal con 3 columnas -->
        <div class="flex-grow flex px-2">
            <!-- Sección izquierda -->
            <div class="w-1/6 py-4 px-6 flex-col gap-4 lg:flex hidden">
                <!-- <Prominent_players :players="prominentPlayers" />
                <Advertisement /> -->
            </div>

            <!-- Sección central -->
            <div class="lg:w-4/6 py-4 px-2 w-full">
                <div class="border rounded-md p-2">
                    <RouterView />
                </div>
            </div>

            <!-- Sección derecha -->
            <div class="w-1/6 p-4 flex-col gap-4 lg:flex hidden">
                <!-- <Streams />
                <Matches /> -->
            </div>
        </div>

        <!-- Footer siempre abajo -->
        <footer class="border-t">
            <div class="p-1 flex justify-between px-4 py-2 h-full">
                <div class="text-sm">
                    <img src="/logo.png" width="80" class=""/>
                </div>
                <div>
                    <div class="flex flex-col justify-between items-end p-1">
                        <a href="https://www.x.com/ibercs_com" target=”_blank” class="rounded p-1.5 hover:bg-slate-300 dark:hover:bg-slate-900 cursor-pointer transition">
                            <span>
                                <Icon icon="ri:twitter-x-line" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
                            </span>
                        </a>
                    </div>
                    <div class="flex mb-1">
                        <span class="text-sm text-slate-500">info@ibercs.com</span>
                    </div>
                    <div class="flex gap-1 justify-end items-center text-slate-500">
                        <span class="text-sm">Made with </span>
                        <Icon icon="radix-icons:heart-filled" class="h-[0.8rem] w-[0.8rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </div>
                </div>
            </div>
        </footer>
    </section>
</template>
