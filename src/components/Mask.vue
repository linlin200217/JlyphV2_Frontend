<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-row flex-nowrap">
            <div class="h-full py-1 px-2">
                <Icon icon_path="/src/assets/Mask.png"></Icon>
            </div>

            <div class="grow flex flex-row flex-nowrap overflow-scroll">
                <MaskSingle v-for="(item, index) in maskData" :slot_id="index" :num_key="Numerical_key" :cat_key="Categorical_key"></MaskSingle>
            </div>

            <div class="h-full w-fit mx-2 flex flex-col flex-nowrap justify-evenly place-self-end">
                <button class="btn btn-sm btn-ghost btn-outline text-dark-green w-16 h-16" @click="autoGenerate">
                    <span v-if="automating" class="loading loading-dots loading-sm text-dark-green"></span>
                    <svg v-else t="1708872337657" class="icon h-6 mt-2" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="12086">
                        <path
                            d="M512.372 1023.943q-4.56 0-9.187-0.091a510.104 510.104 0 0 1-192.62-41.408l-58.836-25.212 150.45-165.551 67.474 61.33-60.784 66.814c86.19 22.02 176.801 16.094 260.882-17.894 215.04-86.885 319.26-332.55 232.342-547.591a419.754 419.754 0 0 0-73.686-119.847l68.546-60.077A512.121 512.121 0 0 1 512.372 1024z m-383.27-172.242A511.825 511.825 0 0 1 710.304 40.094l66.107 27.776-173.245 156.49-61.115-67.667 61.366-55.427A420.894 420.894 0 0 0 197.328 791.19z"
                            p-id="12087" fill="#274E13"></path>
                        <path
                            d="M292.681 713.937l169.165-408.812h99.9l169.165 408.812H629.175l-39.892-94.384H434.275l-39.835 94.384zM512.11 403.806l-58.231 142.802h116.45z"
                            p-id="12088" fill="#274E13"></path>
                    </svg>
                    <span class="mb-2">Default</span>
                </button>
                <button class="btn btn-sm btn-ghost btn-outline text-dark-green w-16 h-16" @click="uploadMasks">
                    <span v-if="uploading" class="loading loading-dots loading-sm text-dark-green"></span>
                    <svg v-else t="1708698132917" class="icon h-6 mt-2" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="8193" id="mx_n_1708698132917">
                        <path
                            d="M511.20898437 709.75390625c-16.96289063 0-30.76171875-13.79882813-30.76171874-30.76171875V223.27929687L427.625 276.1015625c-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0-12.04101563-12.04101563-12.04101563-31.46484375 0-43.50585938L489.41210937 127.30273437c12.04101563-12.04101563 31.46484375-12.04101563 43.50585938 1e-8l105.29296875 105.29296875c12.04101563 12.04101563 12.04101563 31.46484375 0 43.50585937-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0L541.8828125 223.27929687V678.9921875c0.08789063 17.05078125-13.7109375 30.76171875-30.67382813 30.76171875z"
                            p-id="8194" fill="#274E13"></path>
                        <path
                            d="M831.48242188 876.13085938H194.890625c-25.48828125 0-46.14257813-20.7421875-46.14257813-46.14257813V508.04492187c0-25.48828125 20.7421875-46.14257813 46.14257813-46.14257812h148.44726563c19.42382813 0 35.15625 15.73242188 35.15624999 35.15625s-15.73242188 35.15625-35.15625 35.15625H219.06054687v273.60351563H807.3125V532.21484375H680.83789063c-19.42382813 0-35.15625-15.73242188-35.15625001-35.15625s15.73242188-35.15625 35.15625-35.15625h150.55664063c25.48828125 0 46.14257813 20.7421875 46.14257813 46.14257813v321.94335937c0.08789063 25.48828125-20.65429688 46.14257813-46.0546875 46.14257813z m-1e-8-343.91601563z"
                            p-id="8195" fill="#274E13"></path>
                    </svg>
                    <span class="mb-2">Upload</span>
                </button>
            </div>
        </div>
    </BaseFrame>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from 'pinia'

import Icon from "./Icon.vue";
import BaseFrame from "./BaseFrame.vue";
import MaskSingle from "./Mask-single.vue";

import { get_image_url } from '@/api/index.ts'
import { userSelection } from '@/store/modules/userSelection.ts'
const { maskData, selectedMaskNumber, Categorical_key, Categorical_num, Numerical_key, Numerical_num } = storeToRefs(userSelection());

const automating = ref(false);
const uploading = ref(false);

const autoGenerate = () => {
    automating.value = !automating.value;
}

const uploadMasks = () => {
    if ( selectedMaskNumber.value < Math.max(Categorical_num.value, Numerical_num.value) ) {
        alert("Not Enough Mask Selected!")
        return
    } else if ( selectedMaskNumber.value > Categorical_num.value + Numerical_num.value ) {
        alert("Too Many Mask Selected!")
        return
    } else {

    }
    uploading.value = !uploading.value;
}
</script>

<style scoped></style>