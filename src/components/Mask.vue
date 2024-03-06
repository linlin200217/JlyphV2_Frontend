<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-row flex-nowrap">
            <div class="h-full py-1 px-2">
                <Icon icon_path="/src/assets/Mask.png"></Icon>
            </div>

            <div class="grow flex flex-row flex-nowrap overflow-scroll">
                <MaskSingle v-for="(_, index) in maskData" :slot_id="index" :num_key="Numerical_key"
                    :cat_key="Categorical_key"></MaskSingle>
            </div>

            <div class="h-full w-fit mx-2 flex flex-col flex-nowrap justify-evenly place-self-end">
                <button class="btn btn-sm btn-ghost btn-outline text-dark-green w-16 h-16" @click="removeMasks">
                    <svg t="1708973332700" class="icon h-6 mt-2" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4214">
                        <path
                            d="M448 256h128V128H448v128z m192-128v128h192a64 64 0 0 1 64 64v128a64 64 0 0 1-54.976 63.36l44.544 311.616a64 64 0 0 1-63.36 73.024H201.792a64 64 0 0 1-63.36-73.024L183.04 511.36A64 64 0 0 1 128 448V320a64 64 0 0 1 64-64h192V128a64 64 0 0 1 64-64h128a64 64 0 0 1 64 64z m136.512 320H832V320H576 448 192v128h584.512z m0 64H247.488l-45.696 320H320v-128h64v128h96v-128h64v128H640v-128h64v128h118.208l-45.696-320z"
                            fill="#274E13" fill-opacity="1" p-id="4215"></path>
                    </svg>
                    <span class="mb-2">Clear</span>
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

import { generate_element_post } from '@/api/index.ts'
import { userSelection } from '@/store/modules/userSelection.ts'
const { userPrompt, maskData, selectedMaskNumber, mask_order, Categorical_key, Categorical_num, Cat_selected, Numerical_key, Numerical_num, Num_selected, rgba_images_by_category } = storeToRefs(userSelection());

const uploading = ref(false);

const removeMasks = () => {
    Cat_selected.value = [];
    Num_selected.value = [];
}

const uploadMasks = () => {
    if (selectedMaskNumber.value < Math.max(Categorical_num.value, Numerical_num.value)) {
        alert("Not Enough Mask Selected!")
        return
    } else if (selectedMaskNumber.value > Categorical_num.value + Numerical_num.value) {
        alert("Too Many Mask Selected!")
        return
    } else {
        let mask_forall_data = []
        for (let i = 0; i < maskData.value.length; i++) {
            let item = maskData.value[i];
            if (!item.categorical && !item.numerical) {
                alert(`Please select attribute for mask ${i}!`)
                uploading.value = false
                return
            }

            if (item.categorical) {
                let data = {
                    Colname: item.categorical,
                    Widget: item.widget,
                    Refine_num: item.mask_refine,
                    Class: "Categorical",
                }
                mask_forall_data.push(data);
            }

            if (item.numerical) {
                let data = {
                    Colname: item.numerical,
                    Widget: item.widget,
                    Refine_num: item.mask_refine,
                    Class: "Numerical",
                }
                mask_forall_data.push(data);
            }
        }

        let data = {
            prompt: userPrompt.value,
            mask_forall: mask_forall_data,
            chosen_image_id: maskData.value[0].image_id,
        }

        uploading.value = true
        generate_element_post(data).then(response => {

            let sorted_rgba_images = mask_order.value.reduce((obj, key) => {
                if (response.rgba_images_by_category.hasOwnProperty(key)) {
                    obj[key] = response.rgba_images_by_category[key];
                }
                return obj;
            }, {});
            
            rgba_images_by_category.value = sorted_rgba_images;

            uploading.value = false
        }).catch(error => {
            console.log(error)
            uploading.value = false
        })
    }
}
</script>

<style scoped></style>