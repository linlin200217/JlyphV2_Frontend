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
                            <tr id="tableHeader">
                            </tr>
                        </thead>
                        <tbody id="tableBody" class="text-dark-green">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="w-full h-1/4 flex flex-col">
                <div class="w-full py-1 px-2 flex flex-row flex-nowrap">
                    <Icon icon_path="/src/assets/WordCloud.png" class="my-auto"></Icon>
                    <input type="text" v-model="userSearch" placeholder="Search"
                        class="input input-bordered input-sm input-ghost w-full max-w-xs mr-2 text-dark-green" />
                    <button class="btn btn-sm btn-ghost btn-outline w-12" @click="uploadSearch">
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
                <div class="w-full h-4/5 flex-none">
                    <vue-word-cloud font-family="Sans" font-weight="bold" font-variant="normal" :spacing=word_cloud_spacing
                        :words=word_cloud_data :color="() => get_random_color()" />
                </div>
            </div>
        </div>
    </BaseFrame>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as papa from "papaparse"
import VueWordCloud from 'vuewordcloud'

import { upload_post } from '/src/api/index.ts'

import Icon from "./Icon.vue";
import BaseFrame from "./BaseFrame.vue";

const form = ref(null)
const file = ref(null)
const userSearch = ref("")
const uploading = ref(false)
const word_cloud_spacing = ref(1)
const word_cloud_data = ref()

const createDataElement = (htmlTag, innerText, idParent) => {
    let node = document.createElement(htmlTag);
    let textnode = document.createTextNode(innerText);
    node.appendChild(textnode);
    document.getElementById(idParent).appendChild(node);
}

const createHeaderElement = (columnText) => {
    createDataElement("th", columnText, "tableHeader");
}

const createCellData = (rowIndex, dataIndex, cellText) => {
    if (dataIndex === 0) {
        let node = document.createElement("tr");
        node.setAttribute("id", "row" + rowIndex);
        document.getElementById("tableBody").appendChild(node);

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
                try {
                    document.getElementById("tableHeader").replaceChildren();
                    document.getElementById("tableBody").replaceChildren();

                    papa.parse(content, {
                        complete: (results) => {
                            for (let i = 0; i < results.data.length; i++) {
                                if (i === 0) {
                                    for (let j = 0; j < results.data[i].length; j++) {
                                        createHeaderElement(results.data[i][j]);
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

            word_cloud_data.value = ['romance', 'horror', 'fantasy', 'adventure', 'romance', 'horror']

            // upload_post(formData).then(response => {
            //     console.log(response);
            // }).catch(error => {
            //     console.log(error)
            // })
        }
    }
}

const get_random_color = () => {
    let color_list = ['#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#073763', '#20124D', '#4C1130'];
    let random_index = Math.floor(Math.random() * color_list.length);
    return color_list[random_index];
}

const uploadSearch = () => {
    uploading.value = !uploading.value
}
</script>

<style scoped></style>
