<template>
  <div>
    <button @click="right = !right">right: {{ right }}</button>
    <button @click="left = !left">left: {{ left }}</button>
    <button @click="bottom = !bottom">bottom: {{ bottom }}</button>

    <div class="mt-5">
      <Tooltip :right="right" :left="left" :bottom="bottom">
        <template #text> <span class="highlight">Tooltip</span> </template>
        <template #default>
          <Tag>Tag</Tag>
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
.highlight {
  color: yellow;
  text-decoration: underline;
}
</style>
