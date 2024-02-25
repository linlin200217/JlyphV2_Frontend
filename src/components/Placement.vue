<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap divide-y-2 divide-dashed divide-light-green">
            <div class="w-full py-1 px-2">
                <Icon icon_path="/src/assets/Placement.png"></Icon>
            </div>
            <div class="p-2 flex justify-center">
                <button class="btn btn-sm btn-ghost btn-wide btn-outline w-full min-w-24" @click="finalSubmission">
                    <span v-if="uploading" class="loading loading-dots loading-md text-dark-green"></span>
                    <span v-else class="text-dark-green">Final Submission</span>
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

const finalSubmission = () => {
    uploading.value = !uploading.value
}
</script>

<style scoped></style>