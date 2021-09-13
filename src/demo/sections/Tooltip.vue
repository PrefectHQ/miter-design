<template>
  <div>
    <h3 style="margin-bottom: 10px">Tooltip</h3>
    <Button v-tooltip:[position]="html"> Text </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      position: 'top',
      text: 'hello',
      html: `<div>some <span class="highlight">text</span></div>`
    }
  }
})
</script>
<style></style>
