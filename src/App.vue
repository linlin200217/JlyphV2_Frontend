<template>
  <div class="h-screen w-screen flex flex-row flex-nowrap">
    <div class="h-full w-1/4 flex flex-col flex-nowrap">
      <div class="w-full h-2/5 p-4">
        <DataInput />
      </div>
      <div class="w-full h-1/5 p-4">
        <Ideation />
      </div>
      <div class="w-full h-2/5 p-4">
        <Selection />
      </div>
    </div>
    <div class="h-full w-3/4 flex flex-col flex-nowrap">
      <div class="w-full h-3/4 flex flex-row flex-nowrap">
        <div class="h-full w-3/4 p-4">
          <Generation />
        </div>
        <div class="h-full w-1/4 p-4">
          <Placement />
        </div>
      </div>
      <div class="w-full h-1/4 p-4">
        <Mask />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataInput from "./components/DataInput.vue";
import Ideation from "./components/Ideation.vue";
import Selection from "./components/Selection.vue";
import Generation from "./components/Generation.vue";
import Placement from "./components/Placement.vue";
import Mask from "./components/Mask.vue";
</script>

<style scoped></style>
