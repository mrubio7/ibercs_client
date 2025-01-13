<script setup lang="ts">
import IconButton from '@/components/ui/icon-button/IconButton.vue';
import { News } from '@/entities/news';
import { PropType } from 'vue';

const props = defineProps({
    news: {
        required: true,
        type: Object as PropType<News>
    }
})
</script>

<template>
    <div class="border rounded p-4">
        <div class="flex flex-col gap-2">
            <span class="text-xl font-semibold">{{props.news?.Title}}</span>
            <div class="flex gap-4 justify-between">
                <div class="flex items-center gap-2">
                    <span class="text-md">{{ props.news?.CreatedBy.Username }}</span>
                    <IconButton v-if="!props.news?.CreatedBy.Profile.Twitter" size="sm"  icon="ri:twitter-x-line" :url="`https://x.com/${props.news?.CreatedBy.Profile.Twitter}`" />
                </div>
            </div>
        </div>
    </div>
</template>