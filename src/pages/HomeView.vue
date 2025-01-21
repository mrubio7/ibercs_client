<script setup lang="ts">
import NewsList from '@/components/ibercs/news/components/NewsList.vue';
import FreeAgentsPreview from '@/components/ibercs/players/components/FreeAgentsPreview.vue';

document.title = "IBERCS - Inicio"
</script>

<template>
	<div class="grid grid-cols-5 gap-4 p-2">
		<div class="col-span-3">
			<div class="border rounded p-2">
				<NewsList :preview="true" />
			</div>
		</div>
		<div class="col-span-2">
			<div class="border rounded p-2">
				<FreeAgentsPreview />
			</div>
		</div>
	</div>

</template>