<script setup lang="ts">
import NewsList from '@/components/ibercs/news/components/NewsList.vue';

	document.title = "IBERCS - Inicio"
</script>

<template>
	<div class="grid grid-cols-5">
		<div class="col-span-2">
			<NewsList :preview="true" />
		</div>
	</div>

</template>