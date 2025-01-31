<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap">

            <div class="w-full h-1/10 pt-1 px-2 flex flex-row flex-nowrap">
                <Icon icon_path="/src/assets/Selection.png"></Icon>
                <div class="mx-auto text-wrap">
                    <p class="text-light-green text-xs">Categorical: <span
                            class="text-dark-green text-base decoration-dark-green hover:underline mx-1">{{ Categorical_num
                            }}</span></p>
                </div>
                <div class="mx-auto text-wrap">
                    <p class="text-light-green text-xs">Numerical: <span
                            class="text-dark-green text-base decoration-dark-green hover:underline mx-1">{{ Numerical_num
                            }}</span></p>
                </div>
                <div class="mx-auto text-wrap">
                    <p class="text-light-green text-xs">Select <span
                            class="text-[#CC0000] font-medium text-base decoration-[#CC0000] hover:underline mx-1">{{
                                Math.max(Categorical_num, Numerical_num) }}</span>
                        to
                        <span class="text-[#CC0000] font-medium text-base decoration-[#CC0000] hover:underline mx-1">{{
                            Categorical_num + Numerical_num }}</span>
                        Masks
                    </p>
                </div>
            </div>


            <div id="image-container" v-show="selectedImageId"
                class="w-full h-4/5 mx-auto my-1 flex justify-center items-center relative">
                <img id="selectable-image" :src="get_image_url(selectedImageId)" alt="Selected Figure"
                    class="h-full object-contain block" ref="selectableImage" @load="imageLoaded" />
                <svg id="cover-div" class="absolute inset-0 bg-transparent" ref="coverSvg"
                    :style="{ width: imageWidth + 'px', height: imageHeight + 'px' }"></svg>
            </div>

            <div class="w-full h-1/10 flex flex-row flex-nowrap justify-evenly my-1">
                <button class="btn btn-sm btn-ghost btn-outline text-dark-green w-26" @click="clearBrush">
                    <svg v-if="false" t="1708973332700" class="icon h-6" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4214">
                        <path
                            d="M448 256h128V128H448v128z m192-128v128h192a64 64 0 0 1 64 64v128a64 64 0 0 1-54.976 63.36l44.544 311.616a64 64 0 0 1-63.36 73.024H201.792a64 64 0 0 1-63.36-73.024L183.04 511.36A64 64 0 0 1 128 448V320a64 64 0 0 1 64-64h192V128a64 64 0 0 1 64-64h128a64 64 0 0 1 64 64z m136.512 320H832V320H576 448 192v128h584.512z m0 64H247.488l-45.696 320H320v-128h64v128h96v-128h64v128H640v-128h64v128h118.208l-45.696-320z"
                            fill="#274E13" fill-opacity="1" p-id="4215"></path>
                    </svg>
                    Remove
                </button>
                <button class="btn btn-sm btn-ghost btn-outline text-dark-green w-26" @click="selectUserImage">
                    <svg v-if="false" t="1708973332700" class="icon h-6" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4214">
                        <path
                            d="M448 256h128V128H448v128z m192-128v128h192a64 64 0 0 1 64 64v128a64 64 0 0 1-54.976 63.36l44.544 311.616a64 64 0 0 1-63.36 73.024H201.792a64 64 0 0 1-63.36-73.024L183.04 511.36A64 64 0 0 1 128 448V320a64 64 0 0 1 64-64h192V128a64 64 0 0 1 64-64h128a64 64 0 0 1 64 64z m136.512 320H832V320H576 448 192v128h584.512z m0 64H247.488l-45.696 320H320v-128h64v128h96v-128h64v128H640v-128h64v128h118.208l-45.696-320z"
                            fill="#274E13" fill-opacity="1" p-id="4215"></path>
                    </svg>
                    Upload
                </button>
                <button class="btn btn-sm btn-ghost btn-outline text-dark-green w-36" @click="uploadMasks">
                    <span v-if="uploading" class="loading loading-dots loading-sm text-dark-green"></span>
                    <svg v-if="false" t="1708698132917" class="icon h-6" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="8193" id="mx_n_1708698132917">
                        <path
                            d="M511.20898437 709.75390625c-16.96289063 0-30.76171875-13.79882813-30.76171874-30.76171875V223.27929687L427.625 276.1015625c-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0-12.04101563-12.04101563-12.04101563-31.46484375 0-43.50585938L489.41210937 127.30273437c12.04101563-12.04101563 31.46484375-12.04101563 43.50585938 1e-8l105.29296875 105.29296875c12.04101563 12.04101563 12.04101563 31.46484375 0 43.50585937-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0L541.8828125 223.27929687V678.9921875c0.08789063 17.05078125-13.7109375 30.76171875-30.67382813 30.76171875z"
                            p-id="8194" fill="#274E13"></path>
                        <path
                            d="M831.48242188 876.13085938H194.890625c-25.48828125 0-46.14257813-20.7421875-46.14257813-46.14257813V508.04492187c0-25.48828125 20.7421875-46.14257813 46.14257813-46.14257812h148.44726563c19.42382813 0 35.15625 15.73242188 35.15624999 35.15625s-15.73242188 35.15625-35.15625 35.15625H219.06054687v273.60351563H807.3125V532.21484375H680.83789063c-19.42382813 0-35.15625-15.73242188-35.15625001-35.15625s15.73242188-35.15625 35.15625-35.15625h150.55664063c25.48828125 0 46.14257813 20.7421875 46.14257813 46.14257813v321.94335937c0.08789063 25.48828125-20.65429688 46.14257813-46.0546875 46.14257813z m-1e-8-343.91601563z"
                            p-id="8195" fill="#274E13"></path>
                    </svg>
                    Select Mask
                </button>
            </div>
        </div>
    </BaseFrame>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from "vue"
import { storeToRefs } from 'pinia'
import * as d3 from 'd3'
import 'd3-brush'

import Icon from "./Icon.vue";
import BaseFrame from "./BaseFrame.vue";

import { maskselect_post, get_image_url, upload_user_image } from '@/api/index.ts'
import { userSelection } from '@/store/modules/userSelection.ts'
const { selectedImageId, maskData, Categorical_num, Numerical_num } = storeToRefs(userSelection());

const uploading = ref(false);

const imageWidth = ref(0);
const imageHeight = ref(0);
const mask_refine = ref(2);

const selectableImage = ref<HTMLElement | null | undefined>(null)
const coverSvg = ref<SVGSVGElement | null | undefined>(null)

const selectionSize = reactive({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
})

interface mask_data {
    widget: {
        'x': number,
        'y': number,
        'width': number,
        'height': number,
    },
    image_id: string,
    mask_refine: number,
    categorical: string,
    numerical: string,
    mask_id: string
}

const imageLoaded = () => {
    if (selectableImage.value) {
        let imgRect = selectableImage.value.getBoundingClientRect();
        imageWidth.value = imgRect.width;
        imageHeight.value = imgRect.height;

        initBrush();
    }
}

let brush;

const initBrush = () => {
    if (coverSvg.value) {
        let svg = d3.select(coverSvg.value)

        brush = d3.brush()
            .extent([[0, 0], [imageWidth.value, imageHeight.value]])
            .on('start brush end', function (event) {
                if (event.selection) {
                    let [[x1, y1], [x2, y2]] = event.selection;

                    let imageSideLength = Math.min(imageWidth.value, imageHeight.value)
                    let scale = 512 / imageSideLength;

                    if (imageWidth.value != imageHeight.value) {
                        let difference = imageHeight.value - imageWidth.value
                        if (x1 > difference) {
                            selectionSize.x = Math.abs(x1 - difference) * scale;
                        } else {
                            selectionSize.x = 0
                        }
                    } else {
                        selectionSize.x = Math.abs(x1) * scale;
                    }

                    selectionSize.y = Math.abs(y1) * scale;
                    selectionSize.width = Math.abs(x2 - x1) * scale;
                    selectionSize.height = Math.abs(y2 - y1) * scale;
                }

            })
        svg.call(brush)
    }
}

const selectUserImage = async () => {
    // Create an input element of type 'file'
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Accept only image files

    // Trigger the file selection dialog
    input.click();

    // Handle the file selection
    input.onchange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            // Validate the file type
            if (!file.type.startsWith('image/')) {
                alert("Invalid file type. Please upload an image file.");
                return;
            }

            // Prepare the form data for the upload
            const formData = new FormData();
            formData.append('image', file);

            try {
                // Upload the image to the backend
                const response = await upload_user_image(formData);
                console.log(response);

                // Todo
                // selectedImageId.value = id
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };
};

// Example uploadImage function (you need to implement this based on your backend API)
const uploadImage = async (formData) => {
    const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload image');
    }

    return response.json();
};


const clearBrush = () => {
    if (coverSvg.value) {
        let svg = d3.select(coverSvg.value);
        svg.call(brush.move, null);
    }
}

const uploadMasks = () => {
    if (selectedImageId.value) {
        uploading.value = true;

        let data = {
            widget: {
                'x': selectionSize.x,
                'y': selectionSize.y,
                'width': selectionSize.width,
                'height': selectionSize.height,
            },
            image_id: selectedImageId.value,
            mask_refine: mask_refine.value
        }

        let mask: mask_data
        mask = {
            widget: {
                'x': selectionSize.x,
                'y': selectionSize.y,
                'width': selectionSize.width,
                'height': selectionSize.height,
            },
            image_id: selectedImageId.value,
            mask_refine: mask_refine.value,
            categorical: '',
            numerical: '',
            mask_id: '',
        }
        
        maskselect_post(data).then(response => {
            mask.mask_id = response.mask_image_id;
            maskData.value.push(mask);
            uploading.value = false
            clearBrush();
        }).catch(error => {
            console.log(error)
            uploading.value = false
            clearBrush();
        })
    } else {
        alert("Mask or image empty")
    }
}

onMounted(() => {
    window.addEventListener('resize', imageLoaded);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', imageLoaded);
});
</script>

<style scoped>
#cover-div {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>