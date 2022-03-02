<template>
  <div>
    <h3 class="mb-2">Panels</h3>
    <m-button @click="open">Open Panel</m-button>
  </div>
</template>

<script lang="ts" setup>
import { showPanel } from '@/plugins/Panel';
import PanelsSectionPanel from './PanelsSectionPanel.vue';

function open() {
  showPanel(PanelsSectionPanel, {
    name: 'Hello There'
  })
}

</script>