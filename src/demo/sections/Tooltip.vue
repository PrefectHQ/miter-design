<template>
  <div>
    <button @click="right = !right">right: {{ right }}</button>
    <button @click="left = !left">left: {{ left }}</button>
    <button @click="bottom = !bottom">bottom: {{ bottom }}</button>

    <div class="center">
      <Tooltip text="Tooltip" :right="right" :left="left" :bottom="bottom">
        <!-- <button>Hover Over Me!</button> -->
        <i class="pi pi-Info-Question-Mark pi-3x" />
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
.center {
  margin-left: 100px;
  margin-top: 50px;
}
</style>
