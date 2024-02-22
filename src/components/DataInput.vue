<template>
    <BaseFrame>
        <div class="h-full w-full flex flex-col flex-nowrap divide-y-2 divide-dashed divide-light-green">
            <div class="w-full px-2 mb-1 flex flex-row flex-nowrap">
                <Icon icon_path="/src/assets/Upload.png"></Icon>
                <div class="grow">
                    <form ref="form">
                        <input id="fileUpload" type="file" ref="file" accept=".csv" v-on:change="handleFileUpload()"
                            class="file-input file-input-bordered file-input-ghost file-input-sm w-full max-w-xs" />
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
                    <Icon icon_path="/src/assets/WordCloud.png"></Icon>
                    <label class="input input-bordered input-ghost input-sm w-full flex items-center gap-2">
                        <input type="text" class="grow" placeholder="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="w-4 h-4 opacity-70">
                            <path fill-rule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clip-rule="evenodd" />
                        </svg>
                    </label>
                </div>
                <div class="w-full h-4/5 flex-none">
                    <vue-word-cloud font-family="Sans" font-weight="bold" font-variant="normal" :spacing=word_cloud_spacing :words=word_cloud_data
                        :color="() => get_random_color()" />
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

import BaseFrame from "./BaseFrame.vue";
import Icon from "./Icon.vue";

const form = ref(null)
const file = ref(null)
const word_cloud_spacing = ref(1)

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

            // upload_post(formData).then(response => {
            //     console.log(response);
            // }).catch(error => {
            //     console.log(error)
            // })
        }
    }
}

const word_cloud_data = [['romance', 1], ['horror', 1], ['fantasy', 1], ['adventure', 1], ['romance', 1], ['horror', 1], ['fantasy', 1], ['adventure', 1]]

const get_random_color = () => {
    let color_list = ['#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#073763', '#20124D', '#4C1130'];
    let random_index = Math.floor(Math.random() * color_list.length);
    return color_list[random_index];
}
</script>

<style scoped></style>
