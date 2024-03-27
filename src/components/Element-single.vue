<template>
    <div class="flex flex-col flex-nowrap justify-between b-1 w-40">
        <div class="w-[90%] h-[12%] mx-auto text-center text-sm text-wrap capitalize rounded-2xl bg-light-green flex">
            <span class="m-auto text-black">{{ slot_data.prompt_detail }}</span>

        </div>
        <div class="w-full h-[70%] relative">
            <button class="btn btn-circle btn-xs btn-ghost absolute bottom-1 left-1 text-dark-green" @click="refreshElement">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="#274E13" viewBox="0 0 1024 1024"
                    stroke="currentColor">
                    <path stroe-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M545.834667 97.834667a42.666667 42.666667 0 0 1 60.330666 0l128 128a42.666667 42.666667 0 0 1 0 60.330666l-128 128a42.666667 42.666667 0 0 1-60.330666-60.330666L601.002667 298.666667H533.333333C381.952 298.666667 256 424.618667 256 576S381.952 853.333333 533.333333 853.333333s277.333333-125.952 277.333334-277.333333a42.666667 42.666667 0 1 1 85.333333 0c0 198.485333-164.181333 362.666667-362.666667 362.666667S170.666667 774.485333 170.666667 576 334.848 213.333333 533.333333 213.333333h67.669334l-55.168-55.168a42.666667 42.666667 0 0 1 0-60.330666z" />
                </svg>
            </button>
            <div class="h-full flex justify-center items-center">
                <img :src="get_image_url(slot_data.rgba_image_id)" alt="RGBA image" class="h-full block object-contain">
            </div>
        </div>
        <div class="w-full h-[18%] flex justify-center items-center">
            <input type="text" v-model="wholePrompt" placeholder=""
                class="input input-bordered input-xs input-ghost w-[90%]" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { regenerate_post, get_image_url } from '@/api/index.ts'

const props = defineProps(['slot_data', 'mask_data'])
const wholePrompt = ref('')

const refreshElement = () => {
    let data = {
        image_id: props.mask_data.image_id,
        mask: {
            Colname: props.mask_data.categorical ? props.mask_data.categorical : props.mask_data.numerical,
            Widget: props.mask_data.widget,
            Refine_num: props.mask_data.mask_refine
        }
    }

    if (wholePrompt.value) {
        data["prompt"] = null
        data["whole_prompt"] = wholePrompt.value
    } else {
        data["prompt"] = props.slot_data.prompt_detail
        data["whole_prompt"] = null
    }

    regenerate_post(data).then(response => {
        props.slot_data.rgba_image_id = response.re_generate_rgba_id
    }).catch(error => {
        console.log(error)
    })
}
</script>

<style scoped></style>