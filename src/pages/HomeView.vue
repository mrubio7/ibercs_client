<script setup lang="ts">
import NewsList from '@/components/ibercs/news/components/NewsList.vue';
import PlayersPreview from '@/components/ibercs/players/components/PlayersPreview.vue';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import Title from '@/components/ui/title/Title.vue';

	document.title = "IBERCS - Inicio"
</script>

<template>
	<div class="grid grid-cols-5 gap-4 p-2">
		<div class="col-span-2">
			<NewsList :preview="true" />
		</div>
		<div class="col-span-2">
			<Title text="Jugadores libres" />
			<div class="relative flex justify-center items-center">
				<span class="absolute font-semibold text-slate-500">En construcción...</span>
				<Skeleton class="w-full h-60" />
			</div>
		</div>
		<div class="col-span-1">
			<PlayersPreview :playersNumber="10" />
		</div>
	</div>

</template>