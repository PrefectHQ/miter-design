<template>
  <Panel>
    <template #title>
        Another Panel
    </template>

    <p>Wow, you're good at this!</p>

    <template #actions="{ close }">
    <m-button @click="close">Close</m-button>
    </template>
  </Panel>
</template>

<script lang="ts" setup>
import Panel from '@/components/Panels/Panel.vue'
</script>
