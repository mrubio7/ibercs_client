<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import { defineComponent, ref, watchEffect } from 'vue';

const props = defineProps({
    toolbar: {
        required: true,
        type: Boolean
    },
    value: {
        type: String,
        default: ''
    }
})

const borderRadius = ref<number>(0)
const toolbarDisplay = ref<string>("block")
const code = ref()

watchEffect(() => {
    if (!props.toolbar) {
        borderRadius.value = 5
        toolbarDisplay.value = "none"
    }
    code.value = props.value
    debugger
})

</script>

<template>
    <div>
        <QuillEditor
            contentType="text"
            :content="code"
            :read-only="!props.toolbar"
            theme="snow"
            toolbar="full"
            :style="{ border: toolbarDisplay }"
            class="rounded-bl rounded-br"
        />
    </div>
</template>

<style>
    .ql-container {
        border-color: inherit !important;
        border: v-bind("toolbarDisplay");
    }
    .ql-toolbar {
        background-color: rgba(125, 125, 125, 0.1);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        display: v-bind("toolbarDisplay");
        border-color: inherit !important;
    }
</style>
