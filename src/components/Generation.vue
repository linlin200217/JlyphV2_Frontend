<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap divide-y-2 divide-dashed divide-light-green">
            <div class="w-full py-1 px-2 mb-1 flex flex-row flex-nowrap justify-between">
                <Icon icon_path="/src/assets/Generation.png"></Icon>
                <button class="btn btn-sm btn-ghost btn-outline min-w-20" @click="uploadGeneration">
                    <span v-if="uploading" class="loading loading-dots loading-md text-dark-green"></span>
                    <span v-else class="text-dark-green">Submit</span>
                </button>
            </div>
        </div>
    </BaseFrame>
</template>

<script setup lang="ts">
import { ref } from "vue"

import Icon from "./Icon.vue";
import BaseFrame from "./BaseFrame.vue";

const uploading = ref(false)

const uploadGeneration = () => {
    uploading.value = !uploading.value
}
</script>

<style scoped></style>