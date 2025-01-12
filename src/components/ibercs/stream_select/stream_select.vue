<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { onMounted, PropType, ref } from 'vue';

const stream = ref("")

const props = defineProps({
    streams: {
        type: Array as PropType<string[]>,
        required: true,
    },
})

onMounted(() => {
    stream.value = props.streams[0]
})

const setStreamView = (channel:string) => {
    stream.value = channel
}
</script>

<template>
    <section class="p-2">
        <section class="flex flex-col-reverse lg:flex-row gap-4 w-full">
            <div class="lg:w-2/3 w-3/3 rounded-md overflow-hidden">
                <iframe
                    :src="`https://player.twitch.tv/?channel=${stream}&parent=ibercs.com&parent=www.ibercs.com`"
                    class="aspect-video w-full rounded-md overflow-hidden border"
                    allowfullscreen>
                </iframe>
            </div>
            <div class="lg:w-1/3 w-full items-center flex flex-col gap-4">
                <div v-for="s in props.streams" class="w-full">
                    <Button class="w-full" @click="setStreamView(s)" :variant="`${s == stream ? 'secondary' : 'outline'}`">{{ s }}</Button>
                </div>
            </div>
        </section>
    </section>
</template>