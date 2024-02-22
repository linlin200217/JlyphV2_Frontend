<template>
    <div class="avatar">
        <div class="h-6 mr-2 rounded">
            <img :src=props.icon_path :alt=props.icon_path />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['icon_path'])
</script>

<style scoped></style>