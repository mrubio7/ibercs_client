<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import Spinner from '@/components/ui/spinner/Spinner.vue';
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue';
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue';
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue';
import { Channel } from '@/entities/twitch';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { onMounted, ref } from 'vue';

const streams = ref([] as Channel[])
const loading = ref(true as boolean)

onMounted(async () => {
    const res = await ApiBackend.Users.GetStreams()
    if (res.error == null) {
        const temp = res.data as Channel[]
        if (temp) {
            streams.value = temp.sort((a, b) => b.Viewers - a.Viewers)
        } else {
            streams.value = temp
        }
    }
    loading.value = false
})

</script>
<template>
    <section class="border rounded-md p-2">
        <span class="text-md font-semibold px-2">Usuarios en directo</span>
        <div class="mt-1">
            <div v-if="!loading" class="flex flex-col gap-1">
                <a v-for="c in streams" :href="`https://www.twitch.tv/${c.UserLogin}`" target="_blank" >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger class="w-full flex justify-between">
                                <div class="flex items-center justify-between w-full hover:dark:bg-slate-800 hover:bg-slate-200 rounded p-1 transition">
                                    <div class="flex items-center gap-1 w-full">
                                        <Icon icon="icon-park-outline:dot" class="mt-0.5 text-red-600" />
                                        <span class="text-sm font-semibold dark:text-slate-200 text-slate-800">{{ c.UserName }}</span>
                                    </div>
                                    <div class="flex items-center w-full gap-4">
                                        <div class="flex items-center justify-end w-full gap-1">
                                            <span class="text-xs font-semibold dark:text-slate-200 text-slate-800">{{ c.Viewers }}</span>
                                            <Icon icon="mdi:eye" class="h-4 w-4 text-slate-500" />
                                        </div>
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{{ c.Title }}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </a>
                <div v-if="!streams" class="flex flex-col items-center gap-2 py-6">
                    <Icon icon="mdi:tv-classic-off" class="h-8 w-8 mt-0.5 text-slate-600" />
                    <span class="text-sm font-semibold text-slate-500">No hay nadie en directo</span>
                </div>
            </div>
            <div v-else>
                <div class="flex flex-col items-center gap-2 py-6">
                    <Spinner/>
                    <span class="text-sm font-semibold text-slate-500">Cargando streams</span>
                </div>
            </div>
        </div>
    </section>
</template>