<template>
  <Panel>
      <template #title>
          {{ name }}
      </template>

      <p>Hello there! This is a panel. Guess what? You can open a panel from a panel! Wanna try?</p>
      <m-button @click="open">Open Another Panel</m-button>
      
      <template #actions="{ close }">
        <m-button @click="close">Close</m-button>
      </template>
  </Panel>
</template>

<script lang="ts" setup>
import { showPanel } from '@/plugins/Panel';
import PanelsSectionPanelTwo from './PanelsSectionPanelTwo.vue'
import Panel from '@/components/Panels/Panel.vue'

defineProps<{
    name: string
}>()

function open() {
  showPanel(PanelsSectionPanelTwo, {})
}

</script>