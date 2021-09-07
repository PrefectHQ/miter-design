<template>
  <div>
    <h3>Tooltip</h3>
    <Button v-tooltip:[position]="html"> Foo </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      position: 'top',
      html: `<div>some <span class="highlight">text</span></div>`
    }
  }
})
</script>
<style>
.highlight {
  color: yellow;
}
</style>
