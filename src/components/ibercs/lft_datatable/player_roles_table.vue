<script setup lang="ts">
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue';
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue';
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue';
import { PLAYER_ROLES } from '@/libs/consts';
import { GetRoleIcon } from '@/libs/utils';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { PropType, ref } from 'vue';

const props = defineProps({
    roles: {
        type: Array as PropType<string[]>,
        required: true
    }
})

const roles = ref(props.roles);
const allRoles = Object.entries(PLAYER_ROLES).map(([_, value]) => value)

</script>

<template>
    <section class="flex gap-4 mt-1">
        <div v-for="rol in allRoles">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Icon :class="`h-6 w-6 ${roles.includes(rol) ? 'opacity-100': 'opacity-10'}`" :icon="`${GetRoleIcon(rol)}`" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{{ rol }}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </section>
</template>