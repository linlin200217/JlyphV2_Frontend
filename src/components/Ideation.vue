<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap divide-y-2 divide-dashed divide-light-green">
            <div class="w-full py-1 px-2 mb-1 flex flex-row flex-nowrap">
                <Icon icon_path="/src/assets/Prompt.png"></Icon>
                <input type="text" placeholder="Prompt Input" class="input input-bordered input-sm input-ghost w-full max-w-xs" />
            </div>
            <div class="w-full py-1 px-2">
                <Icon icon_path="/src/assets/Gallery.png"></Icon>
            </div>
        </div>
    </BaseFrame>
</template>

<script setup lang="ts">
import BaseFrame from "./BaseFrame.vue";
import Icon from "./Icon.vue";
</script>

<style scoped></style>