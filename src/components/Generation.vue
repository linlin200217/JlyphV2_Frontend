<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap">
            <div class="w-full h-[5%] py-1 px-2 mb-1 flex flex-row flex-nowrap justify-between">
                <Icon icon_path="/src/assets/Generation.png"></Icon>
                <button class="btn btn-sm btn-ghost btn-outline min-w-20" @click="uploadGeneration">
                    <span v-if="uploading" class="loading loading-dots loading-md text-dark-green"></span>
                    <svg v-else t="1708698132917" class="icon h-6" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="8193" id="mx_n_1708698132917">
                        <path
                            d="M511.20898437 709.75390625c-16.96289063 0-30.76171875-13.79882813-30.76171874-30.76171875V223.27929687L427.625 276.1015625c-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0-12.04101563-12.04101563-12.04101563-31.46484375 0-43.50585938L489.41210937 127.30273437c12.04101563-12.04101563 31.46484375-12.04101563 43.50585938 1e-8l105.29296875 105.29296875c12.04101563 12.04101563 12.04101563 31.46484375 0 43.50585937-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0L541.8828125 223.27929687V678.9921875c0.08789063 17.05078125-13.7109375 30.76171875-30.67382813 30.76171875z"
                            p-id="8194" fill="#274E13"></path>
                        <path
                            d="M831.48242188 876.13085938H194.890625c-25.48828125 0-46.14257813-20.7421875-46.14257813-46.14257813V508.04492187c0-25.48828125 20.7421875-46.14257813 46.14257813-46.14257812h148.44726563c19.42382813 0 35.15625 15.73242188 35.15624999 35.15625s-15.73242188 35.15625-35.15625 35.15625H219.06054687v273.60351563H807.3125V532.21484375H680.83789063c-19.42382813 0-35.15625-15.73242188-35.15625001-35.15625s15.73242188-35.15625 35.15625-35.15625h150.55664063c25.48828125 0 46.14257813 20.7421875 46.14257813 46.14257813v321.94335937c0.08789063 25.48828125-20.65429688 46.14257813-46.0546875 46.14257813z m-1e-8-343.91601563z"
                            p-id="8195" fill="#274E13"></path>
                    </svg>
                    <span class="text-dark-green">Submit</span>
                </button>
            </div>

            <div class="w-full h-[95%] flex flex-row flex-nowrap py-1 relative">
                <div class="h-full w-1/3 flex flex-col flex-nowrap justify-start">
                    <div
                        class="w-full h-1/2 flex flex-col flex-nowrap justify-start shadow-lg shadow-dark-green bg-white box-border border-2 border-dark-green border-dashed rounded-lg p-1">
                        <div class="flex justify-center">
                            <button class="btn btn-sm btn-ghost btn-outline min-w-20" @click="uploadGeneration">
                                <span v-if="uploading" class="loading loading-dots loading-md text-dark-green"></span>
                                <svg v-else t="1708698132917" class="icon h-6" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="8193" id="mx_n_1708698132917">
                                    <path
                                        d="M511.20898437 709.75390625c-16.96289063 0-30.76171875-13.79882813-30.76171874-30.76171875V223.27929687L427.625 276.1015625c-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0-12.04101563-12.04101563-12.04101563-31.46484375 0-43.50585938L489.41210937 127.30273437c12.04101563-12.04101563 31.46484375-12.04101563 43.50585938 1e-8l105.29296875 105.29296875c12.04101563 12.04101563 12.04101563 31.46484375 0 43.50585937-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0L541.8828125 223.27929687V678.9921875c0.08789063 17.05078125-13.7109375 30.76171875-30.67382813 30.76171875z"
                                        p-id="8194" fill="#274E13"></path>
                                    <path
                                        d="M831.48242188 876.13085938H194.890625c-25.48828125 0-46.14257813-20.7421875-46.14257813-46.14257813V508.04492187c0-25.48828125 20.7421875-46.14257813 46.14257813-46.14257812h148.44726563c19.42382813 0 35.15625 15.73242188 35.15624999 35.15625s-15.73242188 35.15625-35.15625 35.15625H219.06054687v273.60351563H807.3125V532.21484375H680.83789063c-19.42382813 0-35.15625-15.73242188-35.15625001-35.15625s15.73242188-35.15625 35.15625-35.15625h150.55664063c25.48828125 0 46.14257813 20.7421875 46.14257813 46.14257813v321.94335937c0.08789063 25.48828125-20.65429688 46.14257813-46.0546875 46.14257813z m-1e-8-343.91601563z"
                                        p-id="8195" fill="#274E13"></path>
                                </svg>
                                <span class="text-dark-green">Preview</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class=" w-2/3 overflow-y-scroll">
                    <div v-for="(items, key, index) in rgba_images_by_category"
                        class="h-48 w-full flex flex-row flex-nowrap overflow-scroll">
                        <div class="h-full w-[100px] font-bold text-center text-dark-green text-wrap capitalize">{{ key }}
                        </div>
                        <ElementSingle v-for="(item, _) in items" :slot_data="item" :mask_data="maskData[index]">
                        </ElementSingle>
                    </div>
                    
                </div>

                <div class="absolute bottom-2 right-2">
                        <button class="btn btn-sm btn-ghost btn-outline min-w-20" @click="uploadGeneration">
                            <span v-if="uploading" class="loading loading-dots loading-md text-dark-green"></span>
                            <svg v-else t="1708698132917" class="icon h-6" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="8193" id="mx_n_1708698132917">
                                <path
                                    d="M511.20898437 709.75390625c-16.96289063 0-30.76171875-13.79882813-30.76171874-30.76171875V223.27929687L427.625 276.1015625c-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0-12.04101563-12.04101563-12.04101563-31.46484375 0-43.50585938L489.41210937 127.30273437c12.04101563-12.04101563 31.46484375-12.04101563 43.50585938 1e-8l105.29296875 105.29296875c12.04101563 12.04101563 12.04101563 31.46484375 0 43.50585937-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0L541.8828125 223.27929687V678.9921875c0.08789063 17.05078125-13.7109375 30.76171875-30.67382813 30.76171875z"
                                    p-id="8194" fill="#274E13"></path>
                                <path
                                    d="M831.48242188 876.13085938H194.890625c-25.48828125 0-46.14257813-20.7421875-46.14257813-46.14257813V508.04492187c0-25.48828125 20.7421875-46.14257813 46.14257813-46.14257812h148.44726563c19.42382813 0 35.15625 15.73242188 35.15624999 35.15625s-15.73242188 35.15625-35.15625 35.15625H219.06054687v273.60351563H807.3125V532.21484375H680.83789063c-19.42382813 0-35.15625-15.73242188-35.15625001-35.15625s15.73242188-35.15625 35.15625-35.15625h150.55664063c25.48828125 0 46.14257813 20.7421875 46.14257813 46.14257813v321.94335937c0.08789063 25.48828125-20.65429688 46.14257813-46.0546875 46.14257813z m-1e-8-343.91601563z"
                                    p-id="8195" fill="#274E13"></path>
                            </svg>
                            <span class="text-dark-green">Submit</span>
                        </button>
                    </div>
            </div>
        </div>
    </BaseFrame>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from 'pinia'

import Icon from "./Icon.vue";
import BaseFrame from "./BaseFrame.vue";
import ElementSingle from "./Element-single.vue";

import { } from '@/api/index.ts'
import { userSelection } from '@/store/modules/userSelection.ts'
const { rgba_images_by_category, maskData } = storeToRefs(userSelection());

const uploading = ref(false)

const uploadGeneration = () => {
    uploading.value = !uploading.value
}
</script>

<style scoped></style>