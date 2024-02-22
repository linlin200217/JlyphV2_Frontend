<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap divide-y-2 divide-dashed divide-light-green">
            <div class="w-full py-1 px-2">
                <Icon icon_path="/src/assets/Placement.png"></Icon>
            </div>
            <div class="p-2 flex justify-center">
                <button class="btn btn-sm btn-ghost btn-wide btn-outline">
                    <span class="loading loading-spinner"></span>
                    Final Submission
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