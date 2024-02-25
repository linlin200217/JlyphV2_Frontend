<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap">

            <div class="w-full h-1/10 pt-1 px-2 flex flex-row flex-nowrap">
                <Icon icon_path="/src/assets/Selection.png"></Icon>
                <div class="mx-auto text-wrap">
                    <p class="text-light-green text-xs">Categorical: <span
                            class="text-dark-green text-base decoration-dark-green hover:underline mx-1">A</span></p>
                </div>
                <div class="mx-auto text-wrap">
                    <p class="text-light-green text-xs">Numerical: <span
                            class="text-dark-green text-base decoration-dark-green hover:underline mx-1">B</span></p>
                </div>
                <div class="mx-auto text-wrap">
                    <p class="text-light-green text-xs">Select <span
                            class="text-[#CC0000] font-medium text-base decoration-[#CC0000] hover:underline mx-1">A</span>
                        to
                        <span
                            class="text-[#CC0000] font-medium text-base decoration-[#CC0000] hover:underline mx-1">B</span>
                        Masks
                    </p>
                </div>
            </div>


            <div id="image-container" v-show="selectedImageId"
                class="w-full h-4/5 mx-auto my-1 flex justify-center items-center relative">
                <img id="selectable-image" :src="selectedImageId" alt="Selected Figure"
                    class="h-full object-contain block" ref="selectableImage" @load="imageLoaded"/>
                <div id="cover-div" class="absolute inset-0 bg-transparent"  ref="coverDiv"
                    :style="{ width: imageWidth+'px', height: imageHeight+'px' }"></div>
            </div>

            <div class="w-full h-1/10 flex flex-row flex-nowrap justify-evenly my-1">
                <button class="btn btn-sm btn-ghost btn-outline text-dark-green w-28" @click="clearMasks">
                    <svg t="1708709469412" class="icon h-6" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="6856">
                        <path
                            d="M448 256h128V128H448v128z m192-128v128h192a64 64 0 0 1 64 64v128a64 64 0 0 1-54.976 63.36l44.544 311.616a64 64 0 0 1-63.36 73.024H201.792a64 64 0 0 1-63.36-73.024L183.04 511.36A64 64 0 0 1 128 448V320a64 64 0 0 1 64-64h192V128a64 64 0 0 1 64-64h128a64 64 0 0 1 64 64z m136.512 320H832V320H192v128h584.512z m0 64H247.488l-45.696 320H320v-128h64v128h96v-128h64v128H640v-128h64v128h118.208l-45.696-320z"
                            fill="#274E13" fill-opacity=".9" p-id="6857"></path>
                    </svg>
                    Clear
                </button>
                <button class="btn btn-sm btn-ghost btn-outline text-dark-green w-28" @click="uploadMasks">
                    <span v-if="uploading" class="loading loading-dots loading-sm text-dark-green"></span>
                    <svg v-else t="1708698132917" class="icon h-6" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="8193" id="mx_n_1708698132917">
                        <path
                            d="M511.20898437 709.75390625c-16.96289063 0-30.76171875-13.79882813-30.76171874-30.76171875V223.27929687L427.625 276.1015625c-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0-12.04101563-12.04101563-12.04101563-31.46484375 0-43.50585938L489.41210937 127.30273437c12.04101563-12.04101563 31.46484375-12.04101563 43.50585938 1e-8l105.29296875 105.29296875c12.04101563 12.04101563 12.04101563 31.46484375 0 43.50585937-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0L541.8828125 223.27929687V678.9921875c0.08789063 17.05078125-13.7109375 30.76171875-30.67382813 30.76171875z"
                            p-id="8194" fill="#274E13"></path>
                        <path
                            d="M831.48242188 876.13085938H194.890625c-25.48828125 0-46.14257813-20.7421875-46.14257813-46.14257813V508.04492187c0-25.48828125 20.7421875-46.14257813 46.14257813-46.14257812h148.44726563c19.42382813 0 35.15625 15.73242188 35.15624999 35.15625s-15.73242188 35.15625-35.15625 35.15625H219.06054687v273.60351563H807.3125V532.21484375H680.83789063c-19.42382813 0-35.15625-15.73242188-35.15625001-35.15625s15.73242188-35.15625 35.15625-35.15625h150.55664063c25.48828125 0 46.14257813 20.7421875 46.14257813 46.14257813v321.94335937c0.08789063 25.48828125-20.65429688 46.14257813-46.0546875 46.14257813z m-1e-8-343.91601563z"
                            p-id="8195" fill="#274E13"></path>
                    </svg>
                    Upload
                </button>
            </div>
        </div>
    </BaseFrame>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from "vue"
import { storeToRefs } from 'pinia'

import Icon from "./Icon.vue";
import BaseFrame from "./BaseFrame.vue";

import { userSelection } from '/src/store/modules/userSelection.ts'
const { selectedImageId } = storeToRefs(userSelection());

const uploading = ref(false)

const imageWidth = ref(0);
const imageHeight = ref(0);
const isSelecting = ref(false)

const selectableImage =ref<HTMLElement | null | undefined>(null)
const coverDiv =ref<HTMLElement | null | undefined>(null)

const selectionBoxPosition = reactive({
    top: 0,
    left: 0,
    width: 10,
    height: 10
});

const selectionBoxStyle = reactive({
    top: '0px',
    left: '0px',
    width: '0px',
    height: '0px'
})

const imageLoaded = () => {
    if (selectableImage.value) {
        let imgRect = selectableImage.value.getBoundingClientRect();        
        imageWidth.value = imgRect.width;
        imageHeight.value = imgRect.height;
    }
}

const startSelecting = (event) => {
    if (event.target.closest('#cover-div')) {
        console.log("start selecting");
        isSelecting.value = true;        
        if (coverDiv.value) {
            const selectionBox = document.createElement('div');
            selectionBox.className = 'selection-box';
            selectionBox.id = 'box-1'
            selectionBox.textContent = 'Child';

            selectionBox.style.top = selectionBoxStyle.top
            selectionBox.style.left = selectionBoxStyle.left
            selectionBox.style.width = selectionBoxStyle.width
            selectionBox.style.height = selectionBoxStyle.height
            
            updateSelectionBoxStyle();
            coverDiv.value.appendChild(selectionBox);
        }
    }
}

const updateSelection = (event) => {
    if (isSelecting.value) {
        selectionBoxPosition.width = Math.abs(event.clientX - selectionBoxPosition.left);
        selectionBoxPosition.height = Math.abs(event.clientY - selectionBoxPosition.top);
        selectionBoxPosition.left = Math.min(selectionBoxPosition.left, event.clientX);
        selectionBoxPosition.top = Math.min(selectionBoxPosition.top, event.clientY);
        updateSelectionBoxStyle();
    }
}

const stopSelection = (event) => {
    isSelecting.value = false;
    console.log("stop selection");
    resetSelectionBox();
    
}

const updateSelectionBoxStyle = () => {
    selectionBoxStyle.top = `${selectionBoxPosition.top}px`;
    selectionBoxStyle.left = `${selectionBoxPosition.left}px`;
    selectionBoxStyle.width = `${selectionBoxPosition.width}px`;
    selectionBoxStyle.height = `${selectionBoxPosition.height}px`;
}

const resetSelectionBox = () => {
    selectionBoxPosition.top = 0;
    selectionBoxPosition.left = 0;
    selectionBoxPosition.width = 0;
    selectionBoxPosition.height = 0;
    updateSelectionBoxStyle();
}

const uploadMasks = () => {
    uploading.value = !uploading.value
}

const clearMasks = () => {

}

onMounted(() => {
    coverDiv.value?.addEventListener('mousedown', startSelecting);
    window.addEventListener('mousemove', updateSelection);
    window.addEventListener('mouseup', stopSelection);
})

onUnmounted(() => {
    coverDiv.value?.removeEventListener('mousedown', startSelecting);
    window.removeEventListener('mousemove', updateSelection);
    window.removeEventListener('mouseup', stopSelection);
})

</script>

<style scoped>
#cover-div {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

:deep(.selection-box) {
    position: relative;
    border: 2px dashed #274E13;
    pointer-events: none;
}
</style>