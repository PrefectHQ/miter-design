<template>
  <div>
    <button @click="right = !right">right: {{ right }}</button>
    <button @click="left = !left">left: {{ left }}</button>
    <button @click="bottom = !bottom">bottom: {{ bottom }}</button>

    <div class="mt-8 d-flex align-center">
      <Tooltip :right="right" :left="left" :bottom="bottom" class="mr-2">
        <template #text> button </template>
        <template #default>
          <Button color="primary">Button</Button>
        </template>
      </Tooltip>

      <Tooltip :right="right" :left="left" :bottom="bottom" class="mr-2">
        <template #text>
          <div> <span class="highlight">Tool</span>tip </div>
        </template>
        <template #default>
          <i class="pi pi-Info-Question-Mark pi-3x" />
        </template>
      </Tooltip>

      <Tooltip :right="right" :left="left" :bottom="bottom">
        <template #text> text </template>
        <template #default> Text </template>
      </Tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      right: false,
      left: false,
      bottom: false
    }
  }
})
</script>
<style>
.highlight {
  color: yellow;
  text-decoration: underline;
}
</style>
