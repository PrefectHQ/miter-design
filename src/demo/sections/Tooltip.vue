<template>
  <div>
    <h3 style="margin-bottom: 10px">Tooltip</h3>
    <Tag v-tooltip:[position]="html"> Text </Tag>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      position: 'right',
      html: `<div>some <span class="highlight">text</span></div>`
    }
  }
})
</script>
<style></style>
