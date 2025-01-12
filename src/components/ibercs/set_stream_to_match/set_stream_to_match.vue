<script setup lang="ts">
import { ApiBackend } from '@/api/api_backend';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Spinner from '@/components/ui/spinner/Spinner.vue';
import { useToast } from '@/components/ui/toast';
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue';
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue';
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ref } from 'vue';

const props = defineProps({
    matchId: {
        required: true,
        type: String,
    }
})

const loading = ref(false)
const newTwitch = ref("")

const { toast } = useToast()

const setStreamToMatch = async () => {
    if (newTwitch.value != "") {
        loading.value = true
        if (newTwitch.value.includes("http") || newTwitch.value.includes("twitch.tv")) {
            toast({
                title: 'Canal de twitch invalido',
                description: 'Añada solamente el nombre del canal, E.G.: twitch.tv/ibai => ibai',
            });
            return
        }
        const res = await ApiBackend.Matches.SetStreamInMatch(props.matchId as string, newTwitch.value)
        if (res.error == null) {
            toast({
                title: 'Canal de twitch añadido',
                description: 'En unos minutos aparecerá el stream asociado.',
            });
            loading.value = false
        }
    } else {
        toast({
            title: 'Nombre de canal invalido',
            description: 'Por favor, rellene el campo de canal.',
        });
    }
}
</script>

<template>
    <div class="flex gap-4 p-4 border rounded dark:bg-slate-900 bg-slate-100">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Icon icon="radix-icons:info-circled" class="h-[1.1rem] w-[1.1rem] stroke-slate-500" />
                </TooltipTrigger>
                <TooltipContent class="bg-slate-400">
                    <p class="font-semibold">Esta sección solo es visible para miembros de los equipos.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <div class="flex flex-col justify-center gap-1 w-full">
                <div class="flex" style="position: relative;">
                    <span class="absolute inset-y-0 left-0 flex font-semibold items-center pl-2 text-slate-500">twitch.tv/</span>
                    <Input
                        v-model:model-value="newTwitch"
                        class="pl-[80px]"
                    />
                </div>
            </div>
        <Button v-if="loading" disabled variant="outline"> <Spinner size="4" class="mr-2" /> Añadiendo </Button>
        <Button v-else @click="setStreamToMatch" >Añadir stream</Button>
    </div>
</template>

