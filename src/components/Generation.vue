<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap">
            <!-- top bar -->
            <div class="w-full h-[5%] py-1 px-2 mb-1 flex flex-row flex-nowrap justify-between">
                <Icon icon_path="/src/assets/Generation.png"></Icon>
                <button class="btn btn-sm btn-ghost btn-outline min-w-20 text-dark-green" @click="uploadGeneration">
                    <span v-if="topGenerateUploading" class="loading loading-dots loading-md text-dark-green"></span>
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
                        class="w-full h-fit flex flex-col flex-nowrap justify-start shadow-lg shadow-dark-green bg-white box-border border-2 border-dark-green border-dashed rounded-lg p-1">
                        <!-- defalt_layer_example -->
                        <div class="w-full h-14 flex flex-row flex-nowrap justify-start border"
                            v-for="(item, index) in defalt_layer_example" draggable="true"
                            @drop="dragenter($event, index)" @dragover="dragover($event, index)"
                            @dragstart="dragstart(index)">
                            <div class="my-auto">
                                <span
                                    class="bg-light-green text-dark-green px-2 py-1 text-xs font-bold rounded-full -top-3 -right-3">{{
                    item.Position }}</span>
                            </div>
                            <img :src="get_image_url(item.outlier_id)" class="grow object-contain " />
                            <div class="h-full w-1/3 flex flex-col flex-nowrap justify-center">
                                <div
                                    class="px-2 mx-auto text-center text-xs text-wrap capitalize rounded-2xl bg-light-green flex">
                                    <span class="m-auto text-black">{{ item.Class }}</span>
                                </div>
                                <div v-show="showInputBar(item.Class)"
                                    class="flex flex-col flex-nowrap justify-center items-center">
                                    <div class="join h-4">
                                        <input type="text" v-model="gap_input[index]" placeholder="Gap"
                                            class="input input-bordered input-xs input-ghost h-4 w-1/2 join-item" />
                                        <select
                                            class="select select-bordered select-ghost select-xs h-4 w-1/2 join-item"
                                            v-model="form_selection[index]">
                                            <option v-for="item in form_options" :value="item"
                                                :disabled="disabled_form_options.includes(item)">{{ item }}</option>
                                        </select>
                                    </div>
                                    <div class="w-full h-4 flex justify-center items-center">
                                        <select v-show="form_selection[index] === 'Number_Path'"
                                            class="select select-bordered select-ghost select-xs h-4 w-3/4"
                                            v-model="path_col[index]">
                                            <option v-for="col in categorical_options" :value="col">{{ col }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-evenly my-1">
                            <button class="btn btn-sm btn-ghost btn-outline min-w-4 text-dark-green" @click="reSort">
                                <svg t="1710095584302" class="icon h-6" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="5938">
                                    <path
                                        d="M482.962286 492.032l-51.687619 51.736381-196.559238-196.437333 196.510476-196.608 51.736381 51.687619-99.230476 99.279238h223.329523c140.434286 0 254.659048 111.957333 258.364953 251.465143l0.097524 6.997333c0 142.726095-115.712 258.438095-258.438096 258.438095H154.819048v-73.142857H607.085714a185.295238 185.295238 0 1 0 0-370.590476l-241.371428-0.024381 117.248 117.199238z"
                                        p-id="5939" fill="#274E13" fill-opacity="1"></path>
                                </svg>
                            </button>

                            <button class="btn btn-sm btn-ghost btn-outline min-w-4 text-dark-green"
                                @click="removeSelections">
                                <svg t="1708973332700" class="icon h-6" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4214">
                                    <path
                                        d="M448 256h128V128H448v128z m192-128v128h192a64 64 0 0 1 64 64v128a64 64 0 0 1-54.976 63.36l44.544 311.616a64 64 0 0 1-63.36 73.024H201.792a64 64 0 0 1-63.36-73.024L183.04 511.36A64 64 0 0 1 128 448V320a64 64 0 0 1 64-64h192V128a64 64 0 0 1 64-64h128a64 64 0 0 1 64 64z m136.512 320H832V320H576 448 192v128h584.512z m0 64H247.488l-45.696 320H320v-128h64v128h96v-128h64v128H640v-128h64v128h118.208l-45.696-320z"
                                        fill="#274E13" fill-opacity="1" p-id="4215"></path>
                                </svg>
                            </button>

                            <button class="btn btn-sm btn-ghost btn-outline min-w-20 text-dark-green"
                                @click="uploadPreview">
                                <span v-if="leftPreviewUploading"
                                    class="loading loading-dots loading-md text-dark-green"></span>
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
                    <div class="w-full h-full object-contain flex justify-center items-center">
                        <img v-show="generate_image_id" :src="get_image_url(generate_image_id)" alt="Example Image"
                            class="h-full object-contain block">
                    </div>
                </div>

                <!-- right part -->
                <div class=" w-2/3 overflow-y-scroll">
                    <div v-for="(items, key, rgba_index) in rgba_images_by_category"
                        class="h-48 w-full flex flex-row flex-nowrap overflow-scroll">
                        <div class="h-full w-[100px] font-bold text-center text-dark-green text-wrap capitalize">{{ key
                            }}
                        </div>
                        <ElementSingle v-for="(item, _) in items" :slot_data="item" :mask_data="maskData[rgba_index]">
                        </ElementSingle>
                    </div>
                </div>

                <!-- absolute button -->
                <div class="absolute bottom-2 right-2">
                    <button class="btn btn-sm btn-ghost btn-outline min-w-20 text-dark-green"
                        @click="uploadDefaultLayer">
                        <span v-if="defaultLayerUploading"
                            class="loading loading-dots loading-md text-dark-green"></span>
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
import { ref, watch, computed } from "vue"
import { storeToRefs } from 'pinia'

import Icon from "./Icon.vue";
import BaseFrame from "./BaseFrame.vue";
import ElementSingle from "./Element-single.vue";

import { get_image_url, generate_numerical_element, generate_example, final_submission } from '@/api/index.ts'
import { userSelection } from '@/store/modules/userSelection.ts'
const { rgba_images_by_category, maskData, defalt_layer_example } = storeToRefs(userSelection());

const defaultLayerUploading = ref(false)
const leftPreviewUploading = ref(false)
const topGenerateUploading = ref(false)
const form_selection = ref<string[]>([])
const path_col = ref<string[]>([])
const gap_input = ref<number[]>([])
const generate_image_id = ref('')

const form_options = ref(["Size", "Number_Vertical", "Number_Horizontal", "Number_Path"])
const number_options = form_options.value.slice(1)
const disabled_form_options = ref<string[]>([])

const dragIndex = ref<number>()

const categorical_options = computed(() => {
    let cat_options = []
    maskData.value.forEach((element) => {
        if (element.categorical && !element.numerical) {
            cat_options.push(element.categorical)
            cat_options = [...new Set(cat_options)]; // remove duplicate
        }
    })
    return cat_options
})

const uploadDefaultLayer = () => {
    let mask_forall_data = []
    for (let i = 0; i < maskData.value.length; i++) {
        let item = maskData.value[i];
        if (!item.categorical && !item.numerical) {
            alert(`Attribute for mask ${i} not selected!`)
            defaultLayerUploading.value = false
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
        mask_forall: mask_forall_data,
        chosen_image_id: maskData.value[0].image_id,
    }

    defaultLayerUploading.value = true
    generate_numerical_element(data).then(response => {
        defalt_layer_example.value = response.defalt_layer_forexample.sort((a, b) => {
            // descending order
            return a.Position > b.Position ? -1 : 1
        })

        defaultLayerUploading.value = false
    }).catch(error => {
        defaultLayerUploading.value = false
        console.log(error)
    })
}

const showInputBar = (classString) => {
    return classString === "Numerical" ? 1 : 0
}

const removeSelections = () => {
    gap_input.value = []
    form_selection.value = []
    disabled_form_options.value = []
}

const uploadPreview = () => {
    let example_array_data = []
    for (let i = 0; i < defalt_layer_example.value.length; i++) {
        let temp = {
            Colname: defalt_layer_example.value[i].Colname,
            widget: defalt_layer_example.value[i].Widget,
            Refine_num: defalt_layer_example.value[i].Refine_num,
            Class: defalt_layer_example.value[i].Class,
            outlier_id: defalt_layer_example.value[i].outlier_id,
            Layer: defalt_layer_example.value[i].Layer,
            Position: defalt_layer_example.value[i].Position,
            mask_bool: defalt_layer_example.value[i].mask_bool,
        }

        if (temp.Class === "Numerical") {
            temp["Form"] = form_selection.value[i] || "Size"
            temp["Gap"] = Number(gap_input.value[i]) || 20
        } else {
            temp["Form"] = null
            temp["Gap"] = null
        }

        if (temp.Form === "Number_Path") {
            temp["Path_Col"] = categorical_options.value[i]
        } else {
            temp["Path_Col"] = null
        }
        example_array_data.push(temp)
    }

    let data = {
        dic_array: example_array_data,
        image_id: maskData.value[0].image_id
    }

    leftPreviewUploading.value = true
    generate_example(data).then(response => {
        generate_image_id.value = response.example

        leftPreviewUploading.value = false
    }).catch(error => {
        leftPreviewUploading.value = false
        console.log(error)
    })
}

const dragstart = (index) => {
    dragIndex.value = index
}

const dragover = (event) => {
    event.preventDefault();
}

const dragenter = (event, index) => {
    event.preventDefault();

    if (dragIndex.value !== index) {
        let source = defalt_layer_example.value[dragIndex.value];
        defalt_layer_example.value.splice(dragIndex.value, 1);
        defalt_layer_example.value.splice(index, 0, source);
        dragIndex.value = index;
    }

    for (let i = 0; i < defalt_layer_example.value.length; i++) {
        defalt_layer_example.value[i].Position = defalt_layer_example.value.length - i
    }
}

const reSort = () => {
    defalt_layer_example.value.sort((a, b) => {
        return a.Layer > b.Layer ? -1 : 1
    })

    for (let i = 0; i < defalt_layer_example.value.length; i++) {
        defalt_layer_example.value[i].Position = defalt_layer_example.value.length - i
    }
}

const uploadGeneration = () => {

    let rgba_element_adjusted = []
    for (let i = 0; i < defalt_layer_example.value.length; i++) {
        let temp = {
            Colname: defalt_layer_example.value[i].Colname,
            widget: defalt_layer_example.value[i].Widget,
            Refine_num: defalt_layer_example.value[i].Refine_num,
            Class: defalt_layer_example.value[i].Class,
            outlier_id: defalt_layer_example.value[i].outlier_id,
            Layer: defalt_layer_example.value[i].Layer,
            Position: defalt_layer_example.value[i].Position,
            mask_bool: defalt_layer_example.value[i].mask_bool,
        }

        if (temp.Class === "Numerical") {
            temp["Form"] = form_selection.value[i] || "Size"
            temp["Gap"] = Number(gap_input.value[i]) || 20
        } else {
            temp["Form"] = null
            temp["Gap"] = null
        }

        if (temp.Form === "Number_Path") {
            temp["Path_Col"] = categorical_options.value[i]
        } else {
            temp["Path_Col"] = null
        }
        rgba_element_adjusted.push(temp)
    }

    let data = {
        result: rgba_images_by_category.value,
        dic_array: rgba_element_adjusted,
        image_id: maskData.value[0].image_id
    }

    console.log(maskData.value);
    // console.log(defalt_layer_example.value);
    

    // topGenerateUploading.value = true
    // final_submission(data).then(response => {
    //     console.log(response);

    //     topGenerateUploading.value = false
    // }).catch(error => {
    //     topGenerateUploading.value = false
    //     console.log(error)
    // })
}

watch(() => [...form_selection.value], (newValue, _) => {
    for (let i = 0; i < newValue.length; i++) {
        if (newValue[i] && newValue[i] != form_options.value[0]) {
            number_options.forEach((element) => {
                if (element != newValue[i]) { disabled_form_options.value.push(element) }
            })
        }
    }
})
</script>

<style scoped>
.select-xs {
    height: 1rem;
    min-height: 1rem;
}
</style>