<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap divide-y-2 divide-dashed divide-light-green">
            <div class="w-full py-1 px-2 mb-1 flex flex-row flex-nowrap justify-between">
                <Icon icon_path="/src/assets/Generation.png"></Icon>
                <button class="btn btn-sm btn-ghost btn-outline">
                    <span class="loading loading-spinner"></span>
                    Submit
                </button>
            </div>
        </div>
    </BaseFrame>
</template>

<script setup lang="ts">
import BaseFrame from "./BaseFrame.vue";
import Icon from "./Icon.vue";
</script>

<style scoped></style>