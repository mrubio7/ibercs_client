<script setup lang="ts">
import NewsList from '@/components/ibercs/news/components/NewsList.vue';
import FreeAgentsPreview from '@/components/ibercs/players/components/FreeAgentsPreview.vue';
import PlayersPreview from '@/components/ibercs/players/components/PlayersPreview.vue';

document.title = "IBERCS - Inicio"
</script>

<template>
	<div class="grid grid-cols-5 gap-4 p-2">
		<div class="col-span-2">
			<div class="border rounded px-2 pb-2">
				<NewsList :preview="true" />
			</div>
		</div>
		<div class="col-span-2">
			<div class="border rounded px-2 pb-2">
				<FreeAgentsPreview />
			</div>
		</div>
		<div class="col-span-1">
			<div class="border rounded px-2 pb-2">
				<PlayersPreview :playersNumber="10" />
			</div>
		</div>
	</div>

</template>