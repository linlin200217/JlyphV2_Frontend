<template>
    <div class="flex flex-col flex-nowrap justify-between m-4 w-40">
        <div class="w-full h-3/4 relative">
            <button class="btn btn-circle btn-xs btn-ghost absolute bottom-2 right-1 text-dark-green" @click="refreshMask">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 0 1024 1024"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M545.834667 97.834667a42.666667 42.666667 0 0 1 60.330666 0l128 128a42.666667 42.666667 0 0 1 0 60.330666l-128 128a42.666667 42.666667 0 0 1-60.330666-60.330666L601.002667 298.666667H533.333333C381.952 298.666667 256 424.618667 256 576S381.952 853.333333 533.333333 853.333333s277.333333-125.952 277.333334-277.333333a42.666667 42.666667 0 1 1 85.333333 0c0 198.485333-164.181333 362.666667-362.666667 362.666667S170.666667 774.485333 170.666667 576 334.848 213.333333 533.333333 213.333333h67.669334l-55.168-55.168a42.666667 42.666667 0 0 1 0-60.330666z" />
                </svg>
            </button>
            <button class="btn btn-circle btn-xs btn-ghost btn-outline absolute top-1 right-1 text-dark-green" @click="removeMask">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div class="w-full h-full object-contain flex justify-center items-center bg-dark-green rounded-lg">
                <img :src="get_image_url(maskData[slot_id].mask_id)" alt="Selected Mask"
                    class="h-full object-contain block">
            </div>
        </div>

        <div class="w-full h-1/4">
            <div class="w-full h-1/2">
                <select class="select select-bordered select-ghost select-xs w-1/2 h-full" v-model="select_cat">
                    <option disabled>Categorical</option>
                    <option v-for="item in cat_key" :disabled="Cat_selected.includes(item)">{{ item }}</option>
                </select>
                <select class="select select-bordered select-ghost select-xs w-1/2 h-full" v-model="select_num">
                    <option disabled>Numerical</option>
                    <option v-for="item in num_key" :disabled="Num_selected.includes(item)">{{ item }}</option>
                </select>
            </div>
            <div class="w-full h-1/2">
                <select class="select select-bordered select-ghost select-xs w-full h-full" v-model="maskRefine">
                    <option selected>2</option>
                    <option>1</option>
                    <option>0</option>
                </select>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { storeToRefs } from 'pinia'

import { maskselect_post, get_image_url } from '@/api/index.ts'
import { userSelection } from '@/store/modules/userSelection.ts'
const { maskData, Cat_selected, Num_selected } = storeToRefs(userSelection());

const props = defineProps(['slot_id', 'num_key', 'cat_key'])

const maskRefine = ref(2)
const select_cat = ref("Categorical")
const select_num = ref("Numerical")

const removeMask = () => {
    maskData.value.splice(props.slot_id, 1)
}

const refreshMask = () => {
    maskData.value[props.slot_id].mask_refine = Number(maskRefine.value);

    let data = {
        widget: maskData.value[props.slot_id].widget,
        image_id: maskData.value[props.slot_id].image_id,
        mask_refine: maskData.value[props.slot_id].mask_refine
    }

    maskselect_post(data).then(response => {
        maskData.value[props.slot_id].mask_id = response.mask_image_id;
    }).catch(error => {
        console.log(error)
    })
}

watch(select_cat, (newValue, oldValue) => {
    let index = Cat_selected.value.indexOf(oldValue);
    if (index > -1) {
        Cat_selected.value.splice(index, 1)
    }
    Cat_selected.value.push(newValue)
    maskData.value[props.slot_id].categorical = newValue
})

watch(select_num, (newValue, oldValue) => {
    let index = Num_selected.value.indexOf(oldValue);
    if (index > -1) {
        Num_selected.value.splice(index, 1)
    }
    Num_selected.value.push(newValue)
    maskData.value[props.slot_id].numerical = newValue
})
</script>

<style scoped></style>