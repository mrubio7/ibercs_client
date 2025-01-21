<script setup lang="ts">
import Icon from '../ui/icon/Icon.vue';
import Title from '../ui/title/Title.vue';

</script>

<template>
    <section class="border rounded p-2">
        <Title text="En directo"/>
        <div class="flex flex-col justify-center items-center p-8">
            <Icon icon="grommet-icons:golang" />
            <span class="font-semibold text-slate-500">En construcción</span>
        </div>
    </section>
</template>