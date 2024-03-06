<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap divide-y-2 divide-dashed divide-light-green object-contain">
            <div class="w-full h-1/4 py-1 px-2 mb-1 flex flex-row flex-nowrap">
                <Icon icon_path="/src/assets/Prompt.png" class="my-auto"></Icon>
                <input type="text" v-model="userPrompt" placeholder="Prompt Input"
                    class="input input-bordered input-sm input-ghost w-full mr-2" />
                <button class="btn btn-sm btn-ghost btn-outline w-12 text-dark-green" @click="uploadPrompt">
                    <span v-if="uploading" class="loading loading-dots loading-lg text-dark-green"></span>
                    <svg v-else t="1708698132917" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="8193" id="mx_n_1708698132917">
                        <path
                            d="M511.20898437 709.75390625c-16.96289063 0-30.76171875-13.79882813-30.76171874-30.76171875V223.27929687L427.625 276.1015625c-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0-12.04101563-12.04101563-12.04101563-31.46484375 0-43.50585938L489.41210937 127.30273437c12.04101563-12.04101563 31.46484375-12.04101563 43.50585938 1e-8l105.29296875 105.29296875c12.04101563 12.04101563 12.04101563 31.46484375 0 43.50585937-12.04101563 12.04101563-31.46484375 12.04101563-43.50585938 0L541.8828125 223.27929687V678.9921875c0.08789063 17.05078125-13.7109375 30.76171875-30.67382813 30.76171875z"
                            p-id="8194" fill="#274E13"></path>
                        <path
                            d="M831.48242188 876.13085938H194.890625c-25.48828125 0-46.14257813-20.7421875-46.14257813-46.14257813V508.04492187c0-25.48828125 20.7421875-46.14257813 46.14257813-46.14257812h148.44726563c19.42382813 0 35.15625 15.73242188 35.15624999 35.15625s-15.73242188 35.15625-35.15625 35.15625H219.06054687v273.60351563H807.3125V532.21484375H680.83789063c-19.42382813 0-35.15625-15.73242188-35.15625001-35.15625s15.73242188-35.15625 35.15625-35.15625h150.55664063c25.48828125 0 46.14257813 20.7421875 46.14257813 46.14257813v321.94335937c0.08789063 25.48828125-20.65429688 46.14257813-46.0546875 46.14257813z m-1e-8-343.91601563z"
                            p-id="8195" fill="#274E13"></path>
                    </svg>
                </button>
            </div>
            <div class="w-full h-3/4 grow py-1 px-2 flex flex-row flex-nowrap object-contain">
                <Icon icon_path="/src/assets/Gallery.png"></Icon>

                <div class=" grow flex flex-row flex-nowrap justify-evenly items-center object-contain">
                    <div v-for="imageId in promptImages" class="h-full w-1/4 items-center object-contain"
                        :class="{ 'border-2 border-dashed border-light-green': selectedImageId === imageId }"
                        @click="selectImage(imageId)">
                        <img :src="get_image_url(imageId)"
                            class="h-full w-full box-border shadow-xl hover:shadow-light-green object-contain" />
                    </div>
                </div>

                <button class="btn btn-circle btn-xs btn-ghost text-dark-green" @click="promptRefresh">
                    <span v-if="refreshLoading" class="loading loading-spinner loading-xs text-dark-green"></span>
                    <svg v-else t="1708703396523" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5847">
                        <path
                            d="M545.834667 97.834667a42.666667 42.666667 0 0 1 60.330666 0l128 128a42.666667 42.666667 0 0 1 0 60.330666l-128 128a42.666667 42.666667 0 0 1-60.330666-60.330666L601.002667 298.666667H533.333333C381.952 298.666667 256 424.618667 256 576S381.952 853.333333 533.333333 853.333333s277.333333-125.952 277.333334-277.333333a42.666667 42.666667 0 1 1 85.333333 0c0 198.485333-164.181333 362.666667-362.666667 362.666667S170.666667 774.485333 170.666667 576 334.848 213.333333 533.333333 213.333333h67.669334l-55.168-55.168a42.666667 42.666667 0 0 1 0-60.330666z"
                            fill="#274E13" p-id="5848"></path>
                    </svg>
                </button>
            </div>
        </div>
    </BaseFrame>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { storeToRefs } from 'pinia'

import Icon from "./Icon.vue";
import BaseFrame from "./BaseFrame.vue";

import { pregenerate_post, get_image_url } from '@/api/index.ts'
import { userSelection } from '@/store/modules/userSelection.ts'

const { selectedImageId, userPrompt } = storeToRefs(userSelection());

const uploading = ref(false)
const refreshLoading = ref(false)
const promptImages = ref()

const uploadPrompt = () => {
    uploading.value = true

    let data = {
        user_prompt: userPrompt.value
    }

    pregenerate_post(data).then(response => {
        promptImages.value = response.image_id;
        uploading.value = false
    }).catch(error => {
        console.log(error)
        uploading.value = false
    })
}

const promptRefresh = () => {
    if (userPrompt.value) {
        refreshLoading.value = true

        let data = {
            user_prompt: userPrompt.value
        }

        pregenerate_post(data).then(response => {
            promptImages.value = response.image_id;
            refreshLoading.value = false
        }).catch(error => {
            console.log(error)
            refreshLoading.value = false
        })
    } else {
        alert("Please fill in the prompt")
    }
}

const selectImage = (id: string) => {
    selectedImageId.value = id
}

watch(promptImages, () => {
    selectedImageId.value = ""
})
</script>

<style scoped></style>