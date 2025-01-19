<script setup lang="ts">
import Avatar from '../avatar/Avatar.vue';
import AvatarImage from '../avatar/AvatarImage.vue';
import Icon from '../icon/Icon.vue';
import Tooltip from '../tooltip/Tooltip.vue';
import TooltipContent from '../tooltip/TooltipContent.vue';
import TooltipProvider from '../tooltip/TooltipProvider.vue';
import TooltipTrigger from '../tooltip/TooltipTrigger.vue';

const props = defineProps({
    image: {
        required:true,
        type: String
    },
    disabled: {
        required: false,
        default: false,
        type: Boolean,
    },
    tooltip: {
        required: true, 
        type: String
    }
})
</script>

<template>
    <div class="flex items-center justify-center">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Avatar class="w-7 h-7 flex p-0.5 bg-[transparent] border">
                        <AvatarImage :src="props.image" alt="logo" class="bg-[transparent]" />
                    </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{{props.tooltip}}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    </div>
</template>