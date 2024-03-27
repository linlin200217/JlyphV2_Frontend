<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap divide-y-2 divide-dashed divide-light-green">
            <div class="w-full px-2 mb-1 flex flex-row flex-nowrap">
                <Icon icon_path="/src/assets/Upload.png" class="my-auto"></Icon>
                <div class="grow">
                    <form ref="form ">
                        <input id="fileUpload" type="file" ref="file" accept=".csv" v-on:change="handleFileUpload()"
                            class="file-input file-input-bordered file-input-ghost file-input-sm w-full" />
                    </form>
                </div>
            </div>
            <div class="w-full h-3/5 py-1 px-2 overflow-scroll">
                <!-- <Icon icon_path="/src/assets/Dataset.png"></Icon> -->
                <div>
                    <table class="table table-xs font-bold">
                        <thead class="text-light-green">
                            <tr id="tableHeader" ref="tableHeader">
                            </tr>
                        </thead>
                        <tbody id="tableBody" ref="tableBody" class="text-dark-green">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="w-full h-1/4 flex flex-col">
                <div class="w-full py-1 px-2 flex flex-row flex-nowrap">
                    <Icon icon_path="/src/assets/WordCloud.png" class="my-auto"></Icon>
                    <input v-if="false" type="text" v-model="userSearch" placeholder="Search"
                        class="input input-bordered input-sm input-ghost w-full mr-2" />
                    <button v-if="false" class="btn btn-sm btn-ghost btn-outline w-12 text-dark-green" @click="uploadSearch">
                        <span v-if="uploading" class="loading loading-dots loading-lg text-dark-green"></span>
                        <svg v-else t="1710077011348" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4277">
                            <path
                                d="M416 32c212.064 0 384 171.936 384 384 0 86.4-28.544 166.176-76.736 230.368l254.304 254.304-90.528 90.496-256.576-256.608A382.208 382.208 0 0 1 416 800C203.936 800 32 628.064 32 416S203.936 32 416 32z m0 128a256 256 0 1 0 0 512 256 256 0 0 0 0-512z"
                                fill="#274E13" p-id="4278"></path>
                        </svg>
                    </button>
                </div>
                <div class="w-full h-4/5 flex-none">
                    <vue-word-cloud font-family="Sans" font-weight="bold" font-variant="normal"
                        :spacing=word_cloud_spacing :words=word_cloud_data :color="() => get_random_color()"
                        @click="handle_click($event)" />
                </div>
            </div>
        </div>
    </BaseFrame>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from 'pinia'
import * as d3 from "d3"
import * as papa from "papaparse"
import VueWordCloud from 'vuewordcloud'

import Icon from "./Icon.vue";
import BaseFrame from "./BaseFrame.vue";

import { upload_post } from '@/api/index.ts'
import { userSelection } from '@/store/modules/userSelection.ts'

const { userJsonData, dataAttributes, Categorical, Numerical, userPrompt } = storeToRefs(userSelection());

const form = ref(null)
const file = ref(null)
const userSearch = ref<string | null>()
const uploading = ref(false)
const word_cloud_spacing = ref(1)
const word_cloud_data = ref()

const tableHeader = ref<HTMLElement | null | undefined>(null)
const tableBody = ref<HTMLElement | null | undefined>(null)

const createDataElement = (htmlTag, innerText, idParent) => {
    let node = document.createElement(htmlTag);
    let textnode = document.createTextNode(innerText);
    node.appendChild(textnode);
    document.getElementById(idParent)?.appendChild(node);
}

const createHeaderElement = (columnText) => {
    createDataElement("th", columnText, "tableHeader");
}

const createCellData = (rowIndex, dataIndex, cellText) => {
    if (dataIndex === 0) {
        let node = document.createElement("tr");
        node.setAttribute("id", "row" + rowIndex);
        tableBody.value?.appendChild(node);
        createDataElement("td", cellText, "row" + rowIndex);
    } else {
        createDataElement("td", cellText, "row" + rowIndex);
    }
}

const handleFileUpload = async () => {
    if (file.value) {
        let file_name = file.value.files[0].name
        if (!file_name.endsWith('csv')) {
            alert("Invalid file type. Please upload a CSV file.")
            if (form.value) {
                form.value.reset()
            }
        } else {
            let formData = new FormData();
            let fileData = file.value.files[0]
            formData.append('file', fileData)

            const reader = new FileReader();
            reader.onload = event => {
                let content = event.target.result
                userJsonData.value = d3.csvParse(content)
                userJsonData.value.forEach((element, index) => {
                    element["id"] = index + 1
                    element["img"] = ""
                });
                userJsonData.value.columns.push("id", "img")
                try {
                    tableHeader.value?.replaceChildren();
                    tableBody.value?.replaceChildren();

                    dataAttributes.value = [];
                    papa.parse(content, {
                        complete: (results) => {
                            for (let i = 0; i < results.data.length; i++) {
                                if (i === 0) {
                                    for (let j = 0; j < results.data[i].length; j++) {
                                        createHeaderElement(results.data[i][j]);
                                        dataAttributes.value.push(results.data[i][j]);
                                    }
                                }
                                if (i > 0) {
                                    for (let j = 0; j < results.data[i].length; j++) {
                                        createCellData(i, j, results.data[i][j]);
                                    }
                                }
                            }
                        }
                    });
                } catch (error) {
                    console.log('Fail to create Table:', error)
                }
            };
            reader.readAsText(fileData);

            upload_post(formData).then(response => {
                console.log(response);

                Categorical.value = response.Categorical
                Numerical.value = response.Numerical
                word_cloud_data.value = response.Wordcloud;
            }).catch(error => {
                console.log(error)
            })
        }
    }
}

const get_random_color = () => {
    let color_list = ['#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#073763', '#20124D', '#4C1130'];
    let random_index = Math.floor(Math.random() * color_list.length);
    return color_list[random_index];
}

const handle_click = (event) => {
    userSearch.value = null
    userSearch.value = event.target.textContent;
    userPrompt.value = null
    userPrompt.value = event.target.textContent;
}

const uploadSearch = () => {
    uploading.value = !uploading.value
}
</script>

<style scoped></style>
