<template>
  <div>
    <button @click="right = !right">right: {{ right }}</button>
    <button @click="left = !left">left: {{ left }}</button>
    <button @click="bottom = !bottom">bottom: {{ bottom }}</button>

    <div class="center">
      <Tooltip :right="right" :left="left" :bottom="bottom">
        <template #text>
          <div> <span class="highlight">Tool</span>tip </div>
        </template>
        <template #default>
          <Tag color="primary-101">Hi Hello</Tag>
        </template>
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
  margin-left: 300px;
  margin-top: 100px;
}

.highlight {
  color: yellow;
  text-decoration: underline;
}
</style>
