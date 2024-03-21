<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap divide-y-2 divide-dashed divide-light-green">
            <div class="w-full py-1 px-2">
                <Icon icon_path="/src/assets/Placement.png"></Icon>
            </div>

            <!-- Chat Box -->
            <div class="w-full h-1/2 py-1">
                <div id="chat-box"
                    class="w-full h-full rounded-lg bg-chat-background bg-opacity-30 flex flex-col flex-nowrap overflow-y-scroll">
                    <!-- cartoon style -->
                    <div v-show="startChatting" class="w-full h-fit flex flex-row flex-nowrap justify-start">
                        <img src="@/assets/Robot.png" class="h-6 mt-auto">
                        <div class="chat chat-start w-full ml-1">
                            <div
                                class="chat-bubble w-fit min-h-min min-w-min bg-light-green bg-opacity-40 text-xs font-sans text-dark-green font-medium">
                                Wanna try cartoon style?</div>
                        </div>
                    </div>

                    <div v-show="startChatting" class="w-full h-fit flex flex-row flex-nowrap justify-end">
                        <div class="chat chat-end w-full mr-1">
                            <div
                                class="chat-bubble w-fit min-h-min min-w-min bg-light-green bg-opacity-40 flex flex-row text-xs font-sans text-dark-green font-medium">
                                <div v-for="item in cartoon_style"
                                    class="border-2 border-dashed border-dark-green rounded-md px-1 mr-2 cursor-pointer"
                                    :class="{ 'bg-dark-green text-white shadow shadow-light-green': selected_cartoon_style === item }"
                                    @click="selectCartoonStyle(item)">{{ item }}</div>
                            </div>
                        </div>
                        <img src="@/assets/Questioner.png" class="h-5 mt-auto">
                    </div>

                    <!-- prefered attributes -->
                    <div v-show="selected_cartoon_style.length != 0"
                        class="w-full h-fit flex flex-row flex-nowrap justify-start">
                        <img src="@/assets/Robot.png" class="h-6 mt-auto">
                        <div class="chat chat-start w-full ml-1">
                            <div
                                class="chat-bubble w-fit min-h-min min-w-min bg-light-green bg-opacity-40 text-xs font-sans text-dark-green font-medium">
                                Do you have any interested attribute(s)?</div>
                        </div>
                    </div>

                    <div v-show="selected_cartoon_style.length != 0"
                        class="w-full h-fit flex flex-row flex-nowrap justify-end">
                        <div class="chat chat-end w-full mr-1">
                            <div
                                class="chat-bubble w-fit min-h-min min-w-min bg-light-green bg-opacity-40 flex flex-row text-xs font-sans text-dark-green font-medium">
                                <div v-for="item in have_interested_attribute"
                                    class="border-2 border-dashed border-dark-green rounded-md px-1 mr-2 cursor-pointer"
                                    :class="{ 'bg-dark-green text-white shadow shadow-light-green': selected_have_interested_attribute === item }"
                                    @click="selectHaveInterestedAttribute(item)">{{ item }}</div>
                            </div>
                        </div>
                        <img src="@/assets/Questioner.png" class="h-5 mt-auto">
                    </div>

                    <!-- select attributes -->
                    <div v-show="selected_have_interested_attribute === 'Yes'"
                        class="w-full h-fit flex flex-row flex-nowrap justify-start">
                        <img src="@/assets/Robot.png" class="h-6 mt-auto">
                        <div class="chat chat-start w-full ml-1">
                            <div
                                class="chat-bubble w-fit min-h-min min-w-min bg-light-green bg-opacity-40 text-xs font-sans text-dark-green font-medium">
                                Please select 1 or 2 attributes, and click <span @click="confirm_attributes()"
                                    class="border-2 border-dashed border-dark-green rounded-md px-1 mx-1 hover:bg-dark-green hover:text-white cursor-pointer">confirm</span>
                                to submit.</div>
                        </div>
                    </div>

                    <div v-show="selected_have_interested_attribute === 'Yes'"
                        class="w-full h-fit flex flex-row justify-end">
                        <div class="chat chat-end w-full mr-1">
                            <div
                                class="chat-bubble w-fit min-h-min min-w-min bg-light-green bg-opacity-40 flex flex-row flex-wrap text-xs font-sans text-dark-green font-medium">
                                <div v-for="item in dataAttributes"
                                    class="border-2 border-dashed border-dark-green rounded-md px-1 mr-2 mb-1 cursor-pointer"
                                    :class="{ 'bg-dark-green text-white shadow shadow-light-green': selected_attributes.includes(item) }"
                                    @click="selectAttributes(item)">{{ item }}</div>
                            </div>
                        </div>
                        <img src="@/assets/Questioner.png" class="h-5 mt-auto">
                    </div>

                    <!-- visualization suggestions -->
                    <div v-show="suggestions.length != 0" class="w-full h-fit flex flex-row flex-nowrap justify-start">
                        <img src="@/assets/Robot.png" class="h-6 mt-auto">
                        <div class="chat chat-start w-full ml-1">
                            <div
                                class="chat-bubble w-fit min-h-min min-w-min bg-light-green bg-opacity-40 text-xs font-sans text-dark-green font-medium">
                                Try <span v-for="item in suggestions" @click="selectSuggestion(item)"
                                    class="inline-block border-2 border-dashed border-dark-green rounded-md px-1 mx-1 mb-1 cursor-pointer"
                                    :class="{ 'bg-dark-green text-white shadow shadow-light-green': selected_suggestion === item }">{{
                        item }}</span>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <!-- Placement Selection Box -->
            <div class="w-full h-1/2 flex flex-col flex-nowrap overflow-y-scroll">

                <!-- image size -->
                <div v-show="placement_group_1 || placement_group_2" class="w-full flex flex-col flex-nowrap mb-2">
                    <span class="text-xs font-sans tracking-wide font-bold text-left text-dark-green ml-2">Image
                        Size</span>
                    <input type="range" min="20" max="200" class="range range-xs [--range-shdw:#97AB8A]" step="20"
                        v-model="imageSize" />
                    <div class="w-full flex justify-between text-[0.4rem] text-dark-green font-bold px-1">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>
                </div>

                <!-- background color -->
                <div v-show="placement_group_1 || placement_group_2" class="w-full flex flex-col flex-nowrap mb-2">
                    <span class="text-xs font-sans tracking-wide font-bold text-left text-dark-green ml-2">Background
                        Color <span @click="clear_background_color()"
                            class="inline border-2 border-dashed border-dark-green rounded-full mx-1 px-1 cursor-pointer hover:bg-dark-green hover:text-white">clear</span>
                    </span>
                    <div class="w-full flex justify-around px-1">
                        <input v-for="color in background_color_list" type="radio" name="background-color-radio"
                            :value="color" class="radio radio-xs" :style="{ 'background-color': color }"
                            v-model="backgroundColor" />
                    </div>
                </div>

                <!-- view color -->
                <div v-show="placement_group_1 || placement_group_2" class="w-full flex flex-col flex-nowrap mb-2">
                    <span class="text-xs font-sans tracking-wide font-bold text-left text-dark-green ml-2">View
                        Color <span @click="clear_view_color()"
                            class="inline border-2 border-dashed border-dark-green rounded-full mx-1 px-1 cursor-pointer hover:bg-dark-green hover:text-white">clear</span></span>
                    <div class="w-full flex justify-around px-1">
                        <input v-for="color in view_color_list" type="radio" name="view-color-radio" :value="color"
                            class="radio radio-xs" :style="{ 'background-color': color }" v-model="viewColor" />
                    </div>
                </div>

                <!-- stroke color -->
                <div v-show="placement_group_1 || placement_group_2" class="w-full flex flex-col flex-nowrap mb-2">
                    <span class="text-xs font-sans tracking-wide font-bold text-left text-dark-green ml-2">Stroke
                        Color <span @click="clear_stroke_color()"
                            class="inline border-2 border-dashed border-dark-green rounded-full mx-1 px-1 cursor-pointer hover:bg-dark-green hover:text-white">clear</span></span>
                    <div class="w-full flex justify-around px-1">
                        <input v-for="color in stroke_color_list" type="radio" name="stroke-color-radio" :value="color"
                            class="radio radio-xs" :style="{ 'background-color': color }" v-model="strokeColor" />
                    </div>
                </div>

                <!-- stroke width -->
                <div v-show="placement_group_1 || placement_group_2" class="w-full flex flex-col flex-nowrap mb-2">
                    <span class="text-xs font-sans tracking-wide font-bold text-left text-dark-green ml-2">Stroke
                        Width</span>
                    <input type="range" min="1" max="5" class="range range-xs [--range-shdw:#97AB8A]" step="1"
                        v-model="strokeWidth" />
                    <div class="w-full flex justify-between text-[0.4rem] text-dark-green font-bold px-1">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>
                </div>

                <!-- width gap -->
                <div v-show="placement_group_2" class="w-full flex flex-col flex-nowrap mb-2">
                    <span class="text-xs font-sans tracking-wide font-bold text-left text-dark-green ml-2">Width
                        Gap</span>
                    <input type="range" min="10" max="100" class="range range-xs [--range-shdw:#97AB8A]" step="10"
                        v-model="widthGap" />
                    <div class="w-full flex justify-between text-[0.4rem] text-dark-green font-bold px-1">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>
                </div>

                <!-- height gap -->
                <div v-show="placement_group_2" class="w-full flex flex-col flex-nowrap mb-2">
                    <span class="text-xs font-sans tracking-wide font-bold text-left text-dark-green ml-2">Height
                        Gap</span>
                    <input type="range" min="10" max="100" class="range range-xs [--range-shdw:#97AB8A]" step="10"
                        v-model="heightGap" />
                    <div class="w-full flex justify-between text-[0.4rem] text-dark-green font-bold px-1">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>
                </div>
            </div>

            <!-- submission button -->
            <div class="p-2 flex justify-center">
                <button class="btn btn-sm btn-ghost btn-wide btn-outline w-full min-w-18 text-dark-green"
                    @click="finalSubmission">
                    <span v-if="uploading" class="loading loading-dots loading-md text-dark-green"></span>
                    <span v-else class="text-dark-green">Final Submission</span>
                </button>
            </div>

            <div id="viz"></div>
        </div>
    </BaseFrame>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { storeToRefs } from 'pinia'
import embed, { vega } from 'vega-embed';

import Icon from "./Icon.vue";
import BaseFrame from "./BaseFrame.vue";

import { get_image_url, visualization_suggestion, final_placement } from '@/api/index.ts'
import { userSelection } from '@/store/modules/userSelection.ts'
const { userJsonData, dataAttributes, generated_final_images, generated_cartoon_images, startChatting, showVegaEmbedding, vegaSpec } = storeToRefs(userSelection());

const uploading = ref(false)

const imageSize = ref<number>(100)
const strokeWidth = ref<number>(2)
const widthGap = ref<number>(50)
const heightGap = ref<number>(50)
const viewColor = ref<string | null>(null)
const strokeColor = ref<string | null>(null)
const backgroundColor = ref<string | null>(null)

const clear_view_color = () => {
    viewColor.value = null
}

const clear_stroke_color = () => {
    strokeColor.value = null
}

const clear_background_color = () => {
    backgroundColor.value = null
}

const view_color_list = ref(["#E06666", "#F6B26B", "#FFD966", "#93C47D", "#76A5AF", "#6FA8DC", "#8E7CC3", "#C27BA0", "#999999", "#CCCCCC"])
const background_color_list = ref(["#EA9999", "#F9CB9C", "#FFE599", "#B6D7A8", "#A2C4C9", "#9FC5F8", "#B4A7D6", "#D5A6BD", "#DDDDDD", "#EEEEEE"])
const stroke_color_list = ref(["#660000", "#783F04", "#7F6000", "#274E13", "#0C343D", "#073763", "#20124D", "#4C1130", "#333333", "#666666"])

const cartoon_style = ref(["Yes", "No"])
const selected_cartoon_style = ref("")
const selectCartoonStyle = (item) => {
    selected_cartoon_style.value = item

    if (selected_cartoon_style.value === "Yes") {
        userJsonData.value.forEach((element, index) => {
            element.img = get_image_url(generated_cartoon_images.value[index].image_id)
        })
    } else if (selected_cartoon_style.value === "No") {
        userJsonData.value.forEach((element, index) => {
            element.img = get_image_url(generated_final_images.value[index].image_id)
        })
    }
}

const have_interested_attribute = ref(["Yes", "No"])
const selected_have_interested_attribute = ref("")
const selectHaveInterestedAttribute = (item) => {
    selected_have_interested_attribute.value = item
    if (selected_have_interested_attribute.value === "No") {
        let data = []
        get_visualization_suggestion(data);
    }
}

const selected_attributes = ref<string[]>([])
const selectAttributes = (item) => {
    if (selected_attributes.value.length < 2) {
        selected_attributes.value.push(item)
    }

    if (selected_attributes.value.length == 2) {
        selected_attributes.value.shift();
        selected_attributes.value.push(item)
    }
}

const confirm_attributes = () => {
    selected_attributes.value = [...new Set(selected_attributes.value)]
    get_visualization_suggestion(selected_attributes.value);
}

const suggestions = ref<string[]>([])
const get_visualization_suggestion = (select_attr: Array<any>) => {

    let data = {
        chosen_list: select_attr
    }

    visualization_suggestion(data).then(response => {
        suggestions.value = response.Suggestion
    }).catch(error => {
        console.log(error)
    })
}

const selected_suggestion = ref("")
const selectSuggestion = (item) => {
    selected_suggestion.value = item
}

const placement_group_1 = computed(() => {
    let group_1 = ["Grid", "Bumpchart", "Bumpchart_withline", "Multi_Linechart", "Multi_Linechart_withline"]
    if (group_1.includes(selected_suggestion.value)) {
        return true
    } else { return false }
})

const placement_group_2 = computed(() => {
    let group_2 = ["Isotype_vertical", "Isotype_horizontal", "Linechart", "Linechart_withline", "Multi_Isotype"]
    if (group_2.includes(selected_suggestion.value)) {
        return true
    } else { return false }
})

const finalSubmission = () => {

    let submission_data = {
        Colname: selected_attributes.value,
        type: selected_suggestion.value,
        image_size: imageSize.value,
        background_color: backgroundColor.value,
        view_color: viewColor.value,
        stroke_color: strokeColor.value,
        strokeWidth: strokeWidth.value
    }

    let data = {
        dic: submission_data
    }

    uploading.value = true
    final_placement(data).then(response => {
        vegaSpec.value = response.vega_lite_dic;
        vegaSpec.value.data = {
            "values": userJsonData.value
        }

        let specData = JSON.stringify(vegaSpec.value)
        specData = JSON.parse(specData)

        let vega_box = document.getElementById("vegabox")
        if (vega_box) {
            let vega_box_info = vega_box.getBoundingClientRect();
            specData.height = Math.floor(Number(vega_box_info.height) * 0.88)
            specData.width = Math.floor(Number(vega_box_info.width) * 0.88)
        }

        if (selected_suggestion.value === "Multi_Isotype") {
            let attribute_values = []
            let target_attribute = selected_attributes.value[0]

            userJsonData.value.forEach((element) => {
                attribute_values.push(element[target_attribute])
            })
            attribute_values = [...new Set(attribute_values)];

            if (attribute_values.length != 0) {
                specData.height = Math.floor(specData.height / attribute_values.length)
            }
        }
        console.log(JSON.stringify(specData));

        document.getElementById("vegaembedding")?.replaceChildren();
        embed('#vegaembedding', specData, { renderer: 'svg' })

        showVegaEmbedding.value = true
        uploading.value = false
    }).catch(error => {
        uploading.value = false
        console.log(error)
    })
}
</script>

<style scoped>
#chat-box {
    background-image: url('@/assets/chatbackground.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}

input[type="radio"]:checked {
    filter: drop-shadow(3px 3px 3px #97AB8A);
}
</style>