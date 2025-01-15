<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import { useVModel } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const props = defineProps({
    toolbar: {
        required: true,
        type: Boolean
    },
    modelValue: {
        type: String,
        default: ''
    }
})

const borderRadius = ref<number>(0)
const toolbarDisplay = ref<string>("block")
const value = ref()

watchEffect(() => {
    if (!props.toolbar) {
        borderRadius.value = 5
        toolbarDisplay.value = "none"
    }
    value.value = props.modelValue
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits)

const handleUpdate = (val:string) => {
    modelValue.value = val
}

</script>

<template>
    <div>
        <QuillEditor
            contentType="html"
            :content="value"
            @update:content="(val) => handleUpdate(val)"
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
