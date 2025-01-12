<script setup lang="ts">
import { UserModel } from '@/entities/users';
import { onMounted, PropType, ref } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import Player_profile from '../player_profile/player_profile.vue';
import { PlayerModel } from '@/entities/players';
import { ApiBackend } from '@/api/api_backend';

const props = defineProps({
	user: {
		type: Object as PropType<UserModel>,
		required: true
	}
})

const player = ref({} as PlayerModel[])

onMounted(async () => {
	player.value = await ApiBackend.Players.Get([props.user.PlayerID])
})
</script>

<template>
	<section class="flex flex-col justify-between">
		<div class="flex w-full">
			<img :src="props.user.Player.Avatar" class="w-52 h-52 rounded border-2" />
			<div class="flex flex-col w-full pl-4 gap-2">
				<div class="flex flex-col align-center gap-4 -mt-1">
					<div class="flex justify-between lg:flex-row flex-col-reverse">
						<span class="lg:text-3xl text-lg font-bold dark:text-slate-200 text-slate-800 ml-2 mb-1 lg:mt-0 mt-2">{{ user.Name }}</span>
						<div class="flex gap-4 justify-end w-full">
							<a v-if="props.user.Twitch !== undefined" :href="`https://www.twitch.tv/${props.user.Twitch}`" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition cursor-pointer h-fit">
								<Icon icon="mdi:twitch" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
							</a>
							<a v-if="props.user.Twitter != undefined" :href="`https://www.x.com/${props.user.Twitter}`" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition cursor-pointer h-fit">
								<Icon icon="ri:twitter-x-line" class="h-[1.25rem] w-[1.25rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
							</a>
							<a :href="`https://www.faceit.com/es/players/${props.user.Player.Nickname}`" target="_blank" class="p-1 rounded-md dark:hover:bg-slate-800 hover:bg-slate-100 transition cursor-pointer h-fit">
								<Icon icon="cib:faceit" class="h-[1.2rem] w-[1.2rem] scale-0 transition-all rotate-0 scale-100 dark:text-slate-400 text-slate-500" />
							</a>
						</div>
					</div>
					<span class="w-full min-h-12 max-h-20 text-md text-slate-500 font-semibold px-2">{{ props.user.Description }}</span>
				</div>
			</div>
		</div>
		<div>
			<Player_profile v-if="player[0]" :player="player[0]" :with-avatar="false" />
		</div>
	</section>
</template>