<template>
  <div>
    <!-- <h3>Tooltip</h3> -->
    <Tag
      v-tooltip:[position]="html"
      style="margin-left: 200px; border: solid red"
    >
      sentence
    </Tag>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      position: 'right',
      text: 'hello',
      html: `<div>some <span class="highlight">text</span></div>`
    }
  }
})
</script>
<style></style>
