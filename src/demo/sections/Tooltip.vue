<template>
  <div>
    <!-- <h3>Tooltip</h3> -->
    <Button
      v-tooltip:[position]="html"
      style="margin-left: 200px; border: solid red"
    >
      Foo
    </Button>
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
